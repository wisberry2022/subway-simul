import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Plus, FileText, Users, BarChart3 } from "lucide-react";

export function SampleContent() {
  return (
    <div className="container mx-auto p-6">
      {/* 헤더 섹션 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-2">대시보드</h1>
          <p className="text-muted-foreground">프로젝트와 작업을 관리하세요</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          새 프로젝트
        </Button>
      </div>

      {/* 통계 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 프로젝트</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">지난달 대비 +12%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">활성 사용자</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">지난주 대비 +8%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">완료된 작업</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">이번 주 +15%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">수익</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩1,200,000</div>
            <p className="text-xs text-muted-foreground">지난달 대비 +23%</p>
          </CardContent>
        </Card>
      </div>

      {/* 최근 프로젝트 */}
      <Card>
        <CardHeader>
          <CardTitle>최근 프로젝트</CardTitle>
          <CardDescription>최근에 작업한 프로젝트들을 확인하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "웹사이트 리디자인", status: "진행중", updated: "2시간 전" },
              { name: "모바일 앱 개발", status: "검토중", updated: "1일 전" },
              { name: "브랜딩 프로젝트", status: "완료", updated: "3일 전" },
              { name: "API 통합", status: "진행중", updated: "1주 전" },
            ].map((project, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">{project.name}</p>
                  <p className="text-sm text-muted-foreground">{project.updated}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {project.status}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}