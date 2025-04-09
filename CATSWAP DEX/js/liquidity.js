import { CONTRACT_ADDRESSES, CatSwapDEX_ABI, getContract } from './contracts.js';
import { approveToken, updateBalances } from './tokens.js';
import { showNotification } from './utils.js';

export async function addLiquidity(wcAmount, sonicAmount) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = getContract(CONTRACT_ADDRESSES.dex, CatSwapDEX_ABI, signer);

  try {
    // Approve both tokens
    await Promise.all([
      approveToken(CONTRACT_ADDRESSES.wcToken, CONTRACT_ADDRESSES.dex, wcAmount),
      approveToken(CONTRACT_ADDRESSES.sonicToken, CONTRACT_ADDRESSES.dex, sonicAmount)
    ]);

    // Add liquidity
    const tx = await contract.addLiquidity(
      ethers.utils.parseUnits(wcAmount, 18),
      ethers.utils.parseUnits(sonicAmount, 18)
    );

    await tx.wait();
    showNotification('success', 'Liquidity added!');
    updateBalances();
  } catch (error) {
    showNotification('error', `Failed: ${error.message}`);
    throw error;
  }
}
