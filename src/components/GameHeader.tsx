import { Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameHeaderProps {
  onReset: () => void;
}

export const GameHeader = ({ onReset }: GameHeaderProps) => {
  return (
    <header className="flex items-center justify-between mb-8 animate-slide-up">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 glow-primary">
          <Shield className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-foreground tracking-tight">
            ScamSense
          </h1>
          <p className="text-sm text-muted-foreground">
            Level up your skepticism
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onReset}
        className="text-muted-foreground hover:text-foreground"
      >
        <RotateCcw className="w-5 h-5" />
      </Button>
    </header>
  );
};
