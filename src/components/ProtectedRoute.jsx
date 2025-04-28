import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slices/user/user.slice";
import DotsLoader from "./dots-loader/DotsLoader";

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (!user.token) {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser) dispatch(setUser(storedUser));
      else navigate("/logIn");
    }
  }, [user]);

  if (!user.token) return <DotsLoader />;

  return <>{children || <Outlet />}</>;
}

export default ProtectedRoute;
