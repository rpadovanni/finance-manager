import './index.css';
import '@radix-ui/themes/styles.css';

import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Theme, ThemePanel } from '@radix-ui/themes';

import App from './App.tsx';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <StrictMode>
    <Theme accentColor="amber" radius="large" scaling="95%">
      <App />
      <ThemePanel />
    </Theme>
  </StrictMode>
);
