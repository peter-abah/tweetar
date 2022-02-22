import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const Layout = () => {
  return (
    <div className="md:grid md:grid-cols-[1fr_3fr] lg:grid-cols-[1fr_1.6fr_1fr] h-full grow">
      <SideBar />
      <main className="flex flex-col w-full max-w-xl col-span-1 mx-auto border-x border-neutral-300 h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
