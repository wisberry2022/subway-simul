import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Plus, 
  Train, 
  Route, 
  MapPin, 
  Move, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut,
  Edit3,
  Palette,
  List,
  Settings,
  Trash2
} from "lucide-react";
import { useState } from "react";

interface SubwayLine {
  id: string;
  name: string;
  color: string;
  stations: any[];
}

interface BottomHeaderProps {
  lines: SubwayLine[];
  selectedLine?: SubwayLine | null;
  onLineSelect: (line: SubwayLine) => void;
  onLineCreate: () => void;
  onLineDelete: (lineId: string) => void;
  onLineUpdate: (lineId: string, updates: Partial<SubwayLine>) => void;
}

export function BottomHeader({ 
  lines, 
  selectedLine, 
  onLineSelect, 
  onLineCreate, 
  onLineDelete,
  onLineUpdate 
}: BottomHeaderProps) {
  const [mapTool, setMapTool] = useState<'select' | 'move' | 'station' | 'line'>('select');

  return (
    <div className="w-full bg-card border-b border-border px-4 py-2">
      <div className="flex items-center justify-between gap-6">
        
        {/* 왼쪽: 노선 및 열차 관리 */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">노선 관리</h3>
            <Button size="sm" onClick={onLineCreate} className="h-7">
              <Plus className="h-3 w-3 mr-1" />
              새 노선
            </Button>
          </div>
          
          <Separator orientation="vertical" className="h-6" />
          
          <div className="flex items-center gap-2">
            {lines.map((line) => (
              <Button
                key={line.id}
                variant={selectedLine?.id === line.id ? "default" : "outline"}
                size="sm"
                onClick={() => onLineSelect(line)}
                className="h-7 px-2"
              >
                <div 
                  className="w-3 h-3 rounded-full mr-1"
                  style={{ backgroundColor: line.color }}
                />
                <span className="text-xs">{line.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* 중앙: 맵 수정 도구 */}
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">맵 도구</h3>
          <div className="flex items-center gap-1">
            <Button
              variant={mapTool === 'select' ? "default" : "outline"}
              size="sm"
              onClick={() => setMapTool('select')}
              className="h-7 px-2"
            >
              <Edit3 className="h-3 w-3" />
            </Button>
            <Button
              variant={mapTool === 'move' ? "default" : "outline"}
              size="sm"
              onClick={() => setMapTool('move')}
              className="h-7 px-2"
            >
              <Move className="h-3 w-3" />
            </Button>
            <Button
              variant={mapTool === 'station' ? "default" : "outline"}
              size="sm"
              onClick={() => setMapTool('station')}
              className="h-7 px-2"
            >
              <MapPin className="h-3 w-3" />
            </Button>
            <Button
              variant={mapTool === 'line' ? "default" : "outline"}
              size="sm"
              onClick={() => setMapTool('line')}
              className="h-7 px-2"
            >
              <Route className="h-3 w-3" />
            </Button>
          </div>
          
          <Separator orientation="vertical" className="h-6" />
          
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-7 px-2">
              <ZoomIn className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="sm" className="h-7 px-2">
              <ZoomOut className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="sm" className="h-7 px-2">
              <RotateCcw className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* 오른쪽: 속성 패널 */}
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-medium">속성</h3>
          
          {selectedLine ? (
            <div className="flex items-center gap-2">
              <Input
                value={selectedLine.name}
                onChange={(e) => onLineUpdate(selectedLine.id, { name: e.target.value })}
                className="h-7 w-20 text-xs"
                placeholder="노선명"
              />
              
              <div className="flex items-center gap-1">
                <Palette className="h-3 w-3 text-muted-foreground" />
                <input
                  type="color"
                  value={selectedLine.color}
                  onChange={(e) => onLineUpdate(selectedLine.id, { color: e.target.value })}
                  className="w-7 h-7 rounded border border-border cursor-pointer"
                />
              </div>

              <Badge variant="secondary" className="text-xs">
                {selectedLine.stations.length}개 역
              </Badge>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLineDelete(selectedLine.id)}
                className="h-7 w-7 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <span className="text-xs text-muted-foreground">노선을 선택하세요</span>
          )}
        </div>
      </div>
    </div>
  );
}