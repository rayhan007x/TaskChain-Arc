# 🚀 TaskChain - Decentralized Task Management dApp on Arc Network

<div align="center">

![TaskChain Logo](https://via.placeholder.com/200x200/6C5CE7/FFFFFF?text=TC)

**A fully decentralized task management platform where users can create tasks, assign rewards, and earn tokens by completing tasks.**

[Live Demo](#) • [Documentation](#) • [Report Bug](#)

</div>

---

## 📖 Project Description

TaskChain is a decentralized task management platform built on Arc Network (an L2 on Ethereum). Users can create tasks with rewards, assign tasks to workers, complete tasks to earn tokens, and manage task lifecycles through smart contracts. The platform features wallet integration, real-time task updates, and a modern React frontend with Material-UI components.

### Key Benefits
- 🔒 **Trustless Execution** - Smart contracts handle all task logic and payments
- 💰 **Instant Rewards** - Workers earn ARC tokens upon task completion
- ⚡ **Fast & Scalable** - Built on Arc's high-performance Layer 2 network
- 🎨 **Modern UI** - Beautiful dark-themed interface with smooth animations
- 📱 **Responsive Design** - Works perfectly on desktop and mobile devices

---

## 🎯 Core Features

### Task Management
- ✍️ **Create Tasks** - Post tasks with title, description, reward, and deadline
- 🔍 **Browse Tasks** - View all available tasks on the dashboard
- 🤝 **Accept Tasks** - Assign yourself to available tasks
- ✅ **Complete Tasks** - Mark tasks as completed
- 💎 **Claim Rewards** - Withdraw earned ARC tokens
- ❌ **Cancel Tasks** - Cancel unassigned tasks and receive refund
- ⚖️ **Dispute System** - Built-in dispute mechanism for conflicts

### Blockchain Integration
- 🔐 **MetaMask Support** - Connect via MetaMask or any Web3 wallet
- 📜 **Smart Contract** - Solidity contract on Arc Network (Chain ID: 1246)
- 💼 **Escrow System** - Funds locked until task completion
- 📊 **Event Tracking** - Real-time updates via contract events

### User Experience
- 🎨 **Glass Morphism Design** - Modern UI with backdrop blur effects
- 🌈 **Gradient Accents** - Beautiful purple-green color scheme
- 📱 **Responsive Layout** - Optimized for all screen sizes
- 🔔 **Toast Notifications** - Real-time feedback for all actions
- ⏳ **Loading States** - Visual feedback during transactions

---

## 🛠️ Technology Stack

### Smart Contract
| Technology | Version | Purpose |
|------------|---------|---------|
| Solidity | 0.8.20 | Smart contract language |
| Hardhat | 2.19.0 | Development framework |
| Arc Network | L2 | Blockchain platform |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI framework |
| Material-UI | 5.14.18 | Component library |
| Ethers.js | 5.7.2 | Blockchain interaction |
| Web3-React | 6.1.9 | Wallet connection |
| React Router | 6.20.0 | Navigation |
| React Hot Toast | 2.4.1 | Notifications |

---

## 📁 Project Structure

taskchain-dapp/
│
├── contracts/
│ ├── TaskChain.sol # Main smart contract
│ └── hardhat.config.js # Hardhat configuration
│
├── src/
│ ├── components/
│ │ └── Header.js # Navigation bar with wallet connect
│ │
│ ├── contracts/
│ │ └── TaskChain.js # Contract ABI and address
│ │
│ ├── hooks/
│ │ └── useContract.js # Custom React hook for contract
│ │
│ ├── pages/
│ │ ├── Dashboard.js # Available tasks listing
│ │ ├── CreateTask.js # Task creation form
│ │ ├── TaskDetails.js # Single task view
│ │ └── MyTasks.js # User's tasks (created & assigned)
│ │
│ ├── App.js # Main application with routing
│ ├── App.css # Global styles
│ ├── index.js # Application entry point
│ ├── index.css # Base CSS styles
│ └── connectors.js # Web3 wallet configuration
│
├── public/
│ └── index.html # HTML template
│
├── .env.example # Environment variables template
├── .gitignore # Git ignore file
├── package.json # Project dependencies
└── README.md # Project documentation



---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** v16+ 
- **npm** or **yarn**
- **MetaMask** browser extension
- **Git**

### Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/taskchain-dapp.git
cd taskchain-dapp

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Add your configuration (optional)
PRIVATE_KEY=your_private_key_here
REACT_APP_CONTRACT_ADDRESS=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb4

### Start Development Server
npm start

### Task Structure

struct Task {
    uint256 id;           // Unique task identifier
    address creator;      // Task creator address
    address assignee;     // Worker address (0x0 if unassigned)
    string title;         // Task title
    string description;   // Task description
    uint256 reward;       // ARC token reward amount
    uint256 deadline;     // Unix timestamp deadline
    bool completed;       // Completion status
    bool disputed;        // Dispute status
    bool cancelled;       // Cancellation status
    uint256 createdAt;    // Creation timestamp
}





