import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/thunks/fetchUsers";
import { addUser } from "../store/thunks/addUser";

import Button from "./Button";
function UsersList() {
  const [isLoadingUsers, setIsLoadigUsers] = useState(false);
  const [loadingUsersError, setLoadingUsersError] = useState(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [creatingUserError, setCreatingUserError] = useState(null);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => {
    return state.users;
  });
  const renderedUsers = data.map((user) => {
    return (
      <div key={user.id} className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    );
  });

  useEffect(() => {
    dispatch(fetchUsers())
      .unwrap()
      .catch((err) => setLoadingUsersError(err))
      .finally(() => setIsLoadigUsers(false));
  }, [dispatch]);

  const handleUserAdd = () => {
    setIsCreatingUser(true);
    dispatch(addUser())
      .unwrap()
      .catch((err) => {
        setCreatingUserError(err).finally(() => {
          setIsCreatingUser(false);
        });
      });
  };

  if (isLoadingUsers) {
    return <div>{<Skeleton times={6} classIName="h-10 w-full" />}</div>;
  }
  if (loadingUsersError) {
    return <div>Error fetching data...</div>;
  }
  const renderedUsers = data.map((user) => {
    return (
      <div key={user.id} className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer"></div>
        {user.name}
      </div>
    );
  });

  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        {isCreatingUser ? (
          "Creating User... "
        ) : (
          <Button onClick={handleUserAdd}>+ Add User</Button>
        )}
        {creatingUserError && "Error creating user ... "}
      </div>
      {renderedUsers}
    </div>
  );
}
export default UsersList;
