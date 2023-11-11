import OnThisDayDashboard from "@modules/features/OnThisDay/component/Pages/OnThisDayDashboard";
// import App from "@src/App";
import ErrorPage from "@src/modules/features/Common/ErrorElements/component/ErrorElementPage";
import ReadListPage from "@src/modules/features/ReadList/component/pages/ReadListPage";
import { createBrowserRouter, RouteObject } from "react-router-dom";

// Component Imports

/* Routes String */
export enum RoutesList {
    ROOT = "/",
    SANDBOX = "/sandbox",
    ON_THIS_DAY = "/onThisDay",
    READ_LIST = "/readlist",
}

const routerMap: RouteObject[] = [
    {
        path: RoutesList.ROOT,
        element: <OnThisDayDashboard />,
        // element: <ReadListPage />,
        // element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: RoutesList.READ_LIST,
        element: <ReadListPage />,
        errorElement: <ErrorPage />,
    },
    // {
    //     path: RoutesList.SANDBOX,
    //     element: <App />,
    //     errorElement: <ErrorPage />,
    // },
];

const router = createBrowserRouter([...routerMap]);

export default router;
