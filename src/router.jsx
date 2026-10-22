import { createBrowserRouter } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';

import { getRecipes, getRecipe } from './api/api';
import Loader from './components/Loader';

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <MainLayout />,
            errorElement: <NotFoundPage />,
            children: [
                { index: true, element: <HomePage />, loader: getRecipes },
                { path: 'recipes/:id', element: <RecipePage />, loader: getRecipe },
                { path: 'favorites', element: <FavoritesPage /> },
                { path: '*', element: <NotFoundPage /> }
            ]
        }
    ],
    {
        HydrateFallback: Loader
    }
);

export default router;