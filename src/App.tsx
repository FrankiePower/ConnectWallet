import { useState } from "react";
import { WalletConnector } from "./hooks/useWalletConnector";

const Eip1193WalletConnector: React.FC = () => {
  const { account, chainId, connectWallet, disconnectWallet, isConnected } =
    WalletConnector();

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
        <input
          type="text"
          value={addressInput}
          onChange={(e) => setAddressInput(e.target.value)}
          placeholder="Enter Address"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </>
  );
};

export default Eip1193WalletConnector;
