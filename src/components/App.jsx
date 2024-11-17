import { useEffect, useState } from "react";
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import LoadMoreBtn from './LoadMoreBtn';
import Loader from './Loader';
import ImageModal from './ImageModal';
import ErrorMessage from './ErrorMessage';


const API_KEY = "n5KXrJKSVZFd1dagsQwGz2lwRu00Yo3bJySc7Li9Bo0";

export default function App() {

    const [images, setImages] = useState([]);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (query === '') return;
        fetchImages(query, page);
        }, [query, page]);

      const fetchImages = async (searchQuery, page) => {
        setLoading(true);
        try {
          const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: { query: searchQuery, page, per_page: 12 },
            headers: {
            Authorization: `Client-ID ${API_KEY}`,
        },
        });
          setImages(prevImages => [...prevImages, ...response.data.results]);
        } catch (error) {
            setError('Somethings wrong. Please try again later');
            toast.error('Somethings wrong. Please try again later');
        } finally {
            setLoading(false);
        }
        };
    
      const handleSearchSubmit = searchQuery => {
        setQuery(searchQuery);
        setImages([]);
        setPage(1);
      };
    
      const handleImageClick = image => {
        setModalImage(image);
        setShowModal(true);
      };
    
      const closeModal = () => {
        setShowModal(false);
        setModalImage(null);
      };
    
      return (
        <div>
          <SearchBar onSubmit={handleSearchSubmit}/>
          <ImageGallery images={images} onImageClick={handleImageClick}/>
          {loading && <Loader/>}
          {images.length > 0 && !loading && <LoadMoreBtn onClick={() => setPage(prevPage => prevPage + 1)}/>}
          {showModal && <ImageModal image={modalImage} onClose={closeModal}/>}
          {error && <ErrorMessage message={error}/>}
          <Toaster/>
        </div>
      );
    }