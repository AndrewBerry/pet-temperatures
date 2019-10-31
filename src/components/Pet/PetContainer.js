import React, { useState } from "react";
import { useFirebaseDoc } from "../../hooks/useFirebaseDoc";
import { Pet } from "./Pet";
import { PetLoading } from "./PetLoading";

export function PetContainer({ petId }) {
  const [ dataPointOverrideIndex, setDataPointOverrideIndex ] = useState(-1);
  const petData = useFirebaseDoc(`pets/${petId}`);

  if (!petData) {
    return <PetLoading />;
  }

  return <Pet {...petData} dataPointOverrideIndex={dataPointOverrideIndex} setDataPointOverrideIndex={setDataPointOverrideIndex} />;
}
