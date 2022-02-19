import classnames from "classnames";
import { Link } from "react-router-dom";
import { AuthContextInterface, useAuth } from "../contexts/authContext";
import { useSettings } from "../contexts/settingsContext";

const SideBar = () => {
  const { currentUser } = useAuth() as AuthContextInterface;
  const { isNavOpen } = useSettings();

  const profileLink = currentUser ? `/profile/${currentUser.username}` : "";
  let links = [
    { name: "Home", link: "/home", id: 1 },
    { name: "Search", link: "/search", id: 2 },
    { name: "Profile", link: profileLink, id: 3 },
    { name: "Tweet", link: "/new", id: 4 },
  ];

  links = currentUser
    ? links
    : links.filter(({ name }) => name !== "Tweet" && name !== "Profile");

  const navClassName = classnames(
    "hidden md:block sticky top-0 bottom-0 col-span-1 h-screen",
    { "!block fixed left-0 w-4/5 z-30 bg-bg": isNavOpen }
  );
  return (
    <nav className={navClassName}>
      <ul className="flex flex-col gap-6 py-4 px-8">
        {links.map(({ link, name, id }) => (
          <li key={id}>
            <Link className="block p-3 rounded-full w-fit text-xl" to={link}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideBar;
