import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { validateLogin } from "../../helpers/validators/user.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./login.css";
import DotsLoader from "../../components/dots-loader/DotsLoader.jsx";
import { logUser } from "@/redux/slices/user/user.async.thunks.js";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const send = (credentials) => {
    dispatch(logUser(credentials));
  };

  useEffect(() => {
    if (user.token) {
      navigate("/projects");
    }

    () => toast.dismiss();
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(validateLogin),
  });

  if (user.loading) return <DotsLoader />;

  return (
    <div className="flex-row--centered">
      <form className="form-login" onSubmit={handleSubmit(send)}>
        <p className="form-title">Sign in to your account</p>

        <div className="input-container">
          <input
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
          <span className="error-message">
            {errors.email && "Email must be a valid email address"}
          </span>
        </div>

        <div className="input-container">
          <input
            type="password"
            placeholder="Enter password"
            {...register("password")}
          />
          <span className="error-message">{errors.password?.message}</span>
        </div>
        <button type="submit" className="blue-button">
          Sign in
        </button>

        <p className="signup-link">
          No account?
          <Link to="/register">Sign up</Link>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
