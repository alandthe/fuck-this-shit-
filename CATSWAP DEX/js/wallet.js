import { SONIC_CHAIN } from './config.js';
import { updateBalances } from './tokens.js';

let currentAccount = null;

export async function connectWallet() {
  if (window.ethereum) {
    try {
      // Add Sonic Chain
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [SONIC_CHAIN]
      });
      
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      currentAccount = accounts[0];
      updateBalances();
      return currentAccount;
    } catch (error) {
      console.error("Connection failed:", error);
      throw error;
    }
  } else {
    throw new Error("Please install MetaMask!");
  }
}

// Connect button handler
document.getElementById('connectWallet')?.addEventListener('click', async () => {
  try {
    const account = await connectWallet();
    document.getElementById('connectWallet').textContent = 
      `✔ ${account.slice(0, 6)}...${account.slice(-4)}`;
  } catch (error) {
    alert(error.message);
  }
});
