import { Button } from "./ui/button";
import { Search, Bell, Settings, User } from "lucide-react";
import { Input } from "./ui/input";

export function Toolbar() {
  return (
    <div className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        {/* 로고 */}
        <div className="flex items-center gap-2 mr-6">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-medium">A</span>
          </div>
          <span className="font-medium">App</span>
        </div>

        {/* 네비게이션 메뉴 */}
        <nav className="flex items-center gap-6 mr-auto">
          <a href="#" className="hover:text-primary transition-colors">홈</a>
          <a href="#" className="hover:text-primary transition-colors">프로젝트</a>
          <a href="#" className="hover:text-primary transition-colors">팀</a>
          <a href="#" className="hover:text-primary transition-colors">설정</a>
        </nav>

        {/* 검색 */}
        <div className="flex items-center gap-2 mr-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="검색..."
              className="pl-8 w-64"
            />
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}