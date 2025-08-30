import { Toolbar } from "./Toolbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Toolbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}