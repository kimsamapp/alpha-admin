import React from 'react';
import { Spinner } from "@material-tailwind/react";

const Loading = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <Spinner className="h-16 w-16 text-white 900/50" />
        </div>
      )}
    </>
  );
};

export default Loading;