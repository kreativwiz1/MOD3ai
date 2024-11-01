import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Toaster } from 'react-hot-toast';
import { useWeb3 } from './hooks/useWeb3';
import { WalletConnect } from './components/WalletConnect';
import { StakingCard } from './components/StakingCard';
import { NodeRegistration } from './components/NodeRegistration';
import { Activity } from 'lucide-react';

function App() {
  const { account, contracts, connectWallet } = useWeb3();
  const [tokenBalance, setTokenBalance] = useState('0');
  const [stakedAmount, setStakedAmount] = useState('0');

  useEffect(() => {
    if (account && contracts.token && contracts.mod3) {
      updateBalances();
    }
  }, [account, contracts]);

  const updateBalances = async () => {
    try {
      const [balance, staked] = await Promise.all([
        contracts.token?.balanceOf(account),
        contracts.mod3?.getStake(account)
      ]);

      setTokenBalance(ethers.utils.formatEther(balance || 0));
      setStakedAmount(ethers.utils.formatEther(staked || 0));
    } catch (error) {
      console.error('Error updating balances:', error);
    }
  };

  const handleStake = async (amount: string) => {
    try {
      const amountWei = ethers.utils.parseEther(amount);
      
      const approveTx = await contracts.token?.approve(
        contracts.mod3?.address,
        amountWei
      );
      await approveTx?.wait();
      
      const stakeTx = await contracts.mod3?.stake(amountWei);
      await stakeTx?.wait();
      
      await updateBalances();
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const handleRegisterNode = async (nodeId: string) => {
    try {
      const tx = await contracts.mod3?.registerNode(nodeId);
      await tx?.wait();
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">MOD3.ai Dashboard</span>
            </div>
            <WalletConnect onConnect={connectWallet} account={account} />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {account ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <StakingCard
              tokenBalance={tokenBalance}
              stakedAmount={stakedAmount}
              onStake={handleStake}
            />
            <NodeRegistration onRegister={handleRegisterNode} />
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900">
              Connect your wallet to access the dashboard
            </h2>
            <p className="mt-2 text-gray-600">
              Make sure you have MetaMask installed and are connected to Polygon Amoy Testnet
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;