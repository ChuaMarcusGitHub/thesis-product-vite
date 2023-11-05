import { Box, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect } from "react";
import classNames from "classnames/bind";
import {
    bannerContainer,
    bannerGrid,
    searchGridItem,
    sessionGridItem,
} from "./OnThisDayDashboardComponentProps";
import styles from "./OnThisDayDashboard.module.scss";
import ContentContainer from "../ContentComponent/ContentContainer";
import { useDispatch } from "react-redux";
import { initializeOnThisDay } from "@features/OnThisDay/actions/OnThisDaySummaryActions";
import SearchComponent from "../ContentComponent/SearchComponent";
import SigninContainer from "@src/modules/features/Login/components/SignInContainer";
import { RoutesList } from "@src/modules/root/store/routes";

const cx = classNames.bind({ ...styles });

const OnThisDayDashboard: React.FC = () => {
    /* ---------- Constants --------- */
    const dispatch = useDispatch();

    /* ---------- States --------- */

    /* ---------- Effect Triggers --------- */
    useEffect(() => {
        dispatch(initializeOnThisDay());
    }, []);

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
                        <SigninContainer />
                    </GridItem>
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
            </Box>
        );
    };

    return renderComponent();
};

export default OnThisDayDashboard;
