import ImageCard from "../ImageCard/ImageCard";
import { forwardRef } from "react";
import css from "./ImageGallery.module.css";
import { Photo } from "../App/App.types";

interface ImageGalleryProps {
  photos: Photo[];
  openModal: (id: string) => void;
}

const ImageGallery = forwardRef<HTMLUListElement, ImageGalleryProps>(
  function ImageGallery({ photos, openModal }, ref) {
    return (
      <ul className={css.gallery} ref={ref}>
        {photos.map(({ id, alt_description, urls }) => {
          return (
            <li className={css.galleryItem} key={id}>
              <ImageCard
                id={id}
                alt_description={alt_description}
                small={urls.small}
                openModal={openModal}
              />
            </li>
          );
        })}
      </ul>
    );
  }
);

export default ImageGallery;
