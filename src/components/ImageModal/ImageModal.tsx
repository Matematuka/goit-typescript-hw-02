import Modal from "react-modal";
import css from "./ImageModal.module.css";

const ImageModal = ({ isOpen, imageModal, onClose }) => {
  const {
    alt_description,
    urls: { regular },
  } = imageModal;
  return (
    <Modal
      isOpen={isOpen}
      closeTimeoutMS={300}
      overlayClassName={css.modalOverlay}
      onRequestClose={() => onClose()}
      ariaHideApp={false}
    >
      <img src={regular} alt={alt_description}  />
    </Modal>
  );
};

export default ImageModal;
