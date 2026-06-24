export const TASKCHAIN_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb4";

export const TASKCHAIN_ABI = [
  {
    "inputs": [
      {"internalType": "string","name": "_title","type": "string"},
      {"internalType": "string","name": "_description","type": "string"},
      {"internalType": "uint256","name": "_deadline","type": "uint256"}
    ],
    "name": "createTask",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "_taskId","type": "uint256"}],
    "name": "assignTask",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "_taskId","type": "uint256"}],
    "name": "completeTask",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "_taskId","type": "uint256"}],
    "name": "claimReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "_taskId","type": "uint256"}],
    "name": "cancelTask",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "_taskId","type": "uint256"}],
    "name": "getTask",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256","name": "id","type": "uint256"},
          {"internalType": "address","name": "creator","type": "address"},
          {"internalType": "address","name": "assignee","type": "address"},
          {"internalType": "string","name": "title","type": "string"},
          {"internalType": "string","name": "description","type": "string"},
          {"internalType": "uint256","name": "reward","type": "uint256"},
          {"internalType": "uint256","name": "deadline","type": "uint256"},
          {"internalType": "bool","name": "completed","type": "bool"},
          {"internalType": "bool","name": "disputed","type": "bool"},
          {"internalType": "bool","name": "cancelled","type": "bool"},
          {"internalType": "uint256","name": "createdAt","type": "uint256"}
        ],
        "internalType": "struct TaskChain.Task",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTaskCount",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getActiveTasks",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256","name": "id","type": "uint256"},
          {"internalType": "address","name": "creator","type": "address"},
          {"internalType": "address","name": "assignee","type": "address"},
          {"internalType": "string","name": "title","type": "string"},
          {"internalType": "string","name": "description","type": "string"},
          {"internalType": "uint256","name": "reward","type": "uint256"},
          {"internalType": "uint256","name": "deadline","type": "uint256"},
          {"internalType": "bool","name": "completed","type": "bool"},
          {"internalType": "bool","name": "disputed","type": "bool"},
          {"internalType": "bool","name": "cancelled","type": "bool"},
          {"internalType": "uint256","name": "createdAt","type": "uint256"}
        ],
        "internalType": "struct TaskChain.Task[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true,"internalType": "uint256","name": "taskId","type": "uint256"},
      {"indexed": true,"internalType": "address","name": "creator","type": "address"},
      {"indexed": false,"internalType": "string","name": "title","type": "string"},
      {"indexed": false,"internalType": "uint256","name": "reward","type": "uint256"}
    ],
    "name": "TaskCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true,"internalType": "uint256","name": "taskId","type": "uint256"},
      {"indexed": true,"internalType": "address","name": "assignee","type": "address"}
    ],
    "name": "TaskAssigned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true,"internalType": "uint256","name": "taskId","type": "uint256"},
      {"indexed": true,"internalType": "address","name": "assignee","type": "address"}
    ],
    "name": "TaskCompleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true,"internalType": "uint256","name": "taskId","type": "uint256"},
      {"indexed": true,"internalType": "address","name": "claimer","type": "address"},
      {"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}
    ],
    "name": "RewardClaimed",
    "type": "event"
  }
];
