import { NavLink } from "react-router-dom";

const ProfileNav = () => {
  const links = [
    { title: "Tweets", link: "tweets" },
    { title: "Likes", link: "likes" },
    { title: "Media", link: "media" },
  ];
  return (
    <nav>
      <ul className="flex scrollbar-hide snap-x">
        {links.map(({ title, link }) => (
          <li className="min-w-[6rem] px-6 mx-2 text-center hover:bg-gray-100 snap-start">
            <NavLink
              className="block py-3 border-green-400"
              style={({ isActive }) => {
                return {
                  borderBottom: isActive ? "solid 4px" : 0,
                };
              }}
              to={link}
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ProfileNav;
