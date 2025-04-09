import { CONTRACT_ADDRESSES, CatSwapDEX_ABI, getContract } from './contracts.js';
import { approveToken, updateBalances } from './tokens.js';
import { showNotification } from './utils.js';

export async function executeSwap(fromToken, amountIn, minAmountOut) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = getContract(CONTRACT_ADDRESSES.dex, CatSwapDEX_ABI, signer);

  try {
    // Approve token
    const tokenAddress = fromToken === 'WC' 
      ? CONTRACT_ADDRESSES.wcToken 
      : CONTRACT_ADDRESSES.sonicToken;
    
    await approveToken(tokenAddress, CONTRACT_ADDRESSES.dex, amountIn);

    // Execute swap
    const tx = fromToken === 'WC'
      ? await contract.swapWCForSonic(
          ethers.utils.parseUnits(amountIn, 18),
          ethers.utils.parseUnits(minAmountOut, 18)
        )
      : await contract.swapSonicForWC(
          ethers.utils.parseUnits(amountIn, 18),
          ethers.utils.parseUnits(minAmountOut, 18)
        );

    await tx.wait();
    showNotification('success', 'Swap successful!');
    updateBalances();
  } catch (error) {
    showNotification('error', `Swap failed: ${error.message}`);
    throw error;
  }
}
