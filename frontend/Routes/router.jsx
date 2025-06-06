import { createBrowserRouter } from 'react-router-dom';
import App from '../src/App.jsx';
import NotFound from './../src/VIews/UI/NotFound';
import Login from '../src/VIews/Components/Login.jsx';
import SignUp from '../src/VIews/Components/SignUp.jsx';
import Settings from '../src/VIews/Components/Settings.jsx';
import Profile from '../src/VIews/Components/Profile.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound/>,
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
                element: <Profile/>,
            },
            {
                path: '/user/settings',
                element: <Settings/>,
            },
            {
                path: '/Admin',
                element: <div>Admin Page</div>,
            },
            {
                path: '/write',
                element: <div>Write Page</div>,
            },
        ]
    },
    {
        path: '/login',
        element: <Login/>,
    },
    {
        path: '/signup',
        element: <SignUp/>,
    },
]);

export default router;