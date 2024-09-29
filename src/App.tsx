import { useState } from "react";
import { WalletConnector } from "./hooks/useWalletConnector";

const Eip1193WalletConnector: React.FC = () => {
  const {
    account,
    chainId,
    connectWallet,
    disconnectWallet,
    isConnected,
    fetchBalance,
    balance,
  } = WalletConnector();

  const [addressInput, setAddressInput] = useState("");

  return (
    <>
      <div>
        <h1>Connect Wallet</h1>

        {isConnected ? (
          <div>
            <p>Connected Account: {account}</p>
            <p>Chain ID: {chainId ? chainId.toString() : "Not connected"}</p>
            <button onClick={disconnectWallet}>Disconnect Wallet</button>
          </div>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </div>
      <div>
        <div>
          <input
            type="text"
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
            placeholder="Enter Address"
            className="addinput"
          />
          <button
            onClick={() => fetchBalance(addressInput)}
            disabled={!addressInput}
          >
            Fetch
          </button>
        </div>
        <div className="balance">
          Balance of {account}:{balance}
        </div>
      </div>
    </>
  );
};

export default Eip1193WalletConnector;
