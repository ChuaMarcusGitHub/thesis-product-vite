import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Stack,
    Box,
    StackDivider,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { INavigationItem } from "../types/SidebarTypes";
import { getSidebarNavitems } from "../utils/SidebarComponentUtils";
import CreditsFooter from "./CreditsFooter";

export interface ISidebarProps {
    isOpen: boolean;
    onClose: () => void;
}
const Sidebar: React.FC<ISidebarProps> = ({
    isOpen = false,
    onClose = () => console.warn("onClosed method not defined!"),
}) => {
    const [sideBarNavItems] = useState<INavigationItem[]>(getSidebarNavitems());

    const renderNavigationItems = () => {
        return sideBarNavItems.map((navItem, index) => {
            return (
                <Box display={"flex"} key={`nav-item-${index}`}>
                    <Link to={navItem.linkTo}>{navItem.text}</Link>
                </Box>
            );
        });
    };
    const renderComponent = () => (
        <Drawer isOpen={isOpen} placement={"left"} onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Navigation Menu</DrawerHeader>

                <DrawerBody>
                    <Stack divider={<StackDivider />}>
                        {renderNavigationItems()}
                    </Stack>
                </DrawerBody>
                <CreditsFooter />
            </DrawerContent>
        </Drawer>
    );
    return renderComponent();
};

export default Sidebar;
