import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { useContract } from '../hooks/useContract';
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress
} from '@mui/material';
import toast from 'react-hot-toast';

const CreateTask = () => {
  const { active } = useWeb3React();
  const { createTask } = useContract();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    reward: '',
    deadline: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!active) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!formData.title || !formData.description || !formData.reward || !formData.deadline) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await createTask(
        formData.title,
        formData.description,
        formData.deadline,
        formData.reward
      );
      toast.success('Task created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error(error.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  if (!active) {
    return (
      <Container sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          Please connect your wallet to create tasks
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Card sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            <span className="gradient-text">Create New Task</span>
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Task Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
              placeholder="Enter task title"
            />
            
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              multiline
              rows={4}
              sx={{ mb: 3 }}
              placeholder="Describe the task requirements..."
            />
            
            <TextField
              fullWidth
              label="Reward (ARC)"
              name="reward"
              type="number"
              value={formData.reward}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
              placeholder="0.01"
              inputProps={{ step: "0.001", min: "0.001" }}
            />
            
