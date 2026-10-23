import { createBrowserRouter } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import FavoritesPage from './pages/FavoritesPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';

import {  } from './api/api';
import Loader from './components/Loader';

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <MainLayout />,
            errorElement: <NotFoundPage />,
            children: [
                { index: true, element: <HomePage />, loader: Loader },
                { path: '/:id', element: <ProductPage />, loader: Loader },
                { path: 'cart', element: <CartPage />, loader: getRecipe },
                { path: 'favorites', element: <FavoritesPage /> },
                { path: '*', element: <NotFoundPage /> }
            ]
        }
    ]
);

export default router;