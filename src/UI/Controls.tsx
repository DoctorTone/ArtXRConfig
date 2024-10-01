import { useControls } from "leva";
import useStore from "../state/store";

const Controls = () => {
  const setIntensity = useStore((state) => state.setIntensity);
  const setSpotlightHelper = useStore((state) => state.setSpotlightHelper);
  const setPointlightHelper = useStore((state) => state.setPointlightHelper);

  useControls({
    ambient: {
      value: 0.5,
      min: 0,
      max: 3,
      step: 0.01,
      onChange: (v) => {
        setIntensity(v);
      },
    },
    spotlightHelper: {
      value: false,
      onChange: (v) => {
        setSpotlightHelper(v);
      },
    },
    pointlightHelper: {
      value: false,
      onChange: (v) => {
        setPointlightHelper(v);
      },
    },
  });

  return null;
};

export default Controls;
