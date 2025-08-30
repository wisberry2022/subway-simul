import { SubwaySimulator } from "./components/SubwaySimulator";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    // 다크 모드 활성화
    document.documentElement.classList.add("dark");
  }, []);

  return <SubwaySimulator />;
}
