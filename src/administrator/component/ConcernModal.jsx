import { useState } from "react";

const ConcernModal = ({ isOpen, onClose }) => {
  const [concern, setConcern] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for handling the forgot password submission
    console.log("Forgot password form submitted with email:", concern);
    // Close the modal after submission
    onClose();
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Reporting a bug?
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Enter your concern to able to fix the issue being encountered.
                    </p>
                  </div>
                  <div className="mt-6">
                    <textarea
                      type="text"
                      id="concern"
                      className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      placeholder="Enter your concern"
                      value={concern}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-black hover:bg-yellow-800 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
              >
                Report Bug
              </button>
              <button
                onClick={onClose}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-non sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConcernModal;
