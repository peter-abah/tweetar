import { useNavigate } from "react-router-dom";

import { MdArrowBack, MdMenu } from 'react-icons/md'
import { useSettings } from "../contexts/settingsContext";

interface Iprops {
  title?: string;
  backLink?: boolean;
}

const Header = (props: Iprops) => {
  const { isNavOpen, toggleNav } = useSettings();
  const { title } = props;
  const navigate = useNavigate();

  return (
    <header className="flex gap-6 items-center sticky top-0 z-20 h-16 px-4 py-2 bg-bg/60 backdrop-blur-md">
      {props.backLink && (
        <button onClick={() => navigate(-1)}>
          <MdArrowBack className="text-2xl" />
        </button>
      )}

      <h1 className="text-lg font-bold whitespace-nowrap overflow-hidden">{title}</h1>

      <button
        className="md:hidden w-fit ml-auto shrink-0"
        onClick={toggleNav}
        type="button"
        
      >
        {!isNavOpen && <MdMenu className="text-2xl" />}
      </button>
    </header>
  );
};

export default Header;
