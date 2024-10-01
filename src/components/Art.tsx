import { Suspense, useState, useEffect } from "react";
import { Loading } from "./Loading";
import Stage from "./Stage";
import Lights from "./Lights";
import useStore from "../state/store";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTF } from "three-stdlib";
import { useThree } from "@react-three/fiber";
import { SpotLight, SpotLightHelper } from "three";

const Art = () => {
  const [gltf, setGltf] = useState<GLTF>();
  const file = useStore((state) => state.file);
  const { scene } = useThree();
  const spotlightHelper = useStore((state) => state.spotlightHelper);

  useEffect(() => {
    if (file && !gltf) {
      let url = URL.createObjectURL(file);
      const gltfLoader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
      gltfLoader.setDRACOLoader(dracoLoader);

      const loadModel = async () => {
        try {
          const model = await gltfLoader.loadAsync(url);
          //@ts-ignore
          setGltf(model);
          model.scene.traverse((child) => {
            if (child instanceof SpotLight) {
              const helper = new SpotLightHelper(child);
              helper.visible = false;
              model.scene.add(helper);
            }
          });
        } catch (error) {
          console.log("Error = ", error);
        }
      };

      loadModel();
    }

    if (spotlightHelper && gltf) {
      scene.traverse((child) => {
        if (child instanceof SpotLightHelper) {
          child.visible = true;
        }
      });
    }

    if (!spotlightHelper && gltf) {
      scene.traverse((child) => {
        if (child instanceof SpotLightHelper) {
          child.visible = false;
        }
      });
    }
  }, [file, spotlightHelper]);

  return (
    <Suspense fallback={<Loading />}>
      <Lights />
      {gltf && <primitive object={gltf.scene} />}
      <Stage />
    </Suspense>
  );
};

export default Art;
