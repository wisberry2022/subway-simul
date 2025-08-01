import { MapCanvas } from "./components/MapCanvas";
import { SidebarTools } from "./components/layout/SidebarTools";
import { TopStatusBar } from "./components/layout/TopStatusBar";
import { GameProvider } from "./provider/GameProvider";
import "./styles/index.css";

function App() {
  return (
    <div className="page dark">
      <TopStatusBar />
      <main>
        <SidebarTools />
        <div className="flex-1">
          <MapCanvas />
        </div>
      </main>
      {/* 시간 흐름 로직 */}
      <GameProvider />
    </div>
  );
}

export default App;
