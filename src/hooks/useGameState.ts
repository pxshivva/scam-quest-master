import { useState, useCallback } from 'react';
import { EmailChallenge, getRandomChallenge } from '@/data/challenges';

export interface GameStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  longestStreak: number;
  totalCorrect: number;
  totalAnswered: number;
  accuracy: number;
}

const INITIAL_STATS: GameStats = {
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  streak: 0,
  longestStreak: 0,
  totalCorrect: 0,
  totalAnswered: 0,
  accuracy: 0,
};

const calculateXpToNextLevel = (level: number) => Math.floor(100 * Math.pow(1.5, level - 1));

export const useGameState = () => {
  const [stats, setStats] = useState<GameStats>(() => {
    const saved = localStorage.getItem('scamTrainer_stats');
    if (saved) {
      return JSON.parse(saved);
    }
    return INITIAL_STATS;
  });

  const [currentChallenge, setCurrentChallenge] = useState<EmailChallenge>(() => 
    getRandomChallenge()
  );
  const [answeredIds, setAnsweredIds] = useState<string[]>([]);
  const [lastAnswer, setLastAnswer] = useState<'correct' | 'wrong' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [xpGained, setXpGained] = useState(0);

  const saveStats = useCallback((newStats: GameStats) => {
    localStorage.setItem('scamTrainer_stats', JSON.stringify(newStats));
  }, []);

  const submitAnswer = useCallback((answer: 'scam' | 'legit') => {
    const isCorrect = (answer === 'scam') === currentChallenge.isScam;
    
    setStats(prev => {
      const streakBonus = Math.floor(prev.streak / 3);
      const baseXp = isCorrect ? currentChallenge.xpReward + streakBonus * 5 : 0;
      let newXp = prev.xp + baseXp;
      let newLevel = prev.level;
      let newXpToNext = prev.xpToNextLevel;

      // Level up check
      while (newXp >= newXpToNext) {
        newXp -= newXpToNext;
        newLevel += 1;
        newXpToNext = calculateXpToNextLevel(newLevel);
      }

      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const newTotalCorrect = isCorrect ? prev.totalCorrect + 1 : prev.totalCorrect;
      const newTotalAnswered = prev.totalAnswered + 1;

      const newStats: GameStats = {
        level: newLevel,
        xp: newXp,
        xpToNextLevel: newXpToNext,
        streak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        totalCorrect: newTotalCorrect,
        totalAnswered: newTotalAnswered,
        accuracy: Math.round((newTotalCorrect / newTotalAnswered) * 100),
      };

      saveStats(newStats);
      return newStats;
    });

    setLastAnswer(isCorrect ? 'correct' : 'wrong');
    setShowExplanation(true);
    if (isCorrect) {
      const streakBonus = Math.floor(stats.streak / 3);
      setXpGained(currentChallenge.xpReward + streakBonus * 5);
    }
  }, [currentChallenge, saveStats, stats.streak]);

  const nextChallenge = useCallback(() => {
    const newAnsweredIds = [...answeredIds, currentChallenge.id];
    setAnsweredIds(newAnsweredIds);
    setCurrentChallenge(getRandomChallenge(newAnsweredIds));
    setLastAnswer(null);
    setShowExplanation(false);
    setXpGained(0);
  }, [answeredIds, currentChallenge.id]);

  const resetGame = useCallback(() => {
    setStats(INITIAL_STATS);
    saveStats(INITIAL_STATS);
    setAnsweredIds([]);
    setCurrentChallenge(getRandomChallenge());
    setLastAnswer(null);
    setShowExplanation(false);
    setXpGained(0);
  }, [saveStats]);

  return {
    stats,
    currentChallenge,
    lastAnswer,
    showExplanation,
    xpGained,
    submitAnswer,
    nextChallenge,
    resetGame,
  };
};
