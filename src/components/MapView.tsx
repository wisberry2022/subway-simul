import { useState, useRef, useEffect } from "react";

interface Station {
  id: string;
  name: string;
  x: number;
  y: number;
  lineColor: string;
  passengerCount: number;
}

interface SubwayLine {
  id: string;
  name: string;
  stations: Station[];
  color: string;
}

interface MapViewProps {
  lines: SubwayLine[];
  onStationClick?: (station: Station) => void;
}

export function MapView({ lines, onStationClick }: MapViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 캔버스 크기 설정
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // 배경 그리기 (다크 테마)
    ctx.fillStyle = '#121212';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 격자 그리기 (다크 테마)
    ctx.strokeStyle = '#2c2c2e';
    ctx.lineWidth = 1;
    for (let i = 0; i <= canvas.width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i <= canvas.height; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // 노선 그리기
    lines.forEach((line) => {
      ctx.strokeStyle = line.color;
      ctx.lineWidth = 4;
      
      if (line.stations.length > 1) {
        ctx.beginPath();
        ctx.moveTo(line.stations[0].x, line.stations[0].y);
        
        for (let i = 1; i < line.stations.length; i++) {
          ctx.lineTo(line.stations[i].x, line.stations[i].y);
        }
        ctx.stroke();
      }
    });

    // 역 그리기
    lines.forEach((line) => {
      line.stations.forEach((station) => {
        // 역 원 그리기
        ctx.fillStyle = station.lineColor;
        ctx.beginPath();
        ctx.arc(station.x, station.y, 8, 0, 2 * Math.PI);
        ctx.fill();

        // 역 테두리
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // 역 이름 (다크 테마)
        ctx.fillStyle = '#e0e0e0';
        ctx.font = '12px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(station.name, station.x, station.y - 15);

        // 승객 수 표시 (다크 테마)
        if (station.passengerCount > 0) {
          ctx.fillStyle = '#ff9500';
          ctx.font = '10px system-ui';
          ctx.fillText(`${station.passengerCount}`, station.x, station.y + 20);
        }
      });
    });

    // 선택된 역 하이라이트 (다크 테마)
    if (selectedStation) {
      ctx.strokeStyle = '#007aff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(selectedStation.x, selectedStation.y, 12, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }, [lines, selectedStation]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // 클릭된 위치에서 가장 가까운 역 찾기
    let closestStation: Station | null = null;
    let minDistance = Infinity;

    lines.forEach((line) => {
      line.stations.forEach((station) => {
        const distance = Math.sqrt(
          Math.pow(x - station.x, 2) + Math.pow(y - station.y, 2)
        );
        
        if (distance < 20 && distance < minDistance) {
          minDistance = distance;
          closestStation = station;
        }
      });
    });

    if (closestStation) {
      setSelectedStation(closestStation);
      onStationClick?.(closestStation);
    }
  };

  return (
    <div className="flex-1 bg-muted/50 relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
        onClick={handleCanvasClick}
      />
      
      {/* 범례 */}
      <div className="absolute top-4 left-4 bg-card border border-border rounded-lg p-4 shadow-sm">
        <h3 className="font-medium mb-2">노선도</h3>
        <div className="space-y-2">
          {lines.map((line) => (
            <div key={line.id} className="flex items-center gap-2">
              <div 
                className="w-4 h-1 rounded"
                style={{ backgroundColor: line.color }}
              />
              <span className="text-sm">{line.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 선택된 역 정보 */}
      {selectedStation && (
        <div className="absolute top-4 right-4 bg-card border border-border rounded-lg p-4 shadow-sm">
          <h3 className="font-medium">{selectedStation.name}역</h3>
          <p className="text-sm text-muted-foreground">
            승객 수: {selectedStation.passengerCount}명
          </p>
        </div>
      )}
    </div>
  );
}