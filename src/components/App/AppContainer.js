import React from "react";
import { useFirebaseInit } from "../../hooks/useFirebase";

import { App } from "./App";
import { AppLoading } from "./AppLoading";

export function AppContainer() {
  const { isInit } = useFirebaseInit();

  if (!isInit) {
    return <AppLoading />;
  }

  return <App />;
};
