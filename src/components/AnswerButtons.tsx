import { ShieldCheck, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnswerButtonsProps {
  onAnswer: (answer: 'scam' | 'legit') => void;
  disabled?: boolean;
}

export const AnswerButtons = ({ onAnswer, disabled }: AnswerButtonsProps) => {
  return (
    <div className="flex gap-4 mt-6">
      <Button
        variant="outline"
        size="lg"
        onClick={() => onAnswer('legit')}
        disabled={disabled}
        className="flex-1 h-16 text-lg font-semibold border-2 border-success/50 text-success 
                   hover:bg-success hover:text-success-foreground hover:border-success
                   transition-all duration-200 hover:glow-success group"
      >
        <ShieldCheck className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
        Legitimate
      </Button>
      <Button
        variant="outline"
        size="lg"
        onClick={() => onAnswer('scam')}
        disabled={disabled}
        className="flex-1 h-16 text-lg font-semibold border-2 border-destructive/50 text-destructive 
                   hover:bg-destructive hover:text-destructive-foreground hover:border-destructive
                   transition-all duration-200 hover:glow-danger group"
      >
        <ShieldAlert className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
        SCAM
      </Button>
    </div>
  );
};
