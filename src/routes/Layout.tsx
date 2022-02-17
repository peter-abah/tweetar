import { useBoolean } from "usehooks-ts";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const Layout = () => {
  return (
    <div className="md:grid md:grid-cols-[1fr_3fr] lg:grid-cols-[1fr_1.6fr_1fr] tracking-wide">
      <SideBar/>
      <Outlet />
    </div>
  );
};

export default Layout;
