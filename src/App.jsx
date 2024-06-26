import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Authenticated from "./routes/Authenticated";
import UnAuthenticated from "./routes/UnAuthenticated";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { setLogin, xClearAll } from "./redux/features/user/userSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.login);
  const userDetails = useSelector((state) => state.userSlice.xuser);

  useEffect(() => {
    if (user) {
      const token = userDetails != null ? userDetails.Token : null;
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds
        // Check if token is expired
        if (decodedToken.exp < currentTime) {
          // Token expired, log out user
          dispatch(xClearAll());
        } else {
          // Token still valid, user is logged in
          dispatch(setLogin(true));
          // Check token validity every 5 minutes
          const checkTokenValidity = setInterval(() => {
            const currentTime = Date.now() / 1000; // Convert to seconds

            if (decodedToken.exp < currentTime) {
              clearInterval(checkTokenValidity);
              dispatch(xClearAll());
            }
          }, 300000); // 5 minutes
        }
      }
    }
  }, [user]);

  return (
    <>
      <Router>{user ? <Authenticated /> : <UnAuthenticated /> }</Router>
    </>
  );
}

export default App;
