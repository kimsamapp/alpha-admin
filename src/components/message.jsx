import { Fragment } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
  export const AlertMessage = () => {
    return (
      <Fragment>
        <ToastContainer 
            position="top-right"
            autoClose={10000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
            theme = "colored"
        />
      </Fragment>
    );
  }