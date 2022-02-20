import { useEffect, useState } from "react";
import { getProfile } from "../action/profileAction";

export const useUsersInfo = (usersId) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    setLoading(true);

    try {
      async function getUserInforList(listUser) {
        const data = await Promise.all(
          listUser &&
            listUser?.map(async (p) => {
              const res = await getProfile(p);
              return res;
            })
        );

        setUsers(data);
        setLoading(false);
        setErr(false);
      }

      getUserInforList(usersId);
    } catch (error) {
      console.log(error);
      setErr(true);
      setLoading(false);
    }
  }, [usersId?.length]);

  return { users, loading, err };
};
