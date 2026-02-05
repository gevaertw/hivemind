import { useState, useRef, useEffect, FormEvent } from 'react';
import { ChatMessage, Profile } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
// Mock response generator is used in App.tsx
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  profile: Profile | null;
  isLoading?: boolean;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

// Simple markdown-like formatter for chat messages
function formatMessageContent(content: string): React.ReactNode {
  const lines = content.split('\n');
  
  return lines.map((line, lineIndex) => {
    // Headers
    if (line.startsWith('**') && line.endsWith('**')) {
      return (
        <strong key={lineIndex} className="block font-semibold">
          {line.slice(2, -2)}
        </strong>
      );
    }
    
    // Bold text within line
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const formattedParts = parts.map((part, partIndex) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
    
    // Bullet points
    if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
      return (
        <li key={lineIndex} className="ml-4 list-disc">
          {formattedParts}
        </li>
      );
    }
    
    // Numbered items
    if (/^\d+\./.test(line.trim())) {
      return (
        <li key={lineIndex} className="ml-4 list-decimal">
          {formattedParts}
        </li>
      );
    }
    
    // Empty lines
    if (line.trim() === '') {
      return <br key={lineIndex} />;
    }
    
    return (
      <span key={lineIndex} className="block">
        {formattedParts}
      </span>
    );
  });
}

export function ChatInterface({
  messages,
  onSendMessage,
  profile,
  isLoading = false,
}: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const suggestedQuestions = profile
    ? [
        profile.role === 'Customer Success Manager'
          ? 'Which customers are at risk of churning?'
          : profile.role === 'Sales Executive'
          ? 'What are the top prospects this week?'
          : profile.role === 'Support Lead'
          ? 'Show me open high-priority tickets'
          : profile.role === 'Product Manager'
          ? 'What features are customers requesting?'
          : 'What is the overall customer sentiment?',
        'Give me a summary of this week\'s activity',
        'Which customers need immediate attention?',
      ]
    : [];

  return (
    <Card className="flex-1 flex flex-col min-h-0">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Hivemind Assistant</CardTitle>
            <p className="text-sm text-muted-foreground">
              {profile
                ? `Personalized for ${profile.role}`
                : 'Select a profile to get personalized insights'}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col min-h-0 p-0">
        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback
                    className={
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent text-accent-foreground'
                    }
                  >
                    {message.role === 'user' ? (
                      profile?.avatar || <User className="h-4 w-4" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`flex-1 max-w-[80%] ${
                    message.role === 'user' ? 'text-right' : ''
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg text-sm ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    <div className="text-left whitespace-pre-wrap">
                      {formatMessageContent(message.content)}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    <Sparkles className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="p-3 rounded-lg bg-secondary">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Suggested Questions */}
        {messages.length <= 1 && profile && (
          <div className="px-4 pb-2">
            <p className="text-xs text-muted-foreground mb-2">
              Suggested questions:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => onSendMessage(question)}
                  disabled={isLoading}
                  className="text-xs px-3 py-1.5 rounded-full border border-border bg-card hover:bg-secondary transition-colors disabled:opacity-50"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <form
          onSubmit={handleSubmit}
          className="p-4 border-t border-border bg-card"
        >
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                profile
                  ? 'Ask about your customers...'
                  : 'Select a profile to start chatting'
              }
              disabled={!profile || isLoading}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={!profile || !input.trim() || isLoading}
              size="icon"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
