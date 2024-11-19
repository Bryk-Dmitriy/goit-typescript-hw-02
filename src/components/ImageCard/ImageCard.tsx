import { imageTypes } from "../../types";
import css from "./ImageCard.module.css";

type ImageCardProps = {
  image: imageTypes;
  onClick: (image: imageTypes) => void;
};

export default function ImageCard({
  image,
  onClick,
}: ImageCardProps): React.ReactElement {
  return (
    <div>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={css.image}
        onClick={() => onClick(image)}
      />
    </div>
  );
}
