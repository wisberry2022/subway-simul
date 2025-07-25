import { MapCanvas } from "./components/MapCanvas";
import { SidebarTools } from "./components/SidebarTools";

function App() {
  return (
    <div className="page dark">
      <div>
        <SidebarTools />
      </div>
      <div className="flex-1">
        <MapCanvas />
      </div>
    </div>
  );
}

export default App;
