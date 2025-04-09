import { CONTRACT_ADDRESSES, ERC20_ABI, getContract } from './contracts.js';
import { showNotification } from './utils.js';

export async function getTokenBalance(tokenAddress) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = getContract(tokenAddress, ERC20_ABI, provider);
  const balance = await contract.balanceOf(window.ethereum.selectedAddress);
  return ethers.utils.formatUnits(balance, 18);
}

export async function approveToken(tokenAddress, spender, amount) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = getContract(tokenAddress, ERC20_ABI, signer);
  
  const tx = await contract.approve(
    spender,
    ethers.utils.parseUnits(amount.toString(), 18)
  );
  
  await tx.wait();
}

export async function updateBalances() {
  if (!window.ethereum?.selectedAddress) return;
  
  try {
    const [wcBal, sonicBal] = await Promise.all([
      getTokenBalance(CONTRACT_ADDRESSES.wcToken),
      getTokenBalance(CONTRACT_ADDRESSES.sonicToken)
    ]);
    
    document.querySelectorAll('.token-balance').forEach(el => {
      if (el.id.includes('wc')) el.textContent = `Balance: ${parseFloat(wcBal).toFixed(2)}`;
      if (el.id.includes('s')) el.textContent = `Balance: ${parseFloat(sonicBal).toFixed(2)}`;
    });
  } catch (error) {
    console.error("Balance update failed:", error);
  }
}
