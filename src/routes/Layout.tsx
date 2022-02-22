import { useWindowSize } from "usehooks-ts";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const Layout = () => {
  return (
    <div className="md:grid md:grid-cols-[1fr_3fr] lg:grid-cols-[1fr_2.3fr_1fr] max-w-screen-xl w-full mx-auto h-full grow">
      <SideBar />
      <main className="flex flex-col w-full max-w-xl col-span-1 mx-auto border-x border-neutral-300 h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
