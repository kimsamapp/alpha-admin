import React, { Fragment, useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";
import Carousel from "./component/Carousel";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AlertMessage } from "../components/message";
import { GetPropertyById } from "../redux/features/user/userSlice";
import { useDispatch } from "react-redux";

const IntegratedUpload = () => {
  const location = useLocation();
  const { id } = useParams();
  const [record, setRecord] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    GetEntityById();
  }, [location]);

  const GetEntityById = async () => {
    let params = {
      data: {
        id: id,
      },
      token: null,
    };
    let resultQ = await dispatch(GetPropertyById(params));
    if (resultQ.meta.requestStatus === "fulfilled") {
      let entity = resultQ.payload;
      setRecord(entity);
    } else if (resultQ.meta.requestStatus === "rejected") {
      toast.error("Please contact administrator.");
    }
  };

  const [uploadedImages, setUploadedImages] = useState([]);

  const handleImagesUploaded = (newImages) => {
    setUploadedImages(newImages); // Update the state directly with the new array
  };

  return (
    <div className="App p-8 min-h-screen">
      <h1 className="text-2xl font-bold mb-8 text-center">
        List of images for property {record?.Name}
      </h1>
      {id === 0 ? (
        <React.Fragment>
          <span> {"No Display as of this moment"} </span>
        </React.Fragment>
      ) : (
        <Fragment>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="lg:w-1/4">
              <ImageUploader
                onImagesUploaded={handleImagesUploaded}
                propertyid={id}
                record={record}
              />
            </div>
            <div className="lg:w-3/4">
              <Carousel
                images={uploadedImages}
                key={uploadedImages.length}
                propertyid={id}
                record={record}
              />
            </div>
          </div>
        </Fragment>
      )}

      <AlertMessage />
    </div>
  );
};

export default IntegratedUpload;
