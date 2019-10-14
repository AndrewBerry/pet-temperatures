import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import { NotFoundContainer } from "../../routes/NotFound/NotFoundContainer";

export function Router() {
  return (
    <HashRouter>
      <Switch>

        <Route component={NotFoundContainer} />
      </Switch>
    </HashRouter>
  );
}
