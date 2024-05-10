import { useState, useEffect, useRef } from "react";
import "./App.css";

import toast from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar.js";
import Loader from "../Loader/Loader.js";
import ErrorMessage from "../ErrorMessage/ErrorMessage.js";
import ImageGallery from "../ImageGallery/ImageGallery.js";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.js";
import ImageModal from "../ImageModal/ImageModal.js";
import { initModImg, pagination } from "../../var/inits.js";
import { fetchImagesSearch } from "../../services/api.js";
import { Photo, ModImg } from "./App.types.js";

const message = () =>
  toast("There are no images. Please enter another request", {
    duration: 4000,
    position: "top-left",
    style: {
      borderRadius: "10px",
      background: "#387ce1",
      color: "#fff",
    },
  });

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [imageModal, setImageModal] = useState<ModImg | undefined>(initModImg);
  const [maxPage, setMaxPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const listRef = useRef<HTMLUListElement>(null);
  const scrollHeight = useRef<number>(0);

  useEffect(() => {
    if (!listRef.current) return;
    window.scroll({
      behavior: "smooth",
      top: scrollHeight.current,
    });
    scrollHeight.current = listRef.current.clientHeight;
  }, [photos]);

  const loadMore = (): void => setCurrentPage((prev) => prev + 1);

  const handleModal = (id: string): void => {
    {
      setImageModal(
        photos.find((photo) => {
          return photo.id === id;
        })
      );
      setModalIsOpen(true);
    }
  };
  const onSearchQuery = (searchTerm: string): void => {
    if (query !== searchTerm) {
      setPhotos([]);
      setCurrentPage(1);
      setQuery(searchTerm);
    }
  };
  useEffect(() => {
    async function fetchImages() {
      try {
        setIsLoading(true);
        const response = await fetchImagesSearch(
          query,
          currentPage,
          pagination
        );
        setMaxPage(response.total_pages);
        setPhotos((photos) => [...photos, ...response.results]);
        if (response.total_pages === 0) {
          message();
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    if (query !== "") {
      fetchImages();
    }
  }, [query, currentPage]);

  return (
    <div>
      <SearchBar onSubmit={onSearchQuery} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {photos.length !== 0 && (
        <ImageGallery photos={photos} openModal={handleModal} ref={listRef} />
      )}
      {photos.length !== 0 && currentPage < maxPage && (
        <LoadMoreBtn onLoadMore={loadMore} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        imageModal={imageModal}
        onClose={() => setModalIsOpen(false)}
      />
    </div>
  );
}
export default App;
