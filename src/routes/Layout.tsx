import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import PeopleToFollow from "./PeopleToFollow";
import classnames from "classnames";

const Layout = () => {
  return (
    <div
      className={classnames(
        "md:grid md:grid-cols-[1fr_3fr] lg:grid-cols-[1fr_1.8fr_1fr]",
        "w-full mx-auto h-full grow"
      )}
    >
      <SideBar />
      <main className="flex flex-col w-full max-w-xl col-span-1 mx-auto border-x border-neutral-300 h-full">
        <Outlet />
      </main>
      <PeopleToFollow />
    </div>
  );
};

export default Layout;
