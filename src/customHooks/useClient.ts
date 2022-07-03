import { useCallback } from 'react';
import { client } from './apiClient';

export function useClient() {
  const localStorageToken = localStorage as Storage;
  const token = localStorageToken["token"];
  return useCallback(
    (endpoint: string, config: any) => client(endpoint, { ...config, token }),
    [token]
  );
}
