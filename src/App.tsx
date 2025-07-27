import { MapCanvas } from "./components/MapCanvas";
import { SidebarTools } from "./components/SidebarTools";
import { TopStatusBar } from "./components/TopStatusBar";
import { GameProvider } from "./provider/GameProvider";

function App() {
  return (
    <div className="page dark">
      <TopStatusBar />
      <div>
        <SidebarTools />
      </div>
      <div className="flex-1">
        <MapCanvas />
      </div>
      {/* 시간 흐름 로직 */}
      <GameProvider />
    </div>
  );
}

export default App;
