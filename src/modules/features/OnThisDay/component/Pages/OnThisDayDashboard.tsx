import {
    Box,
    Button,
    Grid,
    GridItem,
    Stack,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import classNames from "classnames/bind";
import {
    bannerContainer,
    bannerGrid,
    searchGridItem,
    sessionGridItem,
    sideBarItem,
    userStatsGridItem,
    colourModeGridItem,
    pageContainer,
    searchComponentItem,
} from "./OnThisDayDashboardComponentProps";
import styles from "./OnThisDayDashboard.module.scss";
import ContentContainer from "../ContentComponent/ContentContainer";
import { useDispatch, useSelector } from "react-redux";
import { initializeOnThisDay } from "@features/OnThisDay/actions/OnThisDaySummaryActions";
import SearchComponent from "../ContentComponent/SearchComponent";
import SigninContainer from "@src/modules/features/Login/components/SignInContainer";
import ContentDetailModal from "../ContentComponent/ContentDetailModal";
import Sidebar from "@src/modules/features/Sidebar/components/Sidebar";
import { getIsLoggedIn } from "@src/modules/root/authprovider/selector/AuthSelector";
import { IUserStats } from "@src/modules/features/Login/types/LoginActionPayloadTypes";
import { getUserStats } from "@src/modules/features/Login/selector/LoginSelector";
import UserStatsContainer from "../ContentComponent/UserStatsContainer";
import ColourModeSwitch from "@src/modules/features/Common/ColorMode/component/ColourModeSwitch";
import ThesisNotice from "@src/modules/features/Common/Notice/ThesisNotice";
import { updateNoticeRequired } from "@src/modules/features/Config/actions/ConfigActions";
import { getNoticeRequired } from "@src/modules/features/Config/selector/ConfigSelector";
// import { LOCAL_STORAGE_KEYS } from "@src/modules/features/Common/types/LocalStorageTypes";

const cx = classNames.bind({ ...styles });

const OnThisDayDashboard: React.FC = () => {
    /* ---------- Constants --------- */
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: noticeIsOpen,
        onOpen: noticeOnOpen,
        onClose: noticeOnClose,
    } = useDisclosure();

    /* ---------- Selectors --------- */
    const isLoggedIn: boolean = useSelector(getIsLoggedIn);
    const userData: IUserStats | null = useSelector(getUserStats);
    const noticeRequired: boolean = useSelector(getNoticeRequired);

    /* ---------- Effect Triggers --------- */
    useEffect(() => {
        dispatch(initializeOnThisDay());
        // localStorage.removeItem(LOCAL_STORAGE_KEYS.noticeRequired)
    }, []);

    useEffect(() => {
        if (noticeRequired) noticeOnOpen();
    }, [noticeRequired]);

    const handleNoticeClose = () => {
        dispatch(updateNoticeRequired(false));
        noticeOnClose();
    };

    /* ---------- Render Methods--------- */
    const renderBanner = () => {
        return (
            <Box {...bannerContainer}>
                <Grid {...bannerGrid} gap={1}>
                    <GridItem {...searchGridItem} {...searchComponentItem}>
                        {renderSearchComponent()}
                    </GridItem>
                    <GridItem {...sessionGridItem} border={"1px solid blue"}>
                        <SigninContainer
                            isLoggedIn={isLoggedIn}
                            userData={userData}
                        />
                    </GridItem>
                    <GridItem {...colourModeGridItem}>
                        <ColourModeSwitch />
                    </GridItem>
                    <GridItem {...sideBarItem} border={"1px solid blue"}>
                        <Button onClick={() => onOpen()}> Side Menu</Button>
                    </GridItem>
                    {isLoggedIn && (
                        <GridItem
                            {...userStatsGridItem}
                            border={"1px solid blue"}
                        >
                            <UserStatsContainer userData={userData} />
                        </GridItem>
                    )}
                </Grid>
            </Box>
        );
    };

    const renderSearchComponent = () => {
        return <SearchComponent />;
    };

    const renderContent = () => {
        return (
            <div className={cx("content-container")}>
                <ContentContainer />
            </div>
        );
    };
    const renderComponent = () => {
        return (
            <Box {...pageContainer}>
                <Stack gap={3}>
                    {renderBanner()}
                    {renderContent()}
                </Stack>

                <ContentDetailModal />
                <ThesisNotice
                    isOpen={noticeIsOpen}
                    onClose={handleNoticeClose}
                />
                <Sidebar isOpen={isOpen} onClose={onClose} />
            </Box>
        );
    };

    return renderComponent();
};

export default OnThisDayDashboard;
