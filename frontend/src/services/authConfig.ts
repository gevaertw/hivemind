import { Configuration, PublicClientApplication } from '@azure/msal-browser';

const clientId = import.meta.env.VITE_AZURE_CLIENT_ID;
const tenantId = import.meta.env.VITE_AZURE_TENANT_ID;

if (!clientId || !tenantId) {
  console.error('MSAL not configured. Set VITE_AZURE_CLIENT_ID and VITE_AZURE_TENANT_ID in .env');
}

const msalConfig: Configuration = {
  auth: {
    clientId: clientId || '',
    authority: `https://login.microsoftonline.com/${tenantId || 'common'}`,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const loginRequest = {
  scopes: ['https://cognitiveservices.azure.com/user_impersonation'],
};

export async function getAccessToken(): Promise<string> {
  // Check if MSAL is properly configured
  if (!clientId || !tenantId) {
    throw new Error('Entra ID authentication not configured. Please set VITE_AZURE_CLIENT_ID and VITE_AZURE_TENANT_ID.');
  }

  // Ensure MSAL is initialized
  await msalInstance.initialize();

  const accounts = msalInstance.getAllAccounts();
  
  if (accounts.length === 0) {
    // No user signed in, trigger login popup
    const response = await msalInstance.loginPopup(loginRequest);
    return response.accessToken;
  }

  // Get token silently for signed-in user
  try {
    const response = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account: accounts[0],
    });
    return response.accessToken;
  } catch {
    // Silent token acquisition failed, use popup
    const response = await msalInstance.acquireTokenPopup(loginRequest);
    return response.accessToken;
  }
}

export function isAuthenticated(): boolean {
  return msalInstance.getAllAccounts().length > 0;
}

export async function signIn(): Promise<void> {
  await msalInstance.initialize();
  await msalInstance.loginPopup(loginRequest);
}

export async function signOut(): Promise<void> {
  await msalInstance.logoutPopup();
}