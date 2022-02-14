import classnames from "classnames";
import { Link } from "react-router-dom";
import { AuthContextInterface, useAuth } from "../contexts/authContext";

const SideBar = ({ isOpen }: { isOpen: boolean }) => {
  const { user } = useAuth() as AuthContextInterface;

  const profileLink = user ? `/profile/${user.username}` : ''
  const links = [
    { name: "Home", link: "/home", id: 1 },
    { name: "Search", link: "/home", id: 2 },
    { name: "Profile", link: profileLink, id: 3 },
    { name: "Home", link: "/home", id: 4 },
    { name: "Home", link: "/home", id: 5 },
  ];

  const navClassName = classnames(
    "hidden md:block md:sticky top-10 h-fit col-span-1 h-screen",
    { "!block fixed left-0 w-4/5 z-20 bg-white": isOpen }
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
