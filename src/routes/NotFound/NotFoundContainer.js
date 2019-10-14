import React, { useEffect, useState } from "react";
import { NotFoundLoading } from "./NotFoundLoading";

export function NotFoundContainer() {
  const [loadedComponent, setLoadedComponent] = useState(null);
  useEffect(() => {
    import(/* webpackPrefetch: true */ /* webpackChunkName: "NotFoundRoute" */ "./NotFound")
      .then(mod => {
        const { NotFound } = mod;
        setLoadedComponent({ component: NotFound });
      });
  }, []);

  if (!loadedComponent) {
    return <NotFoundLoading />; 
  }

  const { component: NotFound } = loadedComponent;
  return <NotFound />;
}
