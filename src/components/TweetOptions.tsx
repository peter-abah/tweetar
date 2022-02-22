import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

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
        <button className="ml-auto text-base rounded-full w-8 h-8 hover:bg-slate-900/10 text-slate-900">
          <FontAwesomeIcon icon={faEllipsisH} />
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
