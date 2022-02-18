import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  query,
  where,
  onSnapshot,
  collection,
  orderBy,
} from "firebase/firestore";

const useFireStore = (table, conditional) => {
  const { fieldName, operator, compareValue } = conditional;
  const [document, setDocument] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, table),
      where(fieldName, operator, compareValue),
      orderBy("create_at", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocument(documents);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [collection, conditional]);

  return { document, loading };
};

export default useFireStore;
