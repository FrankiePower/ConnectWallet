import React, { useState, useEffect } from "react";
import { BrowserProvider, Signer } from "ethers"; // ethers v6
import { WalletConnector } from "./hooks/useWalletConnector";

const Eip1193WalletConnector: React.FC = () => {
  const { account, chainId, connectWallet, disconnectWallet, isConnected } =
    WalletConnector();

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
        <input type="text" />
      </div>
    </>
  );
};

export default Eip1193WalletConnector;
