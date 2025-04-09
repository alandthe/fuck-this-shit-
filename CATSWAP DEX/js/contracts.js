// contracts.js
import { ethers } from "ethers";
import { CONTRACT_ADDRESSES } from './config.js';

export const CatSwapDEX_ABI = [
  // Swap Functions
  "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
  "function swapTokensForExactTokens(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",

  // Liquidity Functions
  "function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB, uint liquidity)",
  "function removeLiquidity(address tokenA, address tokenB, uint liquidity, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB)",

  // View Functions
  "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)",
  "function getAmountsIn(uint amountOut, address[] memory path) public view returns (uint[] memory amounts)",
  "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",

  // Events
  "event Swap(address indexed sender, uint amount0In, uint amount1In, uint amount0Out, uint amount1Out, address indexed to)",
  "event Mint(address indexed sender, uint amount0, uint amount1)",
  "event Burn(address indexed sender, uint amount0, uint amount1, address indexed to)"
];

export const ERC20_ABI = [
  // Standard ERC20 Functions
  "function name() public view returns (string)",
  "function symbol() public view returns (string)",
  "function decimals() public view returns (uint8)",
  "function totalSupply() public view returns (uint256)",
  "function balanceOf(address _owner) public view returns (uint256 balance)",
  "function transfer(address _to, uint256 _value) public returns (bool success)",
  "function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)",
  "function approve(address _spender, uint256 _value) public returns (bool success)",
  "function allowance(address _owner, address _spender) public view returns (uint256 remaining)",

  // Events
  "event Transfer(address indexed _from, address indexed _to, uint256 _value)",
  "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
];

export function getContract(address, abi, signerOrProvider) {
  if (!ethers.utils.isAddress(address)) {
    throw new Error(`Invalid contract address: ${address}`);
  }
  return new ethers.Contract(address, abi, signerOrProvider);
}

// Helper functions for specific contracts
export function getDexContract(signerOrProvider) {
  return getContract(CONTRACT_ADDRESSES.dex, CatSwapDEX_ABI, signerOrProvider);
}

export function getWcTokenContract(signerOrProvider) {
  return getContract(CONTRACT_ADDRESSES.wcToken, ERC20_ABI, signerOrProvider);
}

export function getSonicTokenContract(signerOrProvider) {
  return getContract(CONTRACT_ADDRESSES.sonicToken, ERC20_ABI, signerOrProvider);
}
