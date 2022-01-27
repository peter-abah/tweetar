import { useBoolean } from "usehooks-ts";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  const {value: isNavOpen, toggle: toggleNav } = useBoolean(false);
  return (
    <div>
      <Header isNavOpen={isNavOpen} toggleNav={toggleNav} />
      <Outlet />
    </div>
  );
};

export default Layout;
