import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import './styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = ChainId.Mumbai;

const queryClient = new QueryClient();

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <ThirdwebProvider activeChain={activeChain}>
        <App />
      </ThirdwebProvider>
    </React.StrictMode>
  </QueryClientProvider>
);
