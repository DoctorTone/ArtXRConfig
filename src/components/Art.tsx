import { Suspense } from "react";
import { Loading } from "./Loading";
import Stage from "./Stage";
import Lights from "./Lights";

const Art = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Lights />
      <Stage id={"test"} />
    </Suspense>
  );
};

export default Art;
