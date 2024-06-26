import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const ImageUploader = ({ onImagesUploaded, propertyid, record }) => {
  const [images, setImages] = useState([]);
  const [imagesToSave, setImagesToSave] = useState([]);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
  const MAX_FILE_NAME_LENGTH = 50; // Maximum length for file names

  useEffect(() => {
    onLoadFetchData();
  }, [propertyid]);

  const onLoadFetchData = async () => {
    await GetImagesFromDB();
  };

  const handleImageUpload = (event) => {
    if (imagesToSave.length > 0) {
      return toast.error(
        "Please save the image first before proceeding to add a new image. Thank you."
      );
    }
    const files = Array.from(event.target.files);
    const newImages = [];

    files.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`File ${file.name} exceeds the 5MB size limit.`);
        return;
      }

      if (file.name.length > MAX_FILE_NAME_LENGTH) {
        toast.error(`File name ${file.name} exceeds the 50 character limit.`);
        return;
      }

      newImages.push({
        id: Math.random().toString(36).substr(2, 9), // Generate a unique ID for each image
        file: file,
        src: URL.createObjectURL(file),
        description: file.name,
      });
    });

    setImagesToSave((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (id) => {
    const updatedImages = imagesToSave.filter((image) => image.id !== id);
    setImagesToSave(updatedImages);
  };

  const handleRemoveFromDBImage = async (fileName) => {
    try {
      const filesResponse = await axios.delete(
        `https://localhost:44385/api/file/${propertyid}/${fileName}`
      );

      if (filesResponse.data) {
        toast.success("Image deleted successfully.");
      } else {
        throw new Error("Failed to delete images");
      }
    } catch (error) {
      toast.error(error.message);
      // Optionally handle error state
    } finally {
      GetImagesFromDB();
    }
  };

  const GetImagesFromDB = async () => {
    const filesResponse = await axios.get(
      `https://localhost:44385/api/file/${propertyid}/getAllFilesInFolder`
    );
    const files = filesResponse.data;
    if(files){
      setImages(files);
      onImagesUploaded(files);
    }
    else{
      setImages([]);
      onImagesUploaded([]);
    }

  };

  const handleSaveImages = async () => {
    try {
      const formData = new FormData();
      imagesToSave.forEach((image) => {
        formData.append("file", image.file);
      });

      const response = await axios.post(
        `https://localhost:44385/api/file/${propertyid}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data) {
        throw new Error("Failed to save images");
      } else {
        toast.success("Image successfully added to the databbase.");
      }
    } catch (error) {
      console.error("Error saving images:", error.message);
      toast.error(error.message);
      // Optionally handle error state
    } finally {
      GetImagesFromDB();
      setImagesToSave([]); // Clear images state after successful upload
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Upload Images</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2">
        {imagesToSave.map((image, index) => (
          <div key={image.id} className="relative">
            <button
              className="absolute right-1 top-1 text-red-500 bg-white p-1 rounded-full shadow-md z-10"
              onClick={() => handleRemoveImage(image.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1a1 1 0 0 1 1 1v13a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1zM5 5a1 1 0 0 1 2 0v10a1 1 0 1 1-2 0V5zm8-1a1 1 0 1 1 2 0v10a1 1 0 1 1-2 0V4z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <img
              src={image.src}
              alt={image.description}
              className="w-full h-32 object-cover rounded-lg"
            />
            <p className="absolute bottom-0 bg-black bg-opacity-50 text-white w-full text-center rounded-b-lg truncate px-2">
              {image.description}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={handleSaveImages}
        className={`w-full mt-4 p-2 bg-yellow-600 text-black rounded-lg hover:bg-yellow-800 ${
          imagesToSave.length === 0 ? "hidden" : ""
        }`}
      >
        Save Images
      </button>
      <span className="text-xl font-bold mb-4 mt-2">Images from Database</span>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <button
              className="absolute right-1 top-1 text-red-500 bg-white p-1 rounded-full shadow-md z-10"
              onClick={() => handleRemoveFromDBImage(image)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1a1 1 0 0 1 1 1v13a1 1 0 0 1-2 0V2a1 1 0 0 1 1-1zM5 5a1 1 0 0 1 2 0v10a1 1 0 1 1-2 0V5zm8-1a1 1 0 1 1 2 0v10a1 1 0 1 1-2 0V4z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <img
              key={image}
              src={`https://localhost:44385/api/file/${propertyid}/${image}`}
              alt={record?.Name}
              className="w-full h-32 object-cover rounded-lg"
            />
            <p className="absolute bottom-0 bg-black bg-opacity-50 text-white w-full text-center rounded-b-lg truncate px-2">
              {record?.Name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
