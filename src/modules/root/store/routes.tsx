import OnThisDayDashboard from "@modules/features/OnThisDay/component/Pages/OnThisDayDashboard";
// import App from "@src/App";
import ErrorPage from "@src/modules/features/Common/ErrorElements/component/ErrorElementPage";
import LeaderboardPage from "@src/modules/features/Leaderboard/components/LeaderboardPage";
import ReadListPage from "@src/modules/features/ReadList/component/pages/ReadListPage";
import { createBrowserRouter, RouteObject } from "react-router-dom";

// Component Imports

/* Routes String */
export enum RoutesList {
    ROOT = "/",
    SANDBOX = "/sandbox",
    ON_THIS_DAY = "/onThisDay",
    READ_LIST = "/readlist",
    LEADER_BOARD = "/leaderboard",
}

const routerMap: RouteObject[] = [
    {
        path: RoutesList.ROOT,
        element: <OnThisDayDashboard />,
        errorElement: <ErrorPage />,
    },
    {
        path: RoutesList.READ_LIST,
        element: <ReadListPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: RoutesList.LEADER_BOARD,
        element: <LeaderboardPage />,
        errorElement: <ErrorPage />,
    },
];

const router = createBrowserRouter([...routerMap]);

export default router;
