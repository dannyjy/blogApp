import { createBrowserRouter } from 'react-router-dom';
import App from '../src/App.jsx';
import NotFound from './../src/VIews/Components/NotFound';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/',
                element: <div>Home Page</div>,
            },
            {
                path: '/user',
                element: <div>User Page</div>,
            },
            {
                path: '/user/profile',
                element: <div>Profile Page</div>,
            },
            {
                path: '/user/settings',
                element: <div>Settings Page</div>,
            },
            {
                path: '/Admin',
                element: <div>Services Page</div>,
            },
            {
                path: '/blog',
                element: <div>Blog Page</div>,
            },
        ]
    },
    {
        path: '/login',
        element: <div>Login Page</div>,
    },
    {
        path: '/signup',
        element: <div>Sign Up Page</div>,
    },
]);

export default router;