import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Play, 
  Pause, 
  Clock, 
  DollarSign, 
  Heart, 
  Users,
  Moon,
  Sun
} from "lucide-react";

interface GameStats {
  revenue: number;
  satisfaction: number;
  passengerCount: number;
  gameTime: string;
}

interface TopHeaderProps {
  stats: GameStats;
  isPaused: boolean;
  gameSpeed: number;
  onPauseToggle: () => void;
  onSpeedChange: (speed: number) => void;
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
}

export function TopHeader({ 
  stats, 
  isPaused, 
  gameSpeed, 
  onPauseToggle, 
  onSpeedChange,
  isDarkMode = true,
  onThemeToggle
}: TopHeaderProps) {
  const speedOptions = [1, 2, 4];

  return (
    <div className="w-full bg-card border-b border-border px-4 py-2">
      <div className="flex items-center justify-between">
        {/* 왼쪽: 게임 시간 및 컨트롤 */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-md">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm font-medium">{stats.gameTime}</span>
          </div>

          <Button
            variant={isPaused ? "default" : "secondary"}
            size="sm"
            onClick={onPauseToggle}
            className="h-7"
          >
            {isPaused ? (
              <Play className="h-3 w-3" />
            ) : (
              <Pause className="h-3 w-3" />
            )}
          </Button>

          <div className="flex items-center gap-1">
            {speedOptions.map((speed) => (
              <Button
                key={speed}
                variant={gameSpeed === speed ? "default" : "outline"}
                size="sm"
                onClick={() => onSpeedChange(speed)}
                className="h-7 px-2 text-xs"
              >
                {speed}x
              </Button>
            ))}
          </div>
        </div>

        {/* 오른쪽: 통계 및 테마 토글 */}
        <div className="flex items-center gap-4">
          {/* 수익 */}
          <div className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" style={{ color: '#34c759' }} />
            <span className="text-xs text-muted-foreground">수익</span>
            <span className="text-sm font-medium">₩{(stats.revenue / 1000000).toFixed(1)}M</span>
          </div>

          {/* 만족도 */}
          <div className="flex items-center gap-1">
            <Heart className="h-3 w-3" style={{ color: '#ff3b30' }} />
            <span className="text-xs text-muted-foreground">만족도</span>
            <span className="text-sm font-medium">{stats.satisfaction}%</span>
          </div>

          {/* 승객 수 */}
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" style={{ color: '#007aff' }} />
            <span className="text-xs text-muted-foreground">승객</span>
            <span className="text-sm font-medium">{(stats.passengerCount / 1000).toFixed(1)}K</span>
          </div>

          {/* 테마 토글 */}
          {onThemeToggle && (
            <Button variant="ghost" size="sm" onClick={onThemeToggle} className="h-7 w-7 p-0">
              {isDarkMode ? (
                <Sun className="h-3 w-3" />
              ) : (
                <Moon className="h-3 w-3" />
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}