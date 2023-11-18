import {
    Box,
    Button,
    Stack,
    Grid,
    GridItem,
    Heading,
    useDisclosure,
    StackDivider,
} from "@chakra-ui/react";
import ColourModeSwitch from "@src/modules/features/Common/ColorMode/component/ColourModeSwitch";
import ScrollToTopButton from "@src/modules/features/Common/ScrollToTop/component/ScrollToTopButton";
import SigninContainer from "@src/modules/features/Login/components/SignInContainer";
import { getUserStats } from "@src/modules/features/Login/selector/LoginSelector";
import { IUserStats } from "@src/modules/features/Login/types/LoginActionPayloadTypes";
import ContentDetailModal from "@src/modules/features/OnThisDay/component/ContentComponent/ContentDetailModal";
import UserStatsContainer from "@src/modules/features/OnThisDay/component/ContentComponent/UserStatsContainer";
import {
    colourModeGridItem,
    sessionGridItem,
    sideBarItem,
} from "@src/modules/features/OnThisDay/component/Pages/OnThisDayDashboardComponentProps";
import { SCROLL_LIMIT } from "@src/modules/features/onThisDay/type/OnThisDayCommonTypes";
import Sidebar from "@src/modules/features/Sidebar/components/Sidebar";
import { getIsLoggedIn } from "@src/modules/root/authprovider/selector/AuthSelector";
import { BaseSyntheticEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ReadListContainer from "../ReadListContainer";

import {
    bannerContainer,
    readListPageContainer,
    bannerGrid,
    readListContainerWrapper,
    titleGrid,
    userStatsGridItem,
} from "./ReadListpageProps";

const ReadListPage: React.FC = () => {
    /* ---------- Constants --------- */
    const [showTopButton, setShowTopButton] = useState(false);
    const topItemElement = useRef<HTMLSpanElement>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    /* ---------- Selectors --------- */
    const isLoggedIn: boolean = useSelector(getIsLoggedIn);
    const userData: IUserStats | null = useSelector(getUserStats);

    // Handler Methods
    const handleContainerScroll = (e: BaseSyntheticEvent) => {
        const { scrollTop, scrollHeight, offsetHeight } = e.target;
        const scrollProgess = (scrollTop / (scrollHeight - offsetHeight)) * 100;
        setShowTopButton(scrollProgess > SCROLL_LIMIT);
    };

    const handleReturnToTop = () => {
        topItemElement.current?.scrollIntoView();
        setShowTopButton(false);
    };

    // Render Methods
    const renderBannerContainer = () => (
        <Box {...bannerContainer}>
            <Grid {...bannerGrid}>
                <GridItem {...titleGrid}>
                    <Heading>Reading List</Heading>
                </GridItem>
                <GridItem {...sessionGridItem}>
                    <SigninContainer
                        isLoggedIn={isLoggedIn}
                        userData={userData}
                    />
                </GridItem>
                <GridItem {...colourModeGridItem}>
                    <ColourModeSwitch />
                </GridItem>
                <GridItem {...sideBarItem}>
                    <Button onClick={() => onOpen()}> Side Menu</Button>
                </GridItem>
                {isLoggedIn && (
                    <GridItem {...userStatsGridItem}>
                        <UserStatsContainer userData={userData} />
                    </GridItem>
                )}
            </Grid>
        </Box>
    );
    const renderReadlistContainer = () => (
        <Box {...readListContainerWrapper} onScroll={handleContainerScroll}>
            <span ref={topItemElement} />
            <ReadListContainer />
        </Box>
    );
    const renderComponent = () => (
        <Box {...readListPageContainer}>
            <Stack gap={1} divider={<StackDivider />}>
                {renderBannerContainer()}
                {renderReadlistContainer()}
            </Stack>
            <ContentDetailModal />
            <Sidebar isOpen={isOpen} onClose={onClose} />
            <ScrollToTopButton
                triggerVisible={showTopButton}
                handleClick={handleReturnToTop}
            />
        </Box>
    );
    return renderComponent();
};

export default ReadListPage;
