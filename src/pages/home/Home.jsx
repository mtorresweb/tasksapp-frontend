import { Outlet } from "react-router-dom";
import Header from "@/components/header/Header";
import "./home.css";

const Home = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Home;
