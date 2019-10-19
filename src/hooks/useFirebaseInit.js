import { useEffect, useState } from "react";
import firebase from "firebase/app";

export function useFirebaseInit() {
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(() => {
      setIsInit(true);
      unsubscribe();
    });
  }, []);

  return {
    isInit
  };
}
