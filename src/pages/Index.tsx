import { useGameState } from '@/hooks/useGameState';
import { GameHeader } from '@/components/GameHeader';
import { StatsBar } from '@/components/StatsBar';
import { ChallengePrompt } from '@/components/ChallengePrompt';
import { EmailCard } from '@/components/EmailCard';
import { AnswerButtons } from '@/components/AnswerButtons';
import { ExplanationCard } from '@/components/ExplanationCard';

const Index = () => {
  const {
    stats,
    currentChallenge,
    lastAnswer,
    showExplanation,
    xpGained,
    submitAnswer,
    nextChallenge,
    resetGame,
  } = useGameState();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <GameHeader onReset={resetGame} />
        
        <StatsBar stats={stats} xpGained={showExplanation ? xpGained : undefined} />
        
        <ChallengePrompt />
        
        <div style={{ animationDelay: '0.2s' }} className="animate-slide-up">
          <EmailCard 
            challenge={currentChallenge} 
            revealed={showExplanation}
            isCorrect={lastAnswer === 'correct'}
          />
          
          {!showExplanation && (
            <AnswerButtons onAnswer={submitAnswer} />
          )}
          
          {showExplanation && (
            <ExplanationCard
              challenge={currentChallenge}
              isCorrect={lastAnswer === 'correct'}
              onNext={nextChallenge}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
