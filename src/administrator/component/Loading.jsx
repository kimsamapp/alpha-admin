import React from 'react';
import { Spinner } from "@material-tailwind/react";

const Loading = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
       <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
       <div className="flex flex-col items-center">
         <Spinner className="h-16 w-16 text-white mb-4 animate-spin" /> {/* Adjust spinner size and animation */}
         <h6 className="text-white">Processing...</h6> {/* Style for the processing message */}
       </div>
     </div>
      )}
    </>
  );
};

export default Loading;