import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ImageModal from "../ImageModal/ImageModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { imageTypes } from "../../types";

type ErrorState = string | null;

type API_response = {
  results: imageTypes[];
};

const API_KEY = "n5KXrJKSVZFd1dagsQwGz2lwRu00Yo3bJySc7Li9Bo0";

export default function App(): React.ReactElement {
  const [images, setImages] = useState<imageTypes[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<imageTypes | null>(null);
  const [error, setError] = useState<ErrorState>(null);

  useEffect(() => {
    if (query === "") return;
    fetchImages(query, page);
  }, [query, page]);

  const fetchImages = async (
    searchQuery: string,
    page: number
  ): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get<API_response>(
        "https://api.unsplash.com/search/photos",
        {
          params: { query: searchQuery, page, per_page: 12 },
          headers: {
            Authorization: `Client-ID ${API_KEY}`,
          },
        }
      );
      setImages((prevImages) => [...prevImages, ...response.data.results]);
    } catch (error) {
      setError("Something went wrong. Please try again later");
      toast.error("Something went wrong. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (searchQuery: string): void => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const handleImageClick = (image: imageTypes): void => {
    setModalImage(image);
    setShowModal(true);
  };

  const closeModal = (): void => {
    setShowModal(false);
    setModalImage(null);
  };

  const loadMoreImages = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}
      {showModal && <ImageModal image={modalImage} onClose={closeModal} />}
      {error && <ErrorMessage message={error} />}
      <Toaster />
    </div>
  );
}
