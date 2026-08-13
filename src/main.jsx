import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from '@/app/store';
import PageLoader from '@/components/loading/PageLoader';
import ErrorBoundary from '@/components/error/ErrorBoundary';
import App from './App';
import '@/styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary
      fallbackTitle="The application failed to start"
      fallbackDescription="Please refresh the page. If the problem continues, contact support."
    >
      <Provider store={store}>
        <PersistGate loading={<PageLoader />} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
