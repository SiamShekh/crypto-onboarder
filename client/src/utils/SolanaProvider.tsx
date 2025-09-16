import { FC, ReactNode, useMemo } from "react";
import {
    ConnectionProvider,
    WalletProvider
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    TrustWalletAdapter,

} from "@solana/wallet-adapter-wallets"; 

interface SolanaProviderProps {
    children: ReactNode;
}

export const SolanaProvider: FC<SolanaProviderProps> = ({ children }) => {
    const network = WalletAdapterNetwork.Devnet;

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[
                new PhantomWalletAdapter,
                new SolflareWalletAdapter,
                new TrustWalletAdapter,
            ]} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};