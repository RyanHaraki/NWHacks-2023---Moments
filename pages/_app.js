import "@/styles/globals.css";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ThirdwebSDKProvider, ChainId } from "@thirdweb-dev/react";
const desiredChainId = ChainId.Mumbai;

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
  }),
});

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebSDKProvider desiredChainId={desiredChainId}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <LivepeerConfig client={livepeerClient}>
            <Component {...pageProps} />
          </LivepeerConfig>
        </RainbowKitProvider>
      </WagmiConfig>
    </ThirdwebSDKProvider>
  );
}
