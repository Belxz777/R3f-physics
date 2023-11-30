import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import {Physics} from '@react-three/rapier'
import { Suspense,useMemo } from "react";
import { KeyboardControls } from "@react-three/drei";
export const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  reload: "reload",
};
function App() {
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.reload,keys: ["Space"] },
    ],
    []
  );
  return (
    <KeyboardControls map={map}>
    <Canvas shadows camera={{ position: [-40, 30, 50], fov: 50 }}>
      <Suspense>
<Physics  debug>
      <color attach="background" args={["#e6e6fa"]} />
      <Experience />
      </Physics>
      </Suspense>
    </Canvas>
    </KeyboardControls>
  );
}

export default App;
