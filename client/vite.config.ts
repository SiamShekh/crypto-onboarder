import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mkcert from 'vite-plugin-mkcert';
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mkcert(),
    nodePolyfills()
  ],
  server: {
    host: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          solana: ["@solana/web3.js", "@solana/wallet-adapter-react", "@solana/wallet-adapter-wallets"],
          walletconnect: ["@walletconnect/utils", "@toruslabs/eccrypto"],
          jwt: ["jsonwebtoken", "jwt-decode"],
        },
      },
    },
    chunkSizeWarningLimit: 1500,
  }
})
