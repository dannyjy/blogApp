import { createBrowserRouter } from 'react-router-dom';
import App from '../src/App.jsx';
import NotFound from './../src/VIews/UI/NotFound';
import Comment from '../src/VIews/UI/Comment.jsx';
import Login from '../src/VIews/Components/Auth/Login.jsx';
import SignUp from '../src/VIews/Components/Auth/SignUp.jsx';
import AllPosts from '../src/VIews/Components/AllPosts.jsx';
import UserProfile from '../src/VIews/Components/UserProfile.jsx';
import AllUserPost from '../src/VIews/Components/User Section/AllUserPost.jsx';
import UserAccout from '../src/VIews/Components/User Section/UserAccount.jsx';
import AllUserComments from './../src/VIews/Components/User Section/AllUserComments';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound/>,
        children: [
            {
                path: '/',
                element: <AllPosts/>,
            },
            {
                path: '/user',
                element: <div>User Page</div>,
            },
            {
                path: '/user/profile',
                element: <UserProfile/>,
                children: [
                    {
                        path: '/user/profile',
                        element: <UserAccout/>,
                    },
                    {
                        path: '/user/profile/all-comments',
                        element: <AllUserComments/>,
                    },
                    {
                        path: '/user/profile/all-posts',
                        element: <AllUserPost/>,
                    }
                ]
            },
            {
                path: '/Admin',
                element: <div>Admin Page</div>,
            },
            {
                path: '/write',
                element: <div>Write Page</div>,
            },
            {
                path: '/comment/:id',
                element: <Comment />
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