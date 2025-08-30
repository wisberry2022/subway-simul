import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  XCircle, 
  X,
  Bell
} from "lucide-react";

export interface GameNotification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

interface NotificationPanelProps {
  notifications: GameNotification[];
  onNotificationRead: (id: string) => void;
  onNotificationRemove: (id: string) => void;
  onClearAll: () => void;
}

export function NotificationPanel({ 
  notifications, 
  onNotificationRead, 
  onNotificationRemove,
  onClearAll 
}: NotificationPanelProps) {
  const getIcon = (type: GameNotification['type']) => {
    switch (type) {
      case 'info':
        return <Info className="h-4 w-4" style={{ color: '#007aff' }} />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" style={{ color: '#ff9500' }} />;
      case 'success':
        return <CheckCircle className="h-4 w-4" style={{ color: '#34c759' }} />;
      case 'error':
        return <XCircle className="h-4 w-4" style={{ color: '#ff3b30' }} />;
    }
  };

  const getBadgeVariant = (type: GameNotification['type']) => {
    switch (type) {
      case 'info':
        return 'default';
      case 'warning':
        return 'secondary';
      case 'success':
        return 'default';
      case 'error':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Card className="h-24 border-t-2">
      <CardHeader className="py-1 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm">알림</CardTitle>
            <Bell className="h-3 w-3 text-muted-foreground" />
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs h-4">
                {unreadCount}
              </Badge>
            )}
          </div>
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={onClearAll} className="h-6 text-xs">
              모두 지우기
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-16 px-4">
          {notifications.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p className="text-xs">알림이 없습니다</p>
            </div>
          ) : (
            <div className="space-y-1 pb-2">
              {notifications.slice(0, 2).map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-center gap-2 p-2 rounded border transition-colors ${
                    notification.isRead 
                      ? 'bg-muted/30 border-border' 
                      : 'bg-background border-primary/20'
                  }`}
                  onClick={() => onNotificationRead(notification.id)}
                >
                  <div className="flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-medium truncate">
                        {notification.title}
                      </p>
                      <Badge 
                        variant={getBadgeVariant(notification.type)} 
                        className="text-xs h-4"
                      >
                        {notification.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {notification.timestamp}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNotificationRemove(notification.id);
                    }}
                  >
                    <X className="h-2 w-2" />
                  </Button>
                </div>
              ))}
              {notifications.length > 2 && (
                <div className="text-center py-1">
                  <span className="text-xs text-muted-foreground">
                    +{notifications.length - 2}개 더
                  </span>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}