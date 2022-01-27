import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav>Navbar</nav>
      <Outlet />
    </div>
  );
};

export default Layout;
