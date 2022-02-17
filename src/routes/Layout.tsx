import { useBoolean } from "usehooks-ts";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const Layout = () => {
  const { value: isNavOpen, toggle: toggleNav } = useBoolean(false);
  return (
    <div className="tracking-wide">
      <Header isNavOpen={isNavOpen} toggleNav={toggleNav} />
      <div className="md:grid md:grid-cols-[1fr_3fr] lg:grid-cols-[1fr_1.6fr_1fr]">
        <SideBar isOpen={isNavOpen} />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
