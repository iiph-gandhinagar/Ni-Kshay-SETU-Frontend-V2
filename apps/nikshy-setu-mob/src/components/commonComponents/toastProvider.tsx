import React, { createContext, useContext, useState } from 'react';
import CustomToast from './toast';

// Define the type for the context state
interface ToastContextType {
  showToast: (message: string) => void; // Function to trigger the toast
}

// Create the Toast Context with a default value
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};

// ToastProvider component that wraps the app and provides the context
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState({
    message: '',
    visible: false,
  });

  const showToast = (message: string) => {
    setToast({ message, visible: true });

    // Automatically hide the toast after 3 seconds
    setTimeout(() => {
      setToast({ message: '', visible: false });
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && (
        <CustomToast message={toast.message} visible={toast.visible} />
      )}
    </ToastContext.Provider>
  );
};
