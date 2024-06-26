import React, { useRef, useState } from "react";
import logo from "../assets/bg.png"; // Import your logo file
import ForgotPasswordModal from "../administrator/component/ForgotPasswordModal";
import { toast } from "react-toastify";
import { AlertMessage } from "../components/message";
import { useDispatch } from "react-redux";
import { Login } from "../redux/features/user/userSlice";
import ConcernModal from "../administrator/component/ConcernModal";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalReportOpen, setIsModalReporOpen] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your login logic here
    let requestParam = {
      data: {
        username: email,
        password: password,
      },
    };
    await dispatch(Login(requestParam));
    clearAll();
  };

  
  const clearAll = () => {
    setEmail("");
    setPassword("");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenRModal = () => {
    setIsModalReporOpen(true);
  };

  const handleCloseRModal = () => {
    setIsModalReporOpen(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-center md:w-1/2">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-20 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="email"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    onClick={handleOpenModal}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  id="password"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-yellow-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Report bug?{" "}
            <a
              onClick={handleOpenRModal}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Contact Administrator
            </a>
          </p>
          <ForgotPasswordModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
          <ConcernModal 
            isOpen={isModalReportOpen}
            onClose={handleCloseRModal}
          />
        </div>
      </div>
      <AlertMessage></AlertMessage>
    </div>
  );
};

export default LoginPage;
