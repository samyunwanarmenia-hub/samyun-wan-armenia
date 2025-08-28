import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
  return (
    <Toaster 
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: '',
        duration: 5000,
        style: {
          background: '#ffffff', // Changed to white
          color: '#363636', // Changed to dark gray
        },
        // Default options for specific types
        success: {
          duration: 3000,
          // 'theme' is not a direct property here, use 'iconTheme' or 'style'
          iconTheme: {
            primary: '#22c55e', // Changed to primary green
            secondary: 'white', // Changed secondary icon color for contrast
          },
        },
        error: {
          duration: 4000,
          // 'theme' is not a direct property here, use 'iconTheme' or 'style'
          iconTheme: {
            primary: 'red',
            secondary: 'white', // Changed secondary icon color for contrast
          },
        },
      }}
    />
  );
};

export default ToastProvider;