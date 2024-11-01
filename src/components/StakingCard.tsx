import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Coins } from 'lucide-react';
import toast from 'react-hot-toast';

interface StakingCardProps {
  tokenBalance: string;
  stakedAmount: string;
  onStake: (amount: string) => Promise<void>;
}

export function StakingCard({ tokenBalance, stakedAmount, onStake }: StakingCardProps) {
  const [amount, setAmount] = useState('');

  const handleStake = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    await onStake(amount);
    setAmount('');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center space-x-2 mb-6">
        <Coins className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-bold text-gray-900">Staking</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Token Balance:</span>
          <span className="font-medium">{tokenBalance} MOD3</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Staked Amount:</span>
          <span className="font-medium">{stakedAmount} MOD3</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount to stake"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            onClick={handleStake}
            className="px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Stake
          </button>
        </div>
      </div>
    </div>
  );
}