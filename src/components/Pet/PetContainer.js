import React from "react";
import { useFirebaseDoc } from "../../hooks/useFirebaseDoc";
import { Pet } from "./Pet";
import { PetLoading } from "./PetLoading";

export function PetContainer({ petId }) {
  const petData = useFirebaseDoc(`pets/${petId}`);

  if (!petData) {
    return <PetLoading />;
  }

  return <Pet {...petData} />;
}
