import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectUser, selectAuthLoading } from "../redux/slices/authSlice";

const ProtectedRoute = () => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectAuthLoading);

  // Loading time (Flash prevent)
  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
