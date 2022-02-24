import ImageUploading, { ImageListType } from "react-images-uploading";
import { FaImage } from "react-icons/fa";
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
              <FaImage className="text-3xl" />
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
