import { Mail, AlertTriangle } from 'lucide-react';
import { EmailChallenge, getDifficultyColor } from '@/data/challenges';
import { Badge } from '@/components/ui/badge';

interface EmailCardProps {
  challenge: EmailChallenge;
  revealed?: boolean;
  isCorrect?: boolean;
}

export const EmailCard = ({ challenge, revealed, isCorrect }: EmailCardProps) => {
  return (
    <div 
      className={`game-card p-6 transition-all duration-300 ${
        revealed 
          ? isCorrect 
            ? 'border-success glow-success' 
            : 'border-destructive glow-danger animate-shake'
          : 'hover:border-primary/50'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary">
            <Mail className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">From:</p>
            <p className="text-muted-foreground text-sm font-mono">{challenge.from}</p>
          </div>
        </div>
        <Badge variant="outline" className={`${getDifficultyColor(challenge.difficulty)} border-current`}>
          {challenge.difficulty}
        </Badge>
      </div>

      {/* Subject */}
      <div className="mb-4">
        <p className="font-medium text-muted-foreground text-xs mb-1">Subject:</p>
        <h3 className="text-lg font-semibold text-foreground">{challenge.subject}</h3>
      </div>

      {/* Preview */}
      <div className="p-4 rounded-xl bg-secondary/50 mb-4">
        <p className="text-foreground/80 text-sm leading-relaxed">
          {challenge.preview}
        </p>
      </div>

      {/* Red flags (revealed) */}
      {revealed && challenge.isScam && challenge.redFlags && (
        <div className="flex flex-wrap gap-2 animate-success">
          <AlertTriangle className="w-4 h-4 text-destructive" />
          {challenge.redFlags.map((flag, i) => (
            <Badge key={i} variant="destructive" className="text-xs">
              {flag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
