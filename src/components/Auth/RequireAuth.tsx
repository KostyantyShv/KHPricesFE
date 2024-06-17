import { useLocation, Navigate, Outlet } from "react-router-dom";

interface IRoles {
  allowedRoles: number[];
}
interface IUser {
  currentUser: {
    username: string;
    token: string;
    role: number;
    userId: number;
  };
}
const RequreAuth = ({ allowedRoles }: IRoles) => {
  const location = useLocation();
  const storedData = localStorage.getItem("autorized");
  const { currentUser }: IUser = storedData ? JSON.parse(storedData) : null;
  return currentUser && allowedRoles.includes(currentUser.role as never) ? (
    <Outlet />
  ) : currentUser?.username ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

export default RequreAuth;
