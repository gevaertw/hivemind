// Azure AI Foundry Agent Service
// Connects to Azure AI Foundry to interact with the hiveagent

const AZURE_AGENT_ID = import.meta.env.VITE_AZURE_AGENT_ID || 'hiveagent:1';
const AZURE_AIPROJECT_ENDPOINT = import.meta.env.VITE_AZURE_AIPROJECT_ENDPOINT || '';
const API_VERSION = '2024-12-01-preview';

interface ThreadRun {
  id: string;
  status: 'queued' | 'in_progress' | 'completed' | 'failed' | 'cancelled' | 'requires_action';
}

interface ThreadMessage {
  id: string;
  role: 'user' | 'assistant';
  content: Array<{
    type: 'text';
    text: { value: string };
  }>;
}

// Store thread ID for conversation continuity
let currentThreadId: string | null = null;

// Get access token - this should be implemented with MSAL or your auth provider
async function getAccessToken(): Promise<string> {
  // For development, you can use Azure CLI token:
  // az account get-access-token --resource https://cognitiveservices.azure.com --query accessToken -o tsv
  
  // Check if running in development mode with a dev token
  const devToken = import.meta.env.VITE_AZURE_DEV_TOKEN;
  if (devToken) {
    return devToken;
  }
  
  // In production, integrate with MSAL.js or your auth provider
  // For now, try to get token from session storage (can be set by parent app)
  const storedToken = sessionStorage.getItem('azure_access_token');
  if (storedToken) {
    return storedToken;
  }
  
  throw new Error('No authentication token available. Please configure VITE_AZURE_DEV_TOKEN or implement MSAL authentication.');
}

async function apiRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' = 'GET',
  body?: unknown
): Promise<T> {
  const token = await getAccessToken();
  
  const response = await fetch(
    `${AZURE_AIPROJECT_ENDPOINT}${endpoint}?api-version=${API_VERSION}`,
    {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return response.json();
}

// Create a new conversation thread
async function createThread(): Promise<string> {
  const result = await apiRequest<{ id: string }>('/threads', 'POST', {});
  currentThreadId = result.id;
  return result.id;
}

// Ensure we have a thread for the conversation
async function ensureThread(): Promise<string> {
  if (!currentThreadId) {
    return await createThread();
  }
  return currentThreadId;
}

// Send a message and get the agent's response
export async function sendMessageToAgent(
  message: string,
  profileContext?: { name: string; role: string; department: string }
): Promise<string> {
  const threadId = await ensureThread();
  
  // Build message with context
  let messageContent = message;
  if (profileContext) {
    messageContent = `[Context: User is ${profileContext.name}, ${profileContext.role} in ${profileContext.department}]\n\n${message}`;
  }
  
  // Add the user message to the thread
  await apiRequest<ThreadMessage>(`/threads/${threadId}/messages`, 'POST', {
    role: 'user',
    content: messageContent,
  });

  // Create a run to process the message
  const run = await apiRequest<ThreadRun>(`/threads/${threadId}/runs`, 'POST', {
    assistant_id: AZURE_AGENT_ID,
  });

  // Poll for run completion
  let runStatus = run;
  const maxAttempts = 60; // 60 seconds timeout
  let attempts = 0;

  while (
    runStatus.status === 'queued' || 
    runStatus.status === 'in_progress'
  ) {
    if (attempts >= maxAttempts) {
      throw new Error('Agent response timeout');
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    runStatus = await apiRequest<ThreadRun>(`/threads/${threadId}/runs/${run.id}`, 'GET');
    attempts++;
  }

  if (runStatus.status !== 'completed') {
    throw new Error(`Agent run failed with status: ${runStatus.status}`);
  }

  // Get the latest messages from the thread
  const messagesResponse = await apiRequest<{ data: ThreadMessage[] }>(
    `/threads/${threadId}/messages`,
    'GET'
  );

  // Find the latest assistant message
  const assistantMessages = messagesResponse.data.filter(m => m.role === 'assistant');
  if (assistantMessages.length === 0) {
    throw new Error('No response from agent');
  }

  // Get the most recent assistant message
  const latestMessage = assistantMessages[0];
  const textContent = latestMessage.content.find(c => c.type === 'text');
  
  return textContent?.text.value || 'No response content';
}

// Reset the conversation (create new thread)
export async function resetConversation(): Promise<void> {
  currentThreadId = null;
}

// Check if the agent service is configured
export function isAgentConfigured(): boolean {
  return Boolean(AZURE_AIPROJECT_ENDPOINT);
}
