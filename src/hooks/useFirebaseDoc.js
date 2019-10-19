import { useEffect, useState } from "react";
import firebase from "firebase/app";

export function useFirebaseDoc(docPath) {
  const [ data, setData ] = useState(null);

  useEffect(() => {
    setData(null);

    const docRef = firebase.firestore().doc(docPath);
    return docRef.onSnapshot(
      snapshot => {
        setData(snapshot.data());
      },
      error => {
        console.error("Error: ", error);
      }
    );
  }, [ docPath ]);

  return data;
}
