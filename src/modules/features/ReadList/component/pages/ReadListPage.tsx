import {
    Box,
    Button,
    Stack,
    Grid,
    GridItem,
    Heading,
    useDisclosure,
} from "@chakra-ui/react";
import SigninContainer from "@src/modules/features/Login/components/SignInContainer";
import { getUserStats } from "@src/modules/features/Login/selector/LoginSelector";
import { IUserStats } from "@src/modules/features/Login/types/LoginActionPayloadTypes";
import ContentDetailModal from "@src/modules/features/OnThisDay/component/ContentComponent/ContentDetailModal";
import UserStatsContainer from "@src/modules/features/OnThisDay/component/ContentComponent/UserStatsContainer";
import {
    sessionGridItem,
    sideBarItem,
    userStatsGridItem,
} from "@src/modules/features/OnThisDay/component/Pages/OnThisDayDashboardComponentProps";
import Sidebar from "@src/modules/features/Sidebar/components/Sidebar";
import { getIsLoggedIn } from "@src/modules/root/authprovider/selector/AuthSelector";
import { useSelector } from "react-redux";
import ReadListContainer from "../ReadListContainer";

import {
    bannerContainer,
    readListPageContainer,
    bannerGrid,
    readListContainerWrapper,
    titleGrid,
} from "./ReadListpageProps";

const ReadListPage: React.FC = () => {
    /* ---------- Constants --------- */
    const { isOpen, onOpen, onClose } = useDisclosure();
    /* ---------- Selectors --------- */
    const isLoggedIn: boolean = useSelector(getIsLoggedIn);
    const userData: IUserStats | null = useSelector(getUserStats);

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
                <GridItem></GridItem>
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
        <Box {...readListContainerWrapper}>
            <ReadListContainer placeholder={""} />
        </Box>
    );
    const renderComponent = () => (
        <Box {...readListPageContainer}>
            <Stack gap={4}>
                {renderBannerContainer()}
                {renderReadlistContainer()}
            </Stack>
            <ContentDetailModal />
            <Sidebar isOpen={isOpen} onClose={onClose} />
        </Box>
    );
    return renderComponent();
};

export default ReadListPage;
