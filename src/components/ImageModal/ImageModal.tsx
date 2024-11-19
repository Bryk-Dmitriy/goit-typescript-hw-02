import Modal from "react-modal";
import { imageTypes } from "../../types";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

type ImageModalProps = {
  image: imageTypes | null;
  onClose: () => void;
};

export default function ImageModal({
  image,
  onClose,
}: ImageModalProps): React.ReactElement {
  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      ariaHideApp={false}
      className={css.modal}
    >
      {image && (
        <div className={css.wrap}>
          <img
            src={image.urls.regular}
            alt={image.alt_description}
            className={css.img}
          />
          <div className={css.textWrap}>
            <p>
              <b>Author: {image.user.name}</b>
            </p>
            <p>
              <b>Likes: {image.likes}</b>
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}
