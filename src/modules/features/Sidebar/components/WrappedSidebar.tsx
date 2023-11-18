import { HamburgerIcon } from "@chakra-ui/icons";
import { Button, HStack, GridItem, Text } from "@chakra-ui/react";
import {
    sideBarItem,
    mobileSideBarItem,
} from "@features/OnThisDay/component/Pages/OnThisDayDashboardComponentProps";
import { getIsMobileDevice } from "@features/Common/Utils/UtilsMethods";

const isMobileDevice = getIsMobileDevice();

export const renderSideBarContent = (onOpen: () => void) => (
    <Button onClick={() => onOpen()}>
        <HStack gap={2}>
            <HamburgerIcon />
            <Text>Side Menu</Text>
        </HStack>
    </Button>
);
export const renderWebSideBar = (onOpen: () => void) => (
    <GridItem {...sideBarItem}>{renderSideBarContent(onOpen)}</GridItem>
);

export const renderMobileSideBar = (onOpen: () => void) => (
    <GridItem {...mobileSideBarItem}>{renderSideBarContent(onOpen)}</GridItem>
);

export const renderSideBarComponent = (onOpen: () => void) => {
    return isMobileDevice
        ? renderMobileSideBar(onOpen)
        : renderWebSideBar(onOpen);
};
