import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Play, 
  Pause, 
  FastForward, 
  Clock, 
  DollarSign, 
  Heart, 
  Users,
  Moon,
  Sun
} from "lucide-react";
import { useState } from "react";

interface GameStats {
  revenue: number;
  satisfaction: number;
  passengerCount: number;
  gameTime: string;
}

interface GameHUDProps {
  stats: GameStats;
  isPaused: boolean;
  gameSpeed: number;
  onPauseToggle: () => void;
  onSpeedChange: (speed: number) => void;
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
}

export function GameHUD({ 
  stats, 
  isPaused, 
  gameSpeed, 
  onPauseToggle, 
  onSpeedChange,
  isDarkMode = true,
  onThemeToggle
}: GameHUDProps) {
  const speedOptions = [1, 2, 4];

  return (
    <div className="w-full bg-card border-b border-border p-4">
      <div className="flex items-center justify-between">
        {/* 게임 시간 및 컨트롤 */}
        <div className="flex items-center gap-4">
          <Card className="px-4 py-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{stats.gameTime}</span>
            </div>
          </Card>

          <div className="flex items-center gap-2">
            <Button
              variant={isPaused ? "default" : "secondary"}
              size="sm"
              onClick={onPauseToggle}
            >
              {isPaused ? (
                <>
                  <Play className="h-4 w-4 mr-1" />
                  시작
                </>
              ) : (
                <>
                  <Pause className="h-4 w-4 mr-1" />
                  일시정지
                </>
              )}
            </Button>

            <div className="flex items-center gap-1">
              {speedOptions.map((speed) => (
                <Button
                  key={speed}
                  variant={gameSpeed === speed ? "default" : "outline"}
                  size="sm"
                  onClick={() => onSpeedChange(speed)}
                >
                  {speed}x
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* 게임 통계 */}
        <div className="flex items-center gap-6">
          {/* 테마 토글 버튼 */}
          {onThemeToggle && (
            <Button variant="ghost" size="icon" onClick={onThemeToggle}>
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          )}

          <Card className="px-4 py-2">
            <CardContent className="p-0">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" style={{ color: '#34c759' }} />
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">수익</div>
                  <div className="font-medium">₩{stats.revenue.toLocaleString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="px-4 py-2">
            <CardContent className="p-0">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" style={{ color: '#ff3b30' }} />
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">만족도</div>
                  <div className="font-medium">{stats.satisfaction}%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="px-4 py-2">
            <CardContent className="p-0">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" style={{ color: '#007aff' }} />
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">승객 수</div>
                  <div className="font-medium">{stats.passengerCount.toLocaleString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}