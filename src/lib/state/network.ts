import { useMemo } from "react";
import TonWeb from "tonweb";
import { useNetwork } from ".";

export interface NetworkConfig {
  name: string;
  rpcUrl: string;
  apiKey?: string;
  scanUrl: string;
}

const networkConfigs: NetworkConfig[] = [
  {
    name: "Mainnet",
    rpcUrl: "https://toncenter.com/api/v2/jsonRPC",
    apiKey: process.env.REACT_APP_TONCENTER_API_KEY,
    scanUrl: "https://tonscan.org/",
  },
  {
    name: "Testnet",
    rpcUrl: "https://testnet.toncenter.com/api/v2/jsonRPC",
    apiKey: process.env.REACT_APP_TONCENTER_TESTNET_API_KEY,
    scanUrl: "https://testnet.tonscan.org/",
  },
];

export const useTonProvider = () => {
  const config = useNetworkConfig();

  return useMemo(() => {
    return new TonWeb(
      new TonWeb.HttpProvider(config.rpcUrl, { apiKey: config.apiKey })
    );
  }, [config]);
};

export const useNetworkConfig = () => {
  const { data } = useNetwork();
  return useMemo(() => {
    const result = networkConfigs.find((item) => item.name === data);
    return result ?? networkConfigs[0];
  }, [data]);
};
