import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { CONFIG } from '../config/contracts';
import { MOD3POA_ABI, MOCKTOKEN_ABI } from '../config/abis';
import toast from 'react-hot-toast';

export function useWeb3() {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [account, setAccount] = useState<string>('');
  const [contracts, setContracts] = useState<{
    mod3: ethers.Contract | null;
    token: ethers.Contract | null;
  }>({ mod3: null, token: null });

  const checkNetwork = useCallback(async (provider: ethers.providers.Web3Provider) => {
    const network = await provider.getNetwork();
    if (network.chainId !== parseInt(CONFIG.NETWORK.CHAIN_ID, 16)) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: CONFIG.NETWORK.CHAIN_ID }]
        });
      } catch (error: any) {
        if (error.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: CONFIG.NETWORK.CHAIN_ID,
              chainName: CONFIG.NETWORK.NAME,
              nativeCurrency: CONFIG.NETWORK.CURRENCY,
              rpcUrls: [CONFIG.NETWORK.RPC_URL],
              blockExplorerUrls: [CONFIG.NETWORK.EXPLORER_URL]
            }]
          });
        } else {
          throw error;
        }
      }
    }
  }, []);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      toast.error('Please install MetaMask');
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await checkNetwork(provider);
      
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      const mod3Contract = new ethers.Contract(
        CONFIG.CONTRACTS.MOD3POA,
        MOD3POA_ABI,
        signer
      );

      const tokenContract = new ethers.Contract(
        CONFIG.CONTRACTS.MOCKTOKEN,
        MOCKTOKEN_ABI,
        signer
      );

      setProvider(provider);
      setSigner(signer);
      setAccount(address);
      setContracts({ mod3: mod3Contract, token: tokenContract });

      return accounts[0];
    } catch (error: any) {
      toast.error(error.message);
      return null;
    }
  }, [checkNetwork]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => window.location.reload());
      window.ethereum.on('chainChanged', () => window.location.reload());
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, []);

  return {
    provider,
    signer,
    account,
    contracts,
    connectWallet
  };
}