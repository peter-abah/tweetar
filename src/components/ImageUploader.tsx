import ImageUploading, { ImageListType } from "react-images-uploading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import TweetImages from "./TweetImages";

interface Props {
  images: ImageListType;
  onChange: (images: ImageListType) => void;
}
const ImageUploader = ({ images, onChange }: Props) => {
  const image_urls = images.map((image) => image.data_url);

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={(images) => onChange(images)}
      maxNumber={4}
      dataURLKey="data_url"
    >
      {({ onImageUpload, onImageRemoveAll, onImageRemove }) => (
        <>
          <TweetImages images={image_urls} removable onRemove={onImageRemove} />
          <div className="flex items-center justify-end gap-4 py-3">
            <button
              className="flex items-center gap-2"
              type="button"
              onClick={onImageUpload}
            >
              <FontAwesomeIcon className="text-3xl" icon={faImage} />
              <span>Images</span>
            </button>
            <button
              className="px-3 py-1 bg-primary text-bg rounded"
              type="button"
              onClick={onImageRemoveAll}
            >
              Clear
            </button>
          </div>
        </>
      )}
    </ImageUploading>
  );
};

export default ImageUploader;
