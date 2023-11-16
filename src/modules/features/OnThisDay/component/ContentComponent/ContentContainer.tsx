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
import React, { BaseSyntheticEvent, useMemo, useRef, useState } from "react";
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
import { SCROLL_LIMIT } from "../../type/OnThisDayCommonTypes";
import ScrollToTopButton from "@src/modules/features/Common/ScrollToTop/component/ScrollToTopButton";
// import { IOtdFeedObject } from "@features/OnThisDay/type/OnThisDayCommonTypes";
// const sampleData = JSON.parse(JSON.stringify(data));

const ContentContainer: React.FC = () => {
    // Constants
    // States
    const isLoading = useSelector(getIsLoading);
    const eventArticles = useSelector(getArticleSummaries);
    const activeTabs = useSelector(getActiveTabs);
    const [showTopButton, setShowTopButton] = useState(false);
    const firstAccordianScroll = useRef<HTMLDivElement>(null);

    // Use Effects / Memos
    const containerTabs = useMemo(
        () => getPopulatedArticles(eventArticles, activeTabs),
        [eventArticles]
    );

    const isLoaded = useMemo(
        () => !isLoading && containerTabs.length,
        [isLoading, containerTabs]
    );

    // Component methods
    const handleScroll = (e: BaseSyntheticEvent) => {
        const { scrollTop, scrollHeight, offsetHeight } = e.target;
        const scrollProgess = (scrollTop / (scrollHeight - offsetHeight)) * 100;
        setShowTopButton(scrollProgess > SCROLL_LIMIT);
    };

    const handleReturnToTop = () => {
        firstAccordianScroll.current?.scrollIntoView();
        setShowTopButton(false);
    };

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
        containerTabs.map((eventType, index) => {
            return (
                <TabPanel key={`${eventType}-tab-panel`}>
                    <Box
                        {...contentBoxContainer}
                        onScroll={(e) => handleScroll(e)}
                    >
                        <YearAccordian
                            typeEvents={eventArticles[eventType]}
                            componentRef={
                                index === 0 ? firstAccordianScroll : null
                            }
                            key={`accordian-${index}`}
                        />
                    </Box>
                </TabPanel>
            );
        });

    const renderComponent = () => {
        return (
            <Box {...boxContainer}>
                <Tabs isFitted isLazy variant={"enclosed-colored"}>
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
                <ScrollToTopButton
                    triggerVisible={showTopButton}
                    handleClick={handleReturnToTop}
                />
            </Box>
        );
    };

    return renderComponent();
};

export default ContentContainer;
