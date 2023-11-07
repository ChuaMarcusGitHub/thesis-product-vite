import {
    Routes,
    Route,
    Navigate,
    useLocation,
} from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import Dashboard from "@modules/features/Dashboard/components/Dashboard";
import OnThisDayDashboard from "@modules/features/OnThisDay/component/Pages/OnThisDayDashboard";
import { routesListSelector } from "../history/routeReducer";
import { setRoute } from "../history/routeActions";
import { useEffect } from "react";
import App from "@src/App";

// Component Imports

/* Routes String */
export enum RoutesList {
    ROOT = "/",
    DASHBOARD = "/dashboard",
    SANDBOX = "/sandbox",
    ON_THIS_DAY = "/onThisDay",
    DEFAULT_DASHBOARD = "*",
}

const RouterMap = [
    { path: RoutesList.ROOT, component: <OnThisDayDashboard /> },
    // { path: RoutesList.ROOT, component: <App /> },
    // { path: RoutesList.SANDBOX, component: <App /> },
    { path: RoutesList.DASHBOARD, component: <Dashboard /> },
    { path: RoutesList.ON_THIS_DAY, component: <OnThisDayDashboard /> },
    {
        path: RoutesList.DEFAULT_DASHBOARD,
        component: <Navigate to={RoutesList.ON_THIS_DAY} />,
    },
];

const Routing = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const routeList = useSelector(routesListSelector);

    const knownLocation = Object.keys(RoutesList)
        .map((key) => RoutesList[key as keyof typeof RoutesList])
        .toString();
    useEffect(() => {
        const path = location.pathname;
        const finalPath = knownLocation.includes(path)
            ? path
            : RoutesList.DASHBOARD;

        if (
            routeList[routeList.length - 1] &&
            routeList[routeList.length - 1] === finalPath
        )
            return;
        else dispatch(setRoute(finalPath));
    }, [dispatch, knownLocation, location, routeList]);

    return (
        <Routes>
            {RouterMap.map((route) => {
                return (
                    <Route
                        key={`route-${route.path}`}
                        path={route.path}
                        element={route.component}
                    />
                );
            })}
        </Routes>
    );
};

export default Routing;
