import { useMemo } from 'react';
import { CustomerEvent, PeriodOption } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { PeriodSelector } from './PeriodSelector';
import {
  Mail,
  Phone,
  Calendar,
  Ticket,
  ShoppingCart,
  MessageSquare,
  Share2,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react';

interface CustomerOverviewProps {
  events: CustomerEvent[];
  selectedPeriod: PeriodOption;
  onSelectPeriod: (period: PeriodOption) => void;
}

const eventIcons: Record<CustomerEvent['type'], React.ElementType> = {
  email: Mail,
  call: Phone,
  meeting: Calendar,
  ticket: Ticket,
  purchase: ShoppingCart,
  feedback: MessageSquare,
  social: Share2,
};

const sentimentConfig = {
  positive: { icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
  neutral: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  negative: { icon: TrendingDown, color: 'text-red-600', bg: 'bg-red-100' },
};

const priorityConfig = {
  high: { variant: 'destructive' as const, label: 'High Priority' },
  medium: { variant: 'warning' as const, label: 'Medium' },
  low: { variant: 'secondary' as const, label: 'Low' },
};

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Format full date for tooltips (reserved for future use)
// function formatFullDate(date: Date): string {
//   return date.toLocaleDateString('en-US', {
//     weekday: 'short',
//     month: 'short',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: '2-digit',
//   });
// }

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  trend?: 'up' | 'down' | 'neutral';
}

function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      {trend && (
        <div className="ml-auto">
          {trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600" />}
          {trend === 'down' && <TrendingDown className="h-4 w-4 text-red-600" />}
        </div>
      )}
    </div>
  );
}

export function CustomerOverview({
  events,
  selectedPeriod,
  onSelectPeriod,
}: CustomerOverviewProps) {
  const filteredEvents = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - selectedPeriod.days);
    return events.filter((event) => event.timestamp >= cutoff);
  }, [events, selectedPeriod]);

  const stats = useMemo(() => {
    const positive = filteredEvents.filter((e) => e.sentiment === 'positive').length;
    const negative = filteredEvents.filter((e) => e.sentiment === 'negative').length;
    const highPriority = filteredEvents.filter((e) => e.priority === 'high').length;
    const uniqueCustomers = new Set(filteredEvents.map((e) => e.customerId)).size;

    return {
      total: filteredEvents.length,
      positive,
      negative,
      highPriority,
      uniqueCustomers,
    };
  }, [filteredEvents]);

  const groupedByDate = useMemo(() => {
    const groups: Record<string, CustomerEvent[]> = {};
    filteredEvents.forEach((event) => {
      const dateKey = event.timestamp.toDateString();
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(event);
    });
    return groups;
  }, [filteredEvents]);

  return (
    <Card className="flex-1 flex flex-col min-h-0">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Customer Activity</CardTitle>
          <PeriodSelector
            selectedPeriod={selectedPeriod}
            onSelectPeriod={onSelectPeriod}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0 pt-0">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <StatCard title="Total Events" value={stats.total} icon={Calendar} />
          <StatCard
            title="Active Customers"
            value={stats.uniqueCustomers}
            icon={CheckCircle}
          />
          <StatCard
            title="Positive"
            value={stats.positive}
            icon={TrendingUp}
            trend="up"
          />
          <StatCard
            title="Needs Attention"
            value={stats.negative + stats.highPriority}
            icon={AlertCircle}
            trend={stats.negative + stats.highPriority > 0 ? 'down' : 'neutral'}
          />
        </div>

        {/* Timeline */}
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full pr-4">
            {filteredEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                <Calendar className="h-12 w-12 mb-2 opacity-50" />
                <p>No events in this period</p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedByDate).map(([dateKey, dayEvents]) => (
                  <div key={dateKey}>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3 sticky top-0 bg-card py-1">
                      {new Date(dateKey).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </h4>
                    <div className="space-y-3">
                      {dayEvents.map((event) => {
                        const Icon = eventIcons[event.type];
                        const sentimentInfo = event.sentiment
                          ? sentimentConfig[event.sentiment]
                          : null;

                        return (
                          <div
                            key={event.id}
                            className="flex gap-3 p-3 rounded-lg border border-border bg-card hover:bg-secondary/30 transition-colors"
                          >
                            <div
                              className={`p-2 rounded-lg shrink-0 ${
                                sentimentInfo?.bg || 'bg-secondary'
                              }`}
                            >
                              <Icon
                                className={`h-4 w-4 ${
                                  sentimentInfo?.color || 'text-muted-foreground'
                                }`}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <p className="font-medium text-sm">
                                    {event.title}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {event.customerName}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  {event.priority && (
                                    <Badge
                                      variant={priorityConfig[event.priority].variant}
                                      className="text-xs"
                                    >
                                      {priorityConfig[event.priority].label}
                                    </Badge>
                                  )}
                                  <span className="text-xs text-muted-foreground">
                                    {formatDate(event.timestamp)}
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {event.description}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {event.source}
                                </Badge>
                                <Badge variant="secondary" className="text-xs capitalize">
                                  {event.type}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
