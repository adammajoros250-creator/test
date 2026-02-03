export function useMockAccount() {
  return {
    address: undefined,
    isConnected: false,
    isConnecting: false,
    isDisconnected: true,
    status: 'disconnected',
  };
}
