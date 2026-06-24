import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { TASKCHAIN_ADDRESS, TASKCHAIN_ABI } from '../contracts/TaskChain';

export function useContract() {
  const { library, account } = useWeb3React();

  const getContract = () => {
    if (!library) return null;
    const signer = library.getSigner();
    return new ethers.Contract(TASKCHAIN_ADDRESS, TASKCHAIN_ABI, signer);
  };

  const createTask = async (title, description, deadline, reward) => {
    const contract = getContract();
    if (!contract) throw new Error("Contract not initialized");
    
    const tx = await contract.createTask(
      title,
      description,
      Math.floor(new Date(deadline).getTime() / 1000),
      { value: ethers.utils.parseEther(reward) }
    );
    
    const receipt = await tx.wait();
    return receipt;
  };

  const assignTask = async (taskId) => {
    const contract = getContract();
    if (!contract) throw new Error("Contract not initialized");
    
    const tx = await contract.assignTask(taskId);
    await tx.wait();
  };

  const completeTask = async (taskId) => {
    const contract = getContract();
    if (!contract) throw new Error("Contract not initialized");
    
    const tx = await contract.completeTask(taskId);
    await tx.wait();
  };

  const claimReward = async (taskId) => {
    const contract = getContract();
    if (!contract) throw new Error("Contract not initialized");
    
    const tx = await contract.claimReward(taskId);
    await tx.wait();
  };

  const cancelTask = async (taskId) => {
    const contract = getContract();
    if (!contract) throw new Error("Contract not initialized");
    
    const tx = await contract.cancelTask(taskId);
    await tx.wait();
  };

  const getTask = async (taskId) => {
    const contract = getContract();
    if (!contract) throw new Error("Contract not initialized");
    
    const task = await contract.getTask(taskId);
    return task;
  };

  const getActiveTasks = async () => {
    const contract = getContract();
    if (!contract) throw new Error("Contract not initialized");
    
    const tasks = await contract.getActiveTasks();
    return tasks;
  };

  return {
    createTask,
    assignTask,
    completeTask,
    claimReward,
    cancelTask,
    getTask,
    getActiveTasks
  };
}
