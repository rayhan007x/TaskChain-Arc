import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../connectors';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Chip
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AssignmentIcon from '@mui/icons-material/Assignment';

const Header = () => {
  const { active, account, activate, deactivate } = useWeb3React();
  const location = useLocation();

  const connectWallet = async () => {
    try {
      await activate(injected);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnectWallet = () => {
    try {
      deactivate();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  const formatAddress = (addr) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <AppBar position="fixed" sx={{ 
      background: 'rgba(10, 10, 26, 0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(108, 92, 231, 0.3)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
    }}>
      <Toolbar sx={{ justifyContent: 'space-between', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            <span className="gradient-text">TaskChain</span>
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, ml: 4 }}>
            <Button
              component={Link}
              to="/"
              color="inherit"
              startIcon={<DashboardIcon />}
              sx={{ 
                borderRadius: 2,
                background: location.pathname === '/' ? 'rgba(108, 92, 231, 0.2)' : 'transparent',
                '&:hover': { background: 'rgba(108, 92, 231, 0.3)' }
              }}
            >
              Dashboard
            </Button>
            <Button
              component={Link}
              to="/create"
              color="inherit"
              startIcon={<AddTaskIcon />}
              sx={{ 
                borderRadius: 2,
                background: location.pathname === '/create' ? 'rgba(108, 92, 231, 0.2)' : 'transparent',
                '&:hover': { background: 'rgba(108, 92, 231, 0.3)' }
              }}
            >
              Create Task
            </Button>
            <Button
              component={Link}
              to="/my-tasks"
              color="inherit"
              startIcon={<AssignmentIcon />}
              sx={{ 
                borderRadius: 2,
                background: location.pathname === '/my-tasks' ? 'rgba(108, 92, 231, 0.2)' : 'transparent',
                '&:hover': { background: 'rgba(108, 92, 231, 0.3)' }
              }}
            >
              My Tasks
            </Button>
          </Box>
        </Box>

        <Box>
          {active ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip
                icon={<AccountBalanceWalletIcon />}
                label={formatAddress(account)}
                color="primary"
                variant="outlined"
                sx={{ borderRadius: 2, borderColor: 'rgba(108, 92, 231, 0.5)' }}
              />
              <Button
                variant="outlined"
                color="error"
                onClick={disconnectWallet}
                sx={{ borderRadius: 2 }}
              >
                Disconnect
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              onClick={connectWallet}
              startIcon={<AccountBalanceWalletIcon />}
              sx={{
                background: 'linear-gradient(135deg, #6C5CE7 0%, #00B894 100%)',
                borderRadius: 2,
                '&:hover': {
                  background: 'linear-gradient(135deg, #5B4BC7 0%, #00A383 100%)',
                }
              }}
            >
              Connect Wallet
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
