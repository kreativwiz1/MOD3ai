import React from 'react';
import { Wallet } from 'lucide-react';

interface WalletConnectProps {
  onConnect: () => void;
  account: string;
}

export function WalletConnect({ onConnect, account }: WalletConnectProps) {
  return (
    <div className="flex items-center space-x-4">
      {!account ? (
        <button
          onClick={onConnect}
          className="flex items-center px-4 py-2 space-x-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Wallet className="w-5 h-5" />
          <span>Connect Wallet</span>
        </button>
      ) : (
        <div className="flex items-center px-4 py-2 space-x-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg">
          <Wallet className="w-5 h-5" />
          <span>{`${account.substring(0, 6)}...${account.substring(38)}`}</span>
        </div>
      )}
    </div>
  );
}