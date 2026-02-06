import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const clientId = import.meta.env.VITE_AZURE_CLIENT_ID;

if (clientId) {
  // MSAL authentication is configured
  import('./services/authConfig').then(({ msalInstance }) => {
    import('@azure/msal-react').then(({ MsalProvider }) => {
      msalInstance.initialize().then(() => {
        ReactDOM.createRoot(document.getElementById('root')!).render(
          <React.StrictMode>
            <MsalProvider instance={msalInstance}>
              <App />
            </MsalProvider>
          </React.StrictMode>
        );
      });
    });
  });
} else {
  // No MSAL - run without authentication wrapper
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
