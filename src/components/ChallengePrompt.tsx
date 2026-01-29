import { HelpCircle } from 'lucide-react';

export const ChallengePrompt = () => {
  return (
    <div className="flex items-center gap-3 mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
        <HelpCircle className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Is this email legitimate or a scam?
        </h2>
        <p className="text-sm text-muted-foreground">
          Look for red flags and trust your instincts
        </p>
      </div>
    </div>
  );
};
