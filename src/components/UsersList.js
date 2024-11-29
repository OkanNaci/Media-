import { useEffect } from "react";
import Skeleton from "./Skeleton";
import { useSelector } from "react-redux";
import { fetchUsers } from "../store/thunks/fetchUsers";
import { addUser } from "../store/thunks/addUser";
import { useThunk } from "../hooks/use-thunk";
import Button from "./Button";
import UsersListItem from "./UsersListItem";

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);
  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleUserAdd = () => {
    doCreateUser();
  };

  let content;
  if (isLoadingUsers) {
    content = <div>{<Skeleton times={6} classIName="h-10 w-full" />}</div>;
  } else if (loadingUsersError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} />;
      /**/
    });
  }
  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>

        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add User
        </Button>

        {creatingUserError && "Error creating user ... "}
      </div>
      {content}
    </div>
  );
}
export default UsersList;
