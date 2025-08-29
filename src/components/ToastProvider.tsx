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
          background: 'var(--toast-bg, #ffffff)', // Use CSS variable for background
          color: 'var(--toast-text-color, #363636)', // Use CSS variable for text color
        },
        // Default options for specific types
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#22c55e',
            secondary: 'white',
          },
        },
        error: {
          duration: 4000,
          iconTheme: {
            primary: 'red',
            secondary: 'white',
          },
        },
      }}
    />
  );
};

export default ToastProvider;