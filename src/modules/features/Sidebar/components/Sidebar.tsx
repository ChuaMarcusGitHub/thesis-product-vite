import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Stack,
    Text,
    Box,
    Button,
    StackDivider,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { INavigationItem } from "../types/SidebarTypes";
import { getSidebarNavitems } from "../utils/SidebarComponentUtils";

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
                    <Button width={"100%"}>
                        <Link to={navItem.linkTo}>{navItem.text}</Link>
                    </Button>
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
            </DrawerContent>
        </Drawer>
    );
    return renderComponent();
};

export default Sidebar;
