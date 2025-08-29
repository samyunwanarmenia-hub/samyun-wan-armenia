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
        className: '',
        duration: 5000,
        style: {
          background: '#FFFFFF', // Pure White
          color: '#212121', // Neutral Dark
        },
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#2E7D32', // Primary Green
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