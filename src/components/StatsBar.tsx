import { Flame, Zap, Trophy } from 'lucide-react';
import { GameStats } from '@/hooks/useGameState';
import { Progress } from '@/components/ui/progress';

interface StatsBarProps {
  stats: GameStats;
  xpGained?: number;
}

export const StatsBar = ({ stats, xpGained }: StatsBarProps) => {
  const xpPercentage = (stats.xp / stats.xpToNextLevel) * 100;

  return (
    <div className="game-card p-4 mb-6 animate-slide-up">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Level & XP */}
        <div className="flex items-center gap-4 flex-1 min-w-[200px]">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 border-2 border-primary glow-primary">
            <span className="text-lg font-black text-primary">{stats.level}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-muted-foreground">Level {stats.level}</span>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-xp" />
                <span className="text-sm font-bold text-xp">{stats.xp} / {stats.xpToNextLevel}</span>
              </div>
            </div>
            <div className="relative">
              <Progress value={xpPercentage} className="h-2 bg-secondary" />
              <div className="absolute inset-0 progress-shimmer rounded-full" />
            </div>
            {xpGained && xpGained > 0 && (
              <div className="absolute -top-2 right-0 animate-xp-float">
                <span className="text-sm font-bold text-xp">+{xpGained} XP</span>
              </div>
            )}
          </div>
        </div>

        {/* Streak */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
          stats.streak > 0 ? 'bg-streak/20 glow-streak' : 'bg-secondary'
        }`}>
          <Flame className={`w-5 h-5 ${stats.streak > 0 ? 'text-streak animate-fire' : 'text-muted-foreground'}`} />
          <span className={`text-lg font-bold ${stats.streak > 0 ? 'text-streak' : 'text-muted-foreground'}`}>
            {stats.streak}
          </span>
        </div>

        {/* Accuracy */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary">
          <Trophy className="w-5 h-5 text-primary" />
          <span className="text-lg font-bold text-foreground">{stats.accuracy}%</span>
        </div>
      </div>
    </div>
  );
};
