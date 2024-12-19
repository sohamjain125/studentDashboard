import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Redux Provider
import NotFound from './components/NotFound';
import store from './util/store';

// Define the routes for the application
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/dashboard',
    element: <NotFound />,
  },
  {
    path: '/chapter',
    element: <NotFound />,
  },
  {
    path: '/help',
    element: <NotFound />,
  },
  {
    path: '/reports',
    element: <NotFound />,
  },
  {
    path: '/settings',
    element: <NotFound />,
  },
]);

// Create the root and render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* Wrap with Redux Provider */}
    <RouterProvider router={router} />
  </Provider>
);
