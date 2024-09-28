import { useState, useEffect } from "react";
import { BrowserProvider, Signer } from "ethers"; // ethers v6

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const WalletConnector = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<bigint | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [balance, setBalance] = useState("");
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Function to connect to the wallet
  const connectWallet = async () => {
    if ((window as any).ethereum) {
      try {
        const ethereum = (window as any).ethereum;

        // Request accounts to trigger MetaMask popup
        await ethereum.request({ method: "eth_requestAccounts" });

        const provider = new BrowserProvider(ethereum); // ethers v6 - BrowserProvider
        const signer: Signer = await provider.getSigner(); // ethers v6 - get signer
        const account = await signer.getAddress(); // ethers v6 - get account address
        const network = await provider.getNetwork(); // ethers v6 - get network info

        setProvider(provider);
        setAccount(account);
        setIsConnected(true);
        setChainId(network.chainId);

        console.log("Connected to account:", account);
      } catch (error) {
        console.error("Failed to connect:", error);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask!");
    }
  };

  // Function to disconnect wallet (simulated by clearing state)
  const disconnectWallet = () => {
    setAccount(null);
    setChainId(null);
    setIsConnected(false);
    console.log("Disconnected from wallet");
  };

  const fetchBalance = async (address: string) => {
    if (window.ethereum) {
      try {
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [address, "latest"],
        });
        setBalance(parseInt(balance as string, 16).toString());
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance("Error");
      }
    }
  };

  useEffect(() => {
    const { ethereum } = window as any;

    if (ethereum) {
      ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAccount(accounts[0]);
        }
      });

      ethereum.on("chainChanged", (chainId: string) => {
        setChainId(BigInt(parseInt(chainId, 16)));
      });

      return () => {
        ethereum.removeListener("chainChanged", () => {});
        ethereum.removeListener("accountsChanged", () => {});
      };
    }
  }, []);

  return { account, chainId, connectWallet, disconnectWallet, isConnected };
};

{
  /* 
  useEffect(() => {
  
    if (isConnected && addressInput) {
      fetchBalance(addressInput);
    } else {
      setBalance("");
    }
  }, [isConnected, addressInput, chainId]);

  
  }; */
}
