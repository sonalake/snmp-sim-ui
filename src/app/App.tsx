import { Navigate } from 'react-router';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Flowbite } from 'flowbite-react';

import { Providers } from './context/providers';
import { ErrorBoundary } from './components';
import { useDetectUserConnection } from './hooks';
import { Devices, NoConnection, PageNotFound } from './pages';

const App = () => {
  const { isBrowserOnline } = useDetectUserConnection();

  return (
    <Flowbite>
      <Providers>
        <BrowserRouter>
          <ErrorBoundary>
            {isBrowserOnline ? (
              <Routes>
                <Route path='/devices' element={<Devices />} />

                <Route path='/' element={<Navigate to='/devices' />} />
                <Route path='*' element={<PageNotFound />} />
              </Routes>
            ) : (
              <NoConnection />
            )}
          </ErrorBoundary>
        </BrowserRouter>
      </Providers>
    </Flowbite>
  );
};

export default App;
