import { useState, useEffect, useRef } from "react";
import "./App.css";

import toast from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import Loader from "./components/Loader/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";
import { initModImg, pagination } from "./var/inits.js";
import { fetchImagesSearch } from "./services/api.js";

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
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageModal, setImageModal] = useState(initModImg);
  const [maxPage, setMaxPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const listRef = useRef(null);
  const scrollHeight = useRef(0);

  useEffect(() => {
    if (!listRef.current) return;
    window.scroll({
      behavior: "smooth",
      top: scrollHeight.current,
    });
    scrollHeight.current = listRef.current.clientHeight;
  }, [photos]);

  const loadMore = () => setCurrentPage((prev) => prev + 1);

  const handleModal = (id) => {
    {
      setImageModal(
        photos.find((photo) => {
          return photo.id === id;
        })
      );
      setModalIsOpen(true);
    }
  };
  const onSearchQuery = (searchTerm) => {
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
      <ImageGallery photos={photos} openModal={handleModal} ref={listRef} />
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
