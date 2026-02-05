import { PeriodOption, PERIOD_OPTIONS } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Calendar } from 'lucide-react';

interface PeriodSelectorProps {
  selectedPeriod: PeriodOption;
  onSelectPeriod: (period: PeriodOption) => void;
}

export function PeriodSelector({
  selectedPeriod,
  onSelectPeriod,
}: PeriodSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Calendar className="h-4 w-4 text-muted-foreground" />
      <Select
        value={selectedPeriod.value}
        onValueChange={(value) => {
          const period = PERIOD_OPTIONS.find((p) => p.value === value);
          if (period) onSelectPeriod(period);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {PERIOD_OPTIONS.map((period) => (
            <SelectItem key={period.value} value={period.value}>
              {period.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
