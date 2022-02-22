import classnames from "classnames";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useSettings } from "../contexts/settingsContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

const SideBar = () => {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();
  const { isNavOpen, toggleNav, setNavOpen } = useSettings();

  const ref = useRef(null);
  useOnClickOutside(ref, () => setNavOpen(false));

  const profileLink = currentUser ? `/profile/${currentUser.username}` : "";
  let links = [
    { name: "Home", link: "/home", id: 1 },
    { name: "Search", link: "/search", id: 2 },
    { name: "Profile", link: profileLink, id: 3 },
    { name: "Tweet", link: "/new", id: 4 },
  ];

  const logOutUser = () => {
    logOut();
    navigate("/login");
  };

  const logOutBtn = (
    <button
      className="block p-3 rounded-full w-fit text-xl"
      onClick={logOutUser}
    >
      Logout
    </button>
  );
  const login = (
    <Link className="block p-3 rounded-full w-fit text-xl" to="/login">
      Login
    </Link>
  );

  // Filter links to profile and new tweet is user is not logged in
  links = currentUser
    ? links
    : links.filter(({ name }) => name !== "Tweet" && name !== "Profile");

  const navClassName = classnames(
    "scale-x-0 top-0 bottom-0 h-screen bg-bg fixed w-full max-w-xs z-40",
    "col-span-1 md:scale-x-100 md:block md:max-w-none md:sticky",
    "overflow-auto transition-transform duration-500 origin-top-left",
    { "!block fixed !scale-x-100": isNavOpen }
  );
  return (
    <>
      <div
        className={classnames("absolute w-0 h-0 top-[-9999px]", {
          "!fixed !w-full !h-full !top-0 !left-0 right-0 bottom-0 bg-primary/10 z-30 md:w-0 md:top-[9999px]":
            isNavOpen,
        })}
      />
      <nav ref={ref} className={navClassName}>
        <div className="h-16 py-2 px-4 w-full flex items-center md:hidden">
          <button onClick={toggleNav} className="ml-auto">
            <FontAwesomeIcon className="text-lg" icon={faTimes} />
          </button>
        </div>

        <ul className="flex flex-col md:py-10 gap-6 px-10">
          {links.map(({ link, name, id }) => (
            <li key={id}>
              <NavLink
                style={({ isActive }) => {
                  return { borderBottom: isActive ? "3px solid" : "none" };
                }}
                className="block p-3 w-fit text-xl hover:translate-y-[-4px] active:translate-y-0 transition-transform"
                to={link}
              >
                {name}
              </NavLink>
            </li>
          ))}

          <li>{currentUser ? logOutBtn : login}</li>
        </ul>
      </nav>
    </>
  );
};

export default SideBar;
