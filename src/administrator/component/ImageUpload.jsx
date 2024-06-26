import { useState } from 'react';

function ImageUpload(props) {
 const { setUploadImg } = props;

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setUploadImg(reader.result)
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () =>{
    setUploadImg(null);
  }

  return (
    <div className="flex flex-col items-center">
      <label className="cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <div className="bg-gray-200 w-32 h-32 flex items-center justify-center rounded-md">
          {image ? (
            <img
              src={image}
              alt="Uploaded"
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <span className="text-gray-500 text-sm">Upload Image</span>
          )}
        </div>
      </label>
      {image && (
        <button
          onClick={() => setImage(null)}
          className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
        >
          Remove
        </button>
      )}
    </div>
  );
}

export default ImageUpload;