import { SCENE } from "../state/Config";

const Lights = () => {
  return (
    <>
      <ambientLight intensity={SCENE.ambientIntensity} />
    </>
  );
};

export default Lights;
