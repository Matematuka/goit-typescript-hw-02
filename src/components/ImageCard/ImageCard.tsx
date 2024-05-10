import css from "./ImageCard.module.css";

interface ImageCardProps {
  id: string;
  alt_description: string;
  small: string;
  openModal: (id: string) => void;
}

const ImageCard = ({
  alt_description,
  small,
  id,
  openModal,
}: ImageCardProps) => {
  return (
    <div>
      <img
        className={css.img}
        id={id}
        src={small}
        alt={alt_description}
        onClick={() => openModal(id)}
        width="240px"
        height="280px"
      />
    </div>
  );
};

export default ImageCard;
