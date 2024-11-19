import ImageCard from "../ImageCard/ImageCard";
import { imageTypes } from "../../types";
import css from "./ImageGallery.module.css";

type PropsImageGallery = {
  images: imageTypes[];
  onImageClick: (image: imageTypes) => void;
};

export default function ImageGallery({
  images,
  onImageClick,
}: PropsImageGallery): React.ReactElement | null {
  return images.length > 0 ? (
    <ul className={css.gallery}>
      {images.map((image) => (
        <li key={image.id} className={css.galleryItem}>
          <ImageCard image={image} onClick={onImageClick} />
        </li>
      ))}
    </ul>
  ) : null;
}
