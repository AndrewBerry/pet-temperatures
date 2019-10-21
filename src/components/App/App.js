import React from "react";
import { PetContainer } from "../Pet/PetContainer";

import "./App.css";

export function App() {
  return (
    <div className="App">
      <PetContainer petId="cynthia" />
      <PetContainer petId="bassi" />
    </div>
  );
}
