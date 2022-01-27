import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

interface Iprops {
  isNavOpen: boolean;
  toggleNav: () => void;
}

const Header = (props: Iprops) => {
  const { isNavOpen, toggleNav } = props;
  return (
    <header className="flex justify-between px-4 py-2">
      <h1>Tweeter</h1>
      <button onClick={toggleNav} type="button">
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
