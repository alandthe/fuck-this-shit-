export function showNotification(type, message) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 5000);
}

export function formatAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
