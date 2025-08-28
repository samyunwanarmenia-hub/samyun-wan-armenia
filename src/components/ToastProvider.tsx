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
          background: '#363636',
          color: '#fff',
        },
        // Default options for specific types
        success: {
          duration: 3000,
          // 'theme' is not a direct property here, use 'iconTheme' or 'style'
          iconTheme: {
            primary: 'green',
            secondary: 'black',
          },
        },
        error: {
          duration: 4000,
          // 'theme' is not a direct property here, use 'iconTheme' or 'style'
          iconTheme: {
            primary: 'red',
            secondary: 'black',
          },
        },
      }}
    />
  );
};

export default ToastProvider;