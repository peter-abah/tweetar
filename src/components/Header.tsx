import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useSettings } from "../contexts/settingsContext";

interface Iprops {
  title: string;
  backLink?: boolean;
}

const Header = (props: Iprops) => {
  const { isNavOpen, toggleNav } = useSettings();
  const { title } = props;
  const navigate = useNavigate();

  return (
    <header className="flex items-center sticky top-0 z-20 h-16 px-4 py-2 bg-bg/60 backdrop-blur-md">
      {props.backLink && (
        <button className="mr-8" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}

      <h1 className="text-xl font-bold">{title}</h1>

      <button
        className="md:hidden w-fit ml-auto"
        onClick={toggleNav}
        type="button"
      >
        {isNavOpen ? (
          <FontAwesomeIcon icon={faTimes} />
        ) : (
          <FontAwesomeIcon icon={faBars} />
        )}
      </button>
    </header>
  );
};

export default Header;
