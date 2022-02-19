import classnames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useSettings } from "../contexts/settingsContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();
  const { isNavOpen, toggleNav } = useSettings();

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
    "hidden top-0 bottom-0 h-screen fixed w-full max-w-xs col-span-1 md:block md:max-w-none md:sticky overflow-auto",
    { "!block fixed z-30 bg-bg": isNavOpen }
  );
  return (
    <nav className={navClassName}>
      <div className="h-16 py-2 px-4 w-full flex items-center md:hidden">
        <button onClick={toggleNav} className="ml-auto">
          <FontAwesomeIcon className="text-lg" icon={faTimes} />
        </button>
      </div>

      <ul className="flex flex-col gap-6 px-8">
        {links.map(({ link, name, id }) => (
          <li key={id}>
            <Link className="block p-3 rounded-full w-fit text-xl" to={link}>
              {name}
            </Link>
          </li>
        ))}

        <li>{currentUser ? logOutBtn : login}</li>
      </ul>
    </nav>
  );
};

export default SideBar;
