import {
    Box,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Skeleton,
    Text,
    Fade,
    Spinner,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
    boxContainer,
    skeletonTab,
    headerTab,
    loadingSpinner,
    skeletonBoxContainer,
    contentBoxContainer,
} from "./ContentContainerProps";
import YearAccordian from "./YearAccordian";
import { useSelector } from "react-redux";
import {
    getActiveTabs,
    getArticleSummaries,
    getIsLoading,
} from "@features/OnThisDay/selector/OnThisDaySummarySelector";

// import data from "@rsc/sampleResponse/referenceFeedState.json";
import { getPopulatedArticles } from "./UtilFiles/ContentComponentUtil";
// import { IOtdFeedObject } from "@features/OnThisDay/type/OnThisDayCommonTypes";
// const sampleData = JSON.parse(JSON.stringify(data));

const ContentContainer: React.FC = () => {
    // Constants
    // States
    const isLoading = useSelector(getIsLoading);
    const eventArticles = useSelector(getArticleSummaries);
    const activeTabs = useSelector(getActiveTabs);

    // Use Effects / Memos
    const containerTabs = useMemo(
        () => getPopulatedArticles(eventArticles, activeTabs),
        [eventArticles]
    );

    const isLoaded = useMemo(
        () => !isLoading && containerTabs.length,
        [isLoading, containerTabs]
    );

    // Render Methods
    const renderTabs = () =>
        containerTabs?.map((tabName, index) => (
            <Fade in={!isLoading} key={`${tabName}-${index}`}>
                <Tab {...headerTab} key={`${tabName}-${index}`}>
                    <Text>{tabName}</Text>
                </Tab>
            </Fade>
        ));

    const renderContentSkeleton = () => {
        return (
            <TabPanel>
                <Box {...skeletonBoxContainer}>
                    <div
                        style={{
                            alignItems: "center",
                            textAlign: "center",
                        }}
                    >
                        <Spinner
                            {...loadingSpinner}
                            alignSelf={"center"}
                            label={"Fetching Data...."}
                        />
                        <Text>Fetching Data...</Text>
                    </div>
                </Box>
            </TabPanel>
        );
    };
    const renderTabContainers = () =>
        containerTabs.map((eventType) => {
            return (
                <TabPanel key={`${eventType}-tab-panel`}>
                    <Box {...contentBoxContainer}>
                        <YearAccordian typeEvents={eventArticles[eventType]} />
                    </Box>
                </TabPanel>
            );
        });

    const renderComponent = () => {
        return (
            <Box {...boxContainer}>
                <Tabs isLazy>
                    <TabList>
                        {isLoaded ? (
                            renderTabs()
                        ) : (
                            <Tab>
                                <Skeleton {...skeletonTab} />
                            </Tab>
                        )}
                    </TabList>

                    <TabPanels>
                        {isLoaded
                            ? renderTabContainers()
                            : renderContentSkeleton()}
                    </TabPanels>
                </Tabs>
            </Box>
        );
    };

    return renderComponent();
};

export default ContentContainer;
