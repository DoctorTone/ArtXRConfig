import { Suspense, useState, useEffect } from "react";
import { Loading } from "./Loading";
import Stage from "./Stage";
import Lights from "./Lights";
import useStore from "../state/store";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const Art = () => {
  const [gltf, setGltf] = useState(null);
  const file = useStore((state) => state.file);

  useEffect(() => {
    if (file) {
      let url = URL.createObjectURL(file);
      const gltfLoader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
      gltfLoader.setDRACOLoader(dracoLoader);

      const loadModel = async () => {
        try {
          const model = await gltfLoader.loadAsync(url);
          setGltf(model);
          console.log("Model = ", gltf);
        } catch (error) {
          console.log("Error = ", error);
        }
      };

      loadModel();
    }
  }, [file]);

  return (
    <Suspense fallback={<Loading />}>
      <Lights />
      {gltf && <primitive object={gltf.scene} />}
      <Stage id={"test"} />
    </Suspense>
  );
};

export default Art;
