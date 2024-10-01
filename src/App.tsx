import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Art from "./components/Art";
import { SCENE } from "./state/Config";
import DragDrop from "./components/DragDrop";
import Controls from "./UI/Controls";

function App() {
  return (
    <>
      <Canvas camera={{ position: SCENE.cameraPosition }}>
        <Art />
        <OrbitControls
          makeDefault
          enablePan={false}
          enableRotate={true}
          enableDamping={true}
          target={SCENE.targetPos}
          // minDistance={SCENE.MIN_DISTANCE}
          // maxDistance={SCENE.MAX_DISTANCE}
        />
      </Canvas>
      <DragDrop />
      <Controls />
    </>
  );
}

export default App;
