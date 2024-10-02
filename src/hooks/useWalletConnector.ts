import { useEffect } from "react";
import { BrowserProvider, Signer } from "ethers"; // ethers v6
import { useContext } from "react";
import { WalletContext } from "../context/functionalityContext";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const WalletConnector = () => {
  const {
    account,
    provider,
    setProvider,
    balance,
    setBalance,
    isConnected,
    setIsConnected,
    setAccount,
    chainId,
    setChainId,
  } = useContext(WalletContext);

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
        setChainId(network.chainId.toString());
        await fetchBalance(account);
      } catch (error) {}
    } else {
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
    if (!window.ethereum) {
      alert("error");
      console.error("Ethereum provider not found");
      return;
    }
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });
      console.log(balance);
      setBalance(parseInt(balance as string, 16).toString());
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance("Error");
    }
  };

  const handleaccountchange = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setAccount(accounts[0]);
    }
  };

  const handlechainchanged = (chainId: string) => {
    setChainId(chainId);
  };

  useEffect(() => {
    const { ethereum } = window as any;

    if (ethereum) {
      ethereum.on("accountsChanged", handleaccountchange);

      ethereum.on("chainChanged", handlechainchanged);

      return () => {
        ethereum.removeListener("chainChanged", handlechainchanged);
        ethereum.removeListener("accountsChanged", handleaccountchange);
      };
    }
  }, []);

  return {
    account,
    chainId,
    connectWallet,
    disconnectWallet,
    isConnected,
    provider,
    balance,
    fetchBalance,
  };
};
