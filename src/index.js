import React from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import App from './components/app/App';
import './index.css';

const client = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
);

