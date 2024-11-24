import { useEffect } from "react";
import Skeleton from "./Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/thunks/fetchUsers";
function UsersList() {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => {
    return state.users;
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
  return <div>{data.length}</div>;
}
export default UsersList;
