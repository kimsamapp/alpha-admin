import { useState, useEffect } from 'react';

const Carousel = ({ images, propertyid, record }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleThumbnailClick = (index) => {
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, isTransitioning]);

  if (images.length === 0) {
    return <div>No images to display</div>;
  }

  return (
    <div className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg">
      <div className="relative w-full max-w-xl overflow-hidden rounded-lg">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 z-10 rounded-r-md"
          onClick={handlePrev}
        >
          Prev
        </button>
        <div className={`transition-transform duration-500 ${isTransitioning ? 'transform scale-95 opacity-75' : ''}`}>
          <img
            // src={images[currentIndex].src}
            src={`https://localhost:44385/api/file/${propertyid}/${images[currentIndex]}`}
            alt={`Slide ${currentIndex}`}
            className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover rounded-lg"
          />
           <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white p-2 text-center rounded-b-lg">
            <span className="block truncate px-2">{record?.Name}</span>
          </div>
        </div>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 z-10 rounded-l-md"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
      <div className="flex flex-wrap justify-center space-x-2 mt-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={`https://localhost:44385/api/file/${propertyid}/${image}`}
            alt={`Thumbnail ${index}`}
            className={`w-16 h-12 sm:w-20 sm:h-16 md:w-24 md:h-20 object-cover cursor-pointer rounded-md border-2 ${
                currentIndex === index ? 'border-blue-500' : 'border-transparent'
              } m-1`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
