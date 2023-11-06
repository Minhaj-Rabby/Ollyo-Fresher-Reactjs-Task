import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Main from './components/Layout/Main';
import ImageGallery from './components/ImageGallery/ImageGallery';

const router=createBrowserRouter([
  {
    path:'/',
    element:<Main></Main>,
    children:[
      {
        path:'/',
        element:<ImageGallery></ImageGallery>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider  router={router}></RouterProvider>
  </React.StrictMode>,
)
