// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TaskChain {
    struct Task {
        uint256 id;
        address creator;
        address assignee;
        string title;
        string description;
        uint256 reward;
        uint256 deadline;
        bool completed;
        bool disputed;
        bool cancelled;
        uint256 createdAt;
    }

    uint256 private taskCount;
    mapping(uint256 => Task) public tasks;
    mapping(address => uint256[]) public userCreatedTasks;
    mapping(address => uint256[]) public userAssignedTasks;
    
    event TaskCreated(uint256 indexed taskId, address indexed creator, string title, uint256 reward);
    event TaskAssigned(uint256 indexed taskId, address indexed assignee);
    event TaskCompleted(uint256 indexed taskId, address indexed assignee);
    event TaskDisputed(uint256 indexed taskId, address indexed disputer);
    event TaskCancelled(uint256 indexed taskId);
    event RewardClaimed(uint256 indexed taskId, address indexed claimer, uint256 amount);

    modifier onlyCreator(uint256 _taskId) {
        require(tasks[_taskId].creator == msg.sender, "Only creator can call this");
        _;
    }

    modifier taskExists(uint256 _taskId) {
        require(_taskId > 0 && _taskId <= taskCount, "Task does not exist");
        _;
    }

    function createTask(
        string memory _title,
        string memory _description,
        uint256 _deadline
    ) external payable returns (uint256) {
        require(msg.value > 0, "Reward must be greater than 0");
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(_deadline > block.timestamp, "Deadline must be in future");

        taskCount++;
        
        tasks[taskCount] = Task({
            id: taskCount,
            creator: msg.sender,
            assignee: address(0),
            title: _title,
            description: _description,
            reward: msg.value,
            deadline: _deadline,
            completed: false,
            disputed: false,
            cancelled: false,
            createdAt: block.timestamp
        });

        userCreatedTasks[msg.sender].push(taskCount);
        
        emit TaskCreated(taskCount, msg.sender, _title, msg.value);
        return taskCount;
    }

    function assignTask(uint256 _taskId) external taskExists(_taskId) {
        Task storage task = tasks[_taskId];
        require(task.assignee == address(0), "Task already assigned");
        require(task.creator != msg.sender, "Creator cannot assign to self");
        require(!task.completed, "Task already completed");
        require(!task.cancelled, "Task cancelled");
        require(block.timestamp < task.deadline, "Deadline passed");

        task.assignee = msg.sender;
        userAssignedTasks[msg.sender].push(_taskId);
        
        emit TaskAssigned(_taskId, msg.sender);
    }

    function completeTask(uint256 _taskId) external taskExists(_taskId) {
        Task storage task = tasks[_taskId];
        require(task.assignee == msg.sender, "Only assignee can complete");
        require(!task.completed, "Already completed");
        require(!task.cancelled, "Task cancelled");

        task.completed = true;
        
        emit TaskCompleted(_taskId, msg.sender);
    }

    function claimReward(uint256 _taskId) external taskExists(_taskId) {
        Task storage task = tasks[_taskId];
        require(task.completed, "Task not completed");
        require(task.assignee == msg.sender, "Only assignee can claim");
        require(!task.disputed, "Task disputed");
        require(task.reward > 0, "No reward to claim");

        uint256 amount = task.reward;
        task.reward = 0;
        
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
        
        emit RewardClaimed(_taskId, msg.sender, amount);
    }

    function disputeTask(uint256 _taskId) external taskExists(_taskId) {
        Task storage task = tasks[_taskId];
        require(task.creator == msg.sender || task.assignee == msg.sender, "Not involved in task");
        require(task.completed, "Task not completed");
        require(!task.disputed, "Already disputed");

        task.disputed = true;
        
        emit TaskDisputed(_taskId, msg.sender);
    }

    function cancelTask(uint256 _taskId) external taskExists(_taskId) onlyCreator(_taskId) {
        Task storage task = tasks[_taskId];
        require(!task.completed, "Task already completed");
        require(!task.cancelled, "Already cancelled");
        require(task.assignee == address(0), "Task assigned, cannot cancel");

        task.cancelled = true;
        
        if (task.reward > 0) {
            uint256 amount = task.reward;
            task.reward = 0;
            (bool success, ) = payable(task.creator).call{value: amount}("");
            require(success, "Refund failed");
        }
        
        emit TaskCancelled(_taskId);
    }

    function getTask(uint256 _taskId) external view taskExists(_taskId) returns (Task memory) {
        return tasks[_taskId];
    }

    function getTaskCount() external view returns (uint256) {
        return taskCount;
    }

    function getUserCreatedTasks(address _user) external view returns (uint256[] memory) {
        return userCreatedTasks[_user];
    }

    function getUserAssignedTasks(address _user) external view returns (uint256[] memory) {
        return userAssignedTasks[_user];
    }

    function getActiveTasks() external view returns (Task[] memory) {
        uint256 activeCount;
        for (uint256 i = 1; i <= taskCount; i++) {
            if (!tasks[i].completed && !tasks[i].cancelled && tasks[i].assignee == address(0)) {
                activeCount++;
            }
        }
        
        Task[] memory activeTasks = new Task[](activeCount);
        uint256 index;
        for (uint256 i = 1; i <= taskCount; i++) {
            if (!tasks[i].completed && !tasks[i].cancelled && tasks[i].assignee == address(0)) {
                activeTasks[index] = tasks[i];
                index++;
            }
        }
        
        return activeTasks;
    }
}
