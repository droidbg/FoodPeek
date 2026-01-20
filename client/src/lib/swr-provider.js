import { SWRConfig } from "swr";
import { swrConfig } from "../services/api";

/**
 * SWR Provider Component
 * Wraps the app with SWR configuration
 */
export const SWRProvider = ({ children }) => {
  return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
};
