import { Profile } from '@/types';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { User, Briefcase, Building2, Podcast, Mic } from 'lucide-react';

interface ProfileSelectorProps {
  profiles: Profile[];
  selectedProfile: Profile | null;
  onSelectProfile: (profile: Profile) => void;
}

export function ProfileSelector({
  profiles,
  selectedProfile,
  onSelectProfile,
}: ProfileSelectorProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <User className="h-4 w-4" />
            <span>Select Your Profile</span>
          </div>
          
          <Select
            value={selectedProfile?.id}
            onValueChange={(value) => {
              const profile = profiles.find((p) => p.id === value);
              if (profile) onSelectProfile(profile);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose your role..." />
            </SelectTrigger>
            <SelectContent>
              {profiles.map((profile) => (
                <SelectItem key={profile.id} value={profile.id}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{profile.name}</span>
                    <span className="text-muted-foreground">-</span>
                    <span className="text-muted-foreground">{profile.role}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedProfile && (
            <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground text-base">
                  {selectedProfile.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">
                  {selectedProfile.name}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <Briefcase className="h-3.5 w-3.5" />
                  <span>{selectedProfile.role}</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-sm text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5" />
                  <span>{selectedProfile.department}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {selectedProfile.description}
                </p>
              </div>
            </div>
          )}

          {selectedProfile && (
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => {
                  // TODO: Implement podcast generation logic
                  console.log('Generate podcast for customer meeting preparation');
                }}
              >
                <Podcast className="h-4 w-4" />
                Generate Podcast for Meeting
              </Button>
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => {
                  // TODO: Implement speech-to-text meeting notes logic
                  console.log('Record meeting notes from speech');
                }}
              >
                <Mic className="h-4 w-4" />
                Record Meeting Notes
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
