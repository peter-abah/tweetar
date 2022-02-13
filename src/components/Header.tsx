import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

interface Iprops {
  isNavOpen: boolean;
  toggleNav: () => void;
}

const Header = (props: Iprops) => {
  const { isNavOpen, toggleNav } = props;
  return (
    <header className="sticky top-0 z-20 h-10 bg-white grid grid-cols-[1fr_2fr_1fr] px-4 py-2 border-b border-neutral-300">
      <h1 className="mx-auto">Tweeter</h1>
      <button className="col-start-3 w-fit ml-auto" onClick={toggleNav} type="button">
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
