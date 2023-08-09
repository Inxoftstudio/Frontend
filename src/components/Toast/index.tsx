import React from 'react';
import { ToastContainer,Slide  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alert:React.FC  = () => {
  return (
        <ToastContainer
          position="bottom-right"
          autoClose={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="dark"
          transition={Slide}
        />
  )
}

export default Alert