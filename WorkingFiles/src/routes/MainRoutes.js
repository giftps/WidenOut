import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PrivateRouter from 'customRouter/PrivateRouter';
import PageRender from 'customRouter/PageRender';

// Feeds routing;
const Feeds = Loadable(lazy(() => import('views/dashboard/Default')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/feeds',
            element: (
                <PrivateRouter>
                    <Feeds />
                </PrivateRouter>
            )
        },
        {
            path: '/:page',
            element: (
                <PrivateRouter>
                    <PageRender />
                </PrivateRouter>
            )
        },
        {
            path: '/:page/:id',
            element: (
                <PrivateRouter>
                    <PageRender />
                </PrivateRouter>
            )
        }
    ]
};

export default MainRoutes;
