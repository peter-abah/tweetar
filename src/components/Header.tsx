import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSettings } from "../contexts/settingsContext";

interface Iprops {
  title: string;
  backLink?: string;
}

const Header = (props: Iprops) => {
  const { isNavOpen, toggleNav } = useSettings();
  const { title } = props;

  return (
    <header className="flex justify-between items-center sticky top-0 z-20 h-16 bg-white px-4 py-2">
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
