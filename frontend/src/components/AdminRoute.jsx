import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectUser, selectAuthLoading } from "../redux/slices/authSlice";

const AdminRoute = () => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectAuthLoading);
  if (loading)
    return <div className="p-10 text-center">Checking Admin Access...</div>;
  return user && user.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate replace to="/login" />
  );
};
export default AdminRoute;
