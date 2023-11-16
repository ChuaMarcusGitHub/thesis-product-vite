import { RoutesList } from "@src/modules/root/store/routes";
import { INavigationItem } from "../types/SidebarTypes";

export const getSidebarNavitems = (): INavigationItem[] => {
    return [
        { text: "Home", linkTo: RoutesList.ROOT },
        { text: "Read list", linkTo: RoutesList.READ_LIST },
        { text: "Leaderboard", linkTo: RoutesList.LEADER_BOARD },
    ];
};
