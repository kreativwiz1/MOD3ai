import React, { useState } from 'react';
import { Server } from 'lucide-react';
import toast from 'react-hot-toast';

interface NodeRegistrationProps {
  onRegister: (nodeId: string) => Promise<void>;
}

export function NodeRegistration({ onRegister }: NodeRegistrationProps) {
  const [nodeId, setNodeId] = useState('');

  const handleRegister = async () => {
    if (!nodeId) {
      toast.error('Please enter a node ID');
      return;
    }
    await onRegister(nodeId);
    setNodeId('');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center space-x-2 mb-6">
        <Server className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-bold text-gray-900">Node Registration</h2>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={nodeId}
            onChange={(e) => setNodeId(e.target.value)}
            placeholder="Enter Node ID"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            onClick={handleRegister}
            className="px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}