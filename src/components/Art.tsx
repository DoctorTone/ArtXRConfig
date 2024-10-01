import { Suspense, useState, useEffect } from "react";
import { Loading } from "./Loading";
import Stage from "./Stage";
import Lights from "./Lights";
import useStore from "../state/store";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTF } from "three-stdlib";
import { useThree } from "@react-three/fiber";
import {
  SpotLight,
  SpotLightHelper,
  PointLight,
  PointLightHelper,
} from "three";

const Art = () => {
  const [gltf, setGltf] = useState<GLTF>();
  const file = useStore((state) => state.file);
  const { scene } = useThree();
  const spotlightHelper = useStore((state) => state.spotlightHelper);
  const pointlightHelper = useStore((state) => state.pointlightHelper);

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
              const helper = new SpotLightHelper(child, 0x0000ff);
              helper.visible = false;
              model.scene.add(helper);
            }
            if (child instanceof PointLight) {
              const helper = new PointLightHelper(child);
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

    if (pointlightHelper && gltf) {
      scene.traverse((child) => {
        if (child instanceof PointLightHelper) {
          child.visible = true;
        }
      });
    }

    if (!pointlightHelper && gltf) {
      scene.traverse((child) => {
        if (child instanceof PointLightHelper) {
          child.visible = false;
        }
      });
    }
  }, [file, spotlightHelper, pointlightHelper]);

  return (
    <Suspense fallback={<Loading />}>
      <Lights />
      {gltf && <primitive object={gltf.scene} />}
      <Stage />
    </Suspense>
  );
};

export default Art;
