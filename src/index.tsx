import 'react-toastify/dist/ReactToastify.min.css';
import './index.css';

import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './app/App';

const init = async () => {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mock-api/browser');
    worker.start();
  }
};

init().then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
