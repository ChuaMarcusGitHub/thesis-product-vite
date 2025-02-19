import {
    useDisclosure,
    Box,
    Grid,
    GridItem,
    Heading,
    Stack,
    StackDivider,
} from "@chakra-ui/react";
import { getIsLoggedIn } from "@src/modules/root/authprovider/selector/AuthSelector";
import React, { BaseSyntheticEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ColourModeSwitch from "@features/Common/ColorMode/component/ColourModeSwitch";
import ScrollToTopButton from "@features/Common/ScrollToTop/component/ScrollToTopButton";
import SigninContainer from "@features/Login/components/SignInContainer";
import { IUserStats } from "@features/Login/types/LoginActionPayloadTypes";
import ContentDetailModal from "@features/OnThisDay/component/ContentComponent/ContentDetailModal";
import {
    sessionGridItem,
    colourModeGridItem,
} from "@features/OnThisDay/component/Pages/OnThisDayDashboardComponentProps";
import { SCROLL_LIMIT } from "@features/OnThisDay/type/OnThisDayCommonTypes";
import Sidebar from "@features/Sidebar/components/Sidebar";
import { getUserStats } from "@features/Login/selector/LoginSelector";
import LeaderboardContainer from "./LeaderboardContainer";
import {
    leaderboardContainerWrapper,
    titleGrid,
    leaderboardPageContainer,
    bannerContainer,
    bannerGrid,
    userStatsGridItem,
} from "./LeaderboardPageStyleProps";
import { getIsMobileDevice } from "@features/Common/Utils/UtilsMethods";
import { renderSideBarComponent } from "@features/Sidebar/components/WrappedSidebar";
import UserStatsContainer from "@features/OnThisDay/component/ContentComponent/UserStatsContainer";

const LeaderboardPage: React.FC = () => {
    /* ---------- Constants --------- */
    const [showTopButton, setShowTopButton] = useState(false);
    const topItemElement = useRef<HTMLSpanElement>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isMobileDevice = getIsMobileDevice();
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
                    <Heading>Leaderboards</Heading>
                </GridItem>
                <GridItem {...sessionGridItem}>
                    <SigninContainer
                        isLoggedIn={isLoggedIn}
                        userData={userData}
                    />
                </GridItem>
                <GridItem {...colourModeGridItem}>
                    <ColourModeSwitch isMobile={isMobileDevice} />
                </GridItem>
                {renderSideBarComponent(onOpen)}
                {isLoggedIn && (
                    <GridItem {...userStatsGridItem}>
                        <UserStatsContainer userData={userData} />
                    </GridItem>
                )}
            </Grid>
        </Box>
    );
    const renderLeaderboardContainer = () => (
        <Box
            {...leaderboardContainerWrapper}
            onScroll={handleContainerScroll}
            display={"flex"}
            justifyContent={"center"}
            padding={["10px", "10px", "20px"]}
        >
            <span ref={topItemElement} />
            <LeaderboardContainer />
        </Box>
    );
    const renderComponent = () => (
        <Box {...leaderboardPageContainer}>
            <Stack gap={1} divider={<StackDivider />}>
                {renderBannerContainer()}
                {renderLeaderboardContainer()}
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

export default LeaderboardPage;
