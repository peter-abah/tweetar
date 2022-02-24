import { useState } from "react";
import classnames from "classnames";
import { useBoolean } from "usehooks-ts";

import FullscreenImageViewer from "./FullscreenImageViewer";

import { MdClose } from "react-icons/md";

interface Props {
  images: string[];
  removable?: boolean;
  onRemove?: (index: number) => void;
}
const Images = ({ images, removable, onRemove }: Props) => {
  const { value: showLightBox, toggle } = useBoolean(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { length } = images;
  if (length < 1) return null;

  const toggleLightBox = (image?: string) => {
    toggle();
    if (image) {
      const index = images.indexOf(image);
      setCurrentImageIndex(index);
    }
  };

  const className = classnames(
    "w-full aspect-video my-2 mr-2 rounded-xl overflow-hidden",
    { "gap-0.5 grid grid-cols-2": length > 1 },
    { "grid-rows-auto": length > 2 }
  );

  return (
    <>
      <div className={className}>
        {images.map((image, i) => (
          <div key={i} className="w-full h-full relative">
            <button
              type="button"
              onClick={() => toggleLightBox(image)}
              className="w-full h-full"
              style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: "center",
                backgroundColor: "gray",
                backgroundSize: "cover",
              }}
            ></button>
            {removable && (
              <button
                type="button"
                title="remove image"
                className="absolute bg-bg/50 top-2 right-2 flex items-center justify-center rounded-full w-8 h-8"
                onClick={() => onRemove && onRemove(i)}
              >
                <MdClose className="text-xl text-red" />
              </button>
            )}
          </div>
        ))}
      </div>
      {showLightBox && (
        <FullscreenImageViewer
          image={images[currentImageIndex]}
          handleClose={toggleLightBox}
        />
      )}
    </>
  );
};

export default Images;
