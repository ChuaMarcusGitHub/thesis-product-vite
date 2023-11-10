import { Box, Button, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import React, { useEffect } from "react";
import classNames from "classnames/bind";
import {
    bannerContainer,
    bannerGrid,
    searchGridItem,
    sessionGridItem,
    sideBarItem,
    userStatsGridItem,
} from "./OnThisDayDashboardComponentProps";
import styles from "./OnThisDayDashboard.module.scss";
import ContentContainer from "../ContentComponent/ContentContainer";
import { useDispatch, useSelector } from "react-redux";
import { initializeOnThisDay } from "@features/OnThisDay/actions/OnThisDaySummaryActions";
import SearchComponent from "../ContentComponent/SearchComponent";
import SigninContainer from "@src/modules/features/Login/components/SignInContainer";
import ContentDetailModal from "../ContentComponent/ContentDetailModal";
import Sidebar from "@src/modules/features/Sidebar/components/Sidebar";
import useToastHook from "@src/modules/features/Toast/hook/useToastHook";
import { getToastData } from "@src/modules/features/Toast/selector/ToastSelector";
import { getIsLoggedIn } from "@src/modules/root/authprovider/selector/AuthSelector";
import { IUserStats } from "@src/modules/features/Login/types/LoginActionPayloadTypes";
import { getUserStats } from "@src/modules/features/Login/selector/LoginSelector";
import UserStatsContainer from "../ContentComponent/UserStatsContainer";

const cx = classNames.bind({ ...styles });

const OnThisDayDashboard: React.FC = () => {
    /* ---------- Constants --------- */
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Toast hook
    const [, newToast] = useToastHook();
    const toastError = useSelector(getToastData);

    /* ---------- Selectors --------- */
    const isLoggedIn: boolean = useSelector(getIsLoggedIn);
    const userData: IUserStats | null = useSelector(getUserStats);

    /* ---------- Effect Triggers --------- */
    useEffect(() => {
        dispatch(initializeOnThisDay());
    }, []);

    useEffect(() => {
        if (toastError) {
            newToast(toastError);
        }
    }, [toastError]);


    /* ---------- Render Methods--------- */
    const renderBanner = () => {
        return (
            <Box {...bannerContainer}>
                <Grid {...bannerGrid}>
                    {/* <GridItem colStart={5} colEnd={6} rowStart={1} rowEnd={2} bg={"black"}/> */}
                    <GridItem {...searchGridItem}>
                        {renderSearchComponent()}
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
            <Box>
                {renderBanner()}
                {renderContent()}
                <ContentDetailModal />
                <Sidebar isOpen={isOpen} onClose={onClose} />
            </Box>
        );
    };

    return renderComponent();
};

export default OnThisDayDashboard;
