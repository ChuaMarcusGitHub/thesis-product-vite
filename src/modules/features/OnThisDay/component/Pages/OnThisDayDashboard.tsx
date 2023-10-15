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

const cx = classNames.bind({ ...styles });

const OnThisDayDashboard: React.FC = () => {
    /* ---------- Constants --------- */
    const dispatch = useDispatch();

    /* ---------- States --------- */

    /* ---------- Effect Triggers --------- */
    useEffect(() => {
        dispatch(initializeOnThisDay());
    },[]);
    
    /* ---------- Render Methods--------- */
    const renderBanner = () => {
        return (
            <Box {...bannerContainer}>
                <Grid {...bannerGrid}>
                    <GridItem {...searchGridItem}>
                        Search Bar goes here
                    </GridItem>
                    <GridItem {...sessionGridItem}>
                        Login/ Logout Item Goes here
                    </GridItem>
                </Grid>
            </Box>
        );
    };

    const renderSearchComponent = () => {
        return <div> Search Component</div>;
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
