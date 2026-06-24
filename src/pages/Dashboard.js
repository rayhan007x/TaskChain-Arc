import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { useContract } from '../hooks/useContract';
import { ethers } from 'ethers';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  CircularProgress
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonIcon from '@mui/icons-material/Person';

const Dashboard = () => {
  const { active, account } = useWeb3React();
  const { getActiveTasks, assignTask } = useContract();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (active) {
      loadTasks();
    } else {
      setLoading(false);
    }
  }, [active]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const activeTasks = await getActiveTasks();
      
      const formattedTasks = activeTasks.map(task => ({
        id: task.id.toString(),
        creator: task.creator,
        title: task.title,
        description: task.description,
        reward: ethers.utils.formatEther(task.reward),
        deadline: new Date(task.deadline.toNumber() * 1000).toLocaleString(),
        createdAt: new Date(task.createdAt.toNumber() * 1000).toLocaleString()
      }));
      
      setTasks(formattedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (taskId) => {
    try {
      await assignTask(taskId);
      await loadTasks();
    } catch (error) {
      console.error('Error assigning task:', error);
    }
  };

  if (!active) {
    return (
      <Container sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h4" gutterBottom className="gradient-text">
          Welcome to TaskChain
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Connect your wallet to view and interact with tasks
        </Typography>
      </Container>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        <span className="gradient-text">Available Tasks</span>
      </Typography>

      {tasks.length === 0 ? (
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No tasks available at the moment
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/create')}
            sx={{ mt: 2 }}
          >
            Create New Task
          </Button>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {tasks.map((task) => (
            <Grid item xs={12} md={6} lg={4} key={task.id}>
              <Card sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 40px rgba(108, 92, 231, 0.2)'
                }
              }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                      {task.title}
                    </Typography>
                    <Chip
                      icon={<MonetizationOnIcon />}
                      label={`${task.reward} ARC`}
                      color="secondary"
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 60 }}>
                    {task.description.length > 120 
                      ? `${task.description.substring(0, 120)}...` 
                      : task.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <AccessTimeIcon fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">
                      Deadline: {task.deadline}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <PersonIcon fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">
                      Creator: {task.creator.substring(0, 6)}...{task.creator.substring(38)}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      fullWidth
                      onClick={() => navigate(`/task/${task.id}`)}
                      sx={{ borderRadius: 2 }}
                    >
                      View Details
                    </Button>
                    {task.creator.toLowerCase() !== account.toLowerCase() && (
                      <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        onClick={() => handleAssign(task.id)}
                        sx={{ borderRadius: 2 }}
                      >
                        Accept Task
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;
