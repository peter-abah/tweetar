import { MdMoreHoriz } from "react-icons/md";

import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

const menuItemStyles = {
  active: {
    backgroundColor: "#444",
  },
};

interface Props {
  values: [[title: string, func: () => void]];
}
const TweetOptions = ({ values }: Props) => {
  return (
    <Menu
      menuButton={
        <button className="shrink-0 ml-auto pl-2 grid place-items-center rounded-full w-8 h-8 hover:bg-slate-900/10 text-slate-900">
          <MdMoreHoriz className="text-2xl" />
        </button>
      }
    >
      {values.map(([title, handleClick]) => (
        <MenuItem key={title} styles={menuItemStyles} onClick={handleClick}>
          {title}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default TweetOptions;
