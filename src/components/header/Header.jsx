import { useDispatch } from "react-redux";
import { IoExitOutline } from "react-icons/io5";
import { resetUser } from "@/redux/slices/user/user.slice";
import { useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("user");
    dispatch(resetUser());
    navigate("/logIn");
  };

  return (
    <div className="header">
      <span className="username">Tasks app</span>
      <button className="blue-button--logout" onClick={logOut}>
        <IoExitOutline />
      </button>
    </div>
  );
};

export default Header;
