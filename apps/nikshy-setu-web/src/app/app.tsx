/* eslint-disable */
import { initStore } from '@nikshay-setu-v3-monorepo/store';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useLocation } from 'react-router-dom';
import AppRoutes from '../AppRoutes';

export const store = initStore();

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <Provider store={store}>
      <ScrollToTop />
      <AppRoutes />
    </Provider>
  );
}
/* eslint-disable */
export default App;
