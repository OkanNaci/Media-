import { useEffect } from "react";
import Skeleton from "./Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/thunks/fetchUsers";
function UsersList() {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => {
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
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) {
    return <div>{<Skeleton times={6} className="h-10 w-full" />}</div>;
  }
  if (error) {
    return <div>Error fetching data...</div>;
  }
  return <div>{renderedUsers}</div>;
}
export default UsersList;
