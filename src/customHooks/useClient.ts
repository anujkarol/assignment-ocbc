import { useCallback } from "react";
import { client } from "./apiClient";

interface IConfig {
  data: object | undefined;
  method: "GET" | "POST";
  headers: any;
}
export function useClient () {
  const localStorageToken = localStorage as Storage;
  const token = localStorageToken["token"];
  return useCallback(
    (endpoint: string, config: any) => {
      return client(endpoint, { ...config, token });
    },
    [token]
  );
}
 