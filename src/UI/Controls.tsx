import { useControls } from "leva";
import useStore from "../state/store";

const Controls = () => {
  const setIntensity = useStore((state) => state.setIntensity);
  const setSpotlightHelper = useStore((state) => state.setSpotlightHelper);

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
        console.log("Spot changed", v);
        setSpotlightHelper(v);
      },
    },
  });

  return null;
};

export default Controls;
