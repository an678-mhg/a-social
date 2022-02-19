import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../action/userAction";
import Loading from "../global/Loading";
import UserItem from "./UserItem";
import userState from "../stored/userState";

const ModalUser = ({ setShowModal }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const currentUser = userState((state) => state.curentUser);

  useEffect(() => {
    async function getAllUser() {
      const data = await fetchAllUsers();
      setUsers(data);
      setLoading(false);
    }

    setLoading(true);
    getAllUser();
  }, []);

  return (
    <div
      className="fixed top-0 bottom-0 right-0 left-0 px-3 flex justify-center items-center modal-edit-profile overflow-auto"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-white w-[400px] h-[300px] flex flex-col items-center justify-center modal-users max-w-[100%] rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="w-full h-[300px] px-3 pb-2 pt-3 overflow-auto">
            {users.map((p) =>
              p.id !== currentUser.uid ? (
                <UserItem
                  setLoadingRooms={setLoadingRooms}
                  key={p.id}
                  data={p}
                />
              ) : null
            )}
          </div>
        )}
      </div>

      {loadingRooms && <Loading />}
    </div>
  );
};

export default ModalUser;
