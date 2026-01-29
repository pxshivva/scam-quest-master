import { CheckCircle2, XCircle, ArrowRight, Lightbulb } from 'lucide-react';
import { EmailChallenge } from '@/data/challenges';
import { Button } from '@/components/ui/button';

interface ExplanationCardProps {
  challenge: EmailChallenge;
  isCorrect: boolean;
  onNext: () => void;
}

export const ExplanationCard = ({ challenge, isCorrect, onNext }: ExplanationCardProps) => {
  return (
    <div className={`game-card p-6 mt-6 animate-success ${
      isCorrect ? 'border-success' : 'border-destructive'
    }`}>
      {/* Result header */}
      <div className="flex items-center gap-3 mb-4">
        {isCorrect ? (
          <>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-success/20 animate-success">
              <CheckCircle2 className="w-7 h-7 text-success" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-success">Correct!</h3>
              <p className="text-sm text-muted-foreground">
                This was {challenge.isScam ? 'a scam' : 'legitimate'}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/20">
              <XCircle className="w-7 h-7 text-destructive" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-destructive">Not quite!</h3>
              <p className="text-sm text-muted-foreground">
                This was actually {challenge.isScam ? 'a scam' : 'legitimate'}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Explanation */}
      <div className="flex gap-3 p-4 rounded-xl bg-secondary/50 mb-6">
        <Lightbulb className="w-5 h-5 text-streak flex-shrink-0 mt-0.5" />
        <p className="text-sm text-foreground/80 leading-relaxed">
          {challenge.explanation}
        </p>
      </div>

      {/* Next button */}
      <Button
        size="lg"
        onClick={onNext}
        className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 
                   text-primary-foreground glow-primary group"
      >
        Continue
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};
