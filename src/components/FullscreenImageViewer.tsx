import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { MdClose } from "react-icons/md";

const FullscreenImageViewer = ({
  image,
  handleClose,
}: {
  image: string;
  handleClose: () => void;
}) => {
  const ref = useRef(null);
  useOnClickOutside(ref, handleClose);

  return (
    <div className="flex flex-col z-50 fixed top-0 left-0 bottom-0 right-0 bg-primary/70">
      <nav className="py-4 px-6 w-full md:px-12">
        <button
          className="flex items-center !text-2xl md:text-4xl text-bg font-bold ml-auto"
          onClick={handleClose}
          type="button"
        >
          <MdClose />
        </button>
      </nav>
      <div className="grow flex items-center justify-center">
        <div ref={ref} className="grow h-[90%] w-full md:max-w-[80%]">
          <div
            className="h-full"
            style={{
              backgroundImage: `url(${image})`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FullscreenImageViewer;
