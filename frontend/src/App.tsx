import { useState, useCallback } from 'react';
import { Profile, ChatMessage, PeriodOption, PERIOD_OPTIONS } from '@/types';
import { mockProfiles, mockEvents, initialChatMessages, generateMockChatResponse } from '@/data/mockData';
import { ProfileSelector } from '@/components/ProfileSelector';
import { CustomerOverview } from '@/components/CustomerOverview';
import { ChatInterface } from '@/components/ChatInterface';
import { Hexagon, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

function App() {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodOption>(PERIOD_OPTIONS[2]); // Default: 2 weeks
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSelectProfile = useCallback((profile: Profile) => {
    setSelectedProfile(profile);
    // Add a personalized greeting when profile changes
    const greeting: ChatMessage = {
      id: `msg-greeting-${Date.now()}`,
      role: 'assistant',
      content: `Hello ${profile.name}! I'm now configured for your role as ${profile.role}. I'll provide Proximus insights relevant to ${profile.department}. What would you like to know?`,
      timestamp: new Date(),
    };
    setMessages([...initialChatMessages, greeting]);
  }, []);

  const handleSendMessage = useCallback(
    async (content: string) => {
      if (!selectedProfile) return;

      // Add user message
      const userMessage: ChatMessage = {
        id: `msg-user-${Date.now()}`,
        role: 'user',
        content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

      // Generate mock response based on profile
      const responseContent = generateMockChatResponse(content, selectedProfile);
      const assistantMessage: ChatMessage = {
        id: `msg-assistant-${Date.now()}`,
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    },
    [selectedProfile]
  );

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-3 shrink-0">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary">
                <Hexagon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">hAIvemind</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Customer Intelligence Platform
                </p>
              </div>
            </div>
          </div>
          
          {selectedProfile && (
            <div className="hidden md:flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Logged in as</span>
              <span className="font-medium">{selectedProfile.name}</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-primary">{selectedProfile.role}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto w-full flex min-h-0 overflow-hidden">
          {/* Sidebar */}
          <aside
            className={`
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              lg:translate-x-0
              fixed lg:static inset-y-0 left-0 z-40
              w-80 lg:w-80 shrink-0 border-r border-border bg-card
              transition-transform duration-200 ease-in-out
              pt-16 lg:pt-0
            `}
          >
            <div className="h-full p-4 overflow-y-auto">
              <ProfileSelector
                profiles={mockProfiles}
                selectedProfile={selectedProfile}
                onSelectProfile={handleSelectProfile}
              />
            </div>
          </aside>

          {/* Overlay for mobile sidebar */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content Area */}
          <main className="flex-1 flex min-h-0 p-4 gap-4 overflow-hidden">
            {/* Customer Overview */}
            <div className="flex-1 flex flex-col min-h-0 min-w-0 overflow-hidden">
              <CustomerOverview
                events={mockEvents}
                selectedPeriod={selectedPeriod}
                onSelectPeriod={setSelectedPeriod}
              />
            </div>

            {/* Chat Interface */}
            <div className="w-96 xl:w-[28rem] shrink-0 hidden md:flex flex-col min-h-0 overflow-hidden">
              <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                profile={selectedProfile}
                isLoading={isLoading}
              />
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Chat Toggle */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <Button
          size="lg"
          className="rounded-full shadow-lg h-14 w-14"
          onClick={() => {
            // Could implement a mobile chat modal here
            alert('Chat interface is available on larger screens. Please use a tablet or desktop.');
          }}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </Button>
      </div>
    </div>
  );
}

export default App;
