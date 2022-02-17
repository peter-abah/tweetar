import classnames from "classnames";
import { linkSync } from "fs";
import { Link } from "react-router-dom";
import { AuthContextInterface, useAuth } from "../contexts/authContext";
import { useSettings } from "../contexts/settingsContext";

const SideBar = () => {
  const { user } = useAuth() as AuthContextInterface;
  const { isNavOpen } = useSettings();

  const profileLink = user ? `/profile/${user.username}` : ''
  let links = [
    { name: "Home", link: "/home", id: 1 },
    { name: "Search", link: "/search", id: 2 },
    { name: "Profile", link: profileLink, id: 3 },
    { name: "Tweet", link: "/new", id: 4 },
  ];

  links = user ? links : links.filter(({name}) => name !== 'Tweet');

  const navClassName = classnames(
    "hidden md:block md:sticky top-10 h-fit col-span-1 h-screen",
    { "!block fixed left-0 w-4/5 z-20 bg-bg": isNavOpen }
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
