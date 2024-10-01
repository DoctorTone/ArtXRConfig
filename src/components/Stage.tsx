import React, { useEffect } from "react";
import { Concrete } from "../stages/Concrete";
import { useThree } from "@react-three/fiber";

interface StageProps {
  id: string;
}

const Stage: React.FC<StageProps> = ({ id }) => {
  const { scene } = useThree();

  return <Concrete />;
};

export default Stage;
