import React from "react";
import { useFirebaseDoc } from "../../hooks/useFirebaseDoc";
import { Pet } from "./Pet";

export function PetContainer({ petId }) {
  const petData = useFirebaseDoc(`pets/${petId}`);

  if (!petData) {
    return <div>Loading pet...</div>;
  }

  return <Pet {...petData} />;
}
