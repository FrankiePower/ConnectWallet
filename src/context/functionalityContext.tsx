import { BrowserProvider } from "ethers";
import { createContext, useState } from "react";

interface IWalletContext {
  account: string | null;
  setAccount: React.Dispatch<React.SetStateAction<string | null>>;
  chainId: string | null;
  setChainId: React.Dispatch<React.SetStateAction<string | null>>;
  provider: BrowserProvider | null;
  setProvider: React.Dispatch<React.SetStateAction<BrowserProvider | null>>;
  balance: string | null;
  setBalance: React.Dispatch<React.SetStateAction<string>>;
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

const WalletContext = createContext<IWalletContext>({
  account: "",
  setAccount: () => {},
  chainId: "",
  setChainId: () => {},
  provider: null,
  setProvider: () => {},
  balance: "",
  setBalance: () => {},
  isConnected: false,
  setIsConnected: () => {},
});

const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [balance, setBalance] = useState("");
  const [isConnected, setIsConnected] = useState<boolean>(false);

  return (
    <WalletContext.Provider
      value={{
        account,
        setAccount,
        chainId,
        setChainId,
        provider,
        setProvider,
        balance,
        setBalance,
        isConnected,
        setIsConnected,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export { WalletContext, WalletProvider };
