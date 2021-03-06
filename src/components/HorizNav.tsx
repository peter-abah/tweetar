import { NavLink } from "react-router-dom";

interface Props {
  links: Array<{ title: string; link: string }>;
}
const HorizNav = ({ links }: Props) => {
  return (
    <nav className="overflow-scroll scrollbar-hide">
      <ul className="flex snap-x">
        {links.map(({ title, link }) => (
          <li
            key={title}
            className="min-w-[6rem] px-6 mx-2 text-center hover:bg-gray-100 snap-start"
          >
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

export default HorizNav;
