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
import React, {
    BaseSyntheticEvent,
    createRef,
    RefObject,
    useMemo,
    useState,
} from "react";
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

import { getPopulatedArticles } from "./UtilFiles/ContentComponentUtil";
import { SCROLL_LIMIT } from "../../type/OnThisDayCommonTypes";
import ScrollToTopButton from "@src/modules/features/Common/ScrollToTop/component/ScrollToTopButton";

const ContentContainer: React.FC = () => {
    // Constants
    // States
    const isLoading = useSelector(getIsLoading);
    const eventArticles = useSelector(getArticleSummaries);
    const activeTabs = useSelector(getActiveTabs);
    const [selectedTabIdx, setSelectedTabIdx] = useState(0);
    const [showTopButton, setShowTopButton] = useState(false);

    // Use Effects / Memos
    const containerTabs = useMemo(
        () => getPopulatedArticles(eventArticles, activeTabs),
        [eventArticles]
    );
    // Array of ref elements based on the container tabs active in screen
    const topAccordianElements: RefObject<HTMLDivElement>[] = containerTabs.map(
        () => createRef()
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

    const handleTabSwitch = (newIndex: number) => {
        setShowTopButton(false);
        setSelectedTabIdx(newIndex);
    };

    const handleReturnToTop = () => {
        // firstAccordianScroll.current?.scrollIntoView();
        topAccordianElements[selectedTabIdx].current?.scrollIntoView();
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
                            componentRef={topAccordianElements[index]}
                            key={`accordian-${index}`}
                        />
                    </Box>
                </TabPanel>
            );
        });

    const renderComponent = () => {
        return (
            <Box {...boxContainer}>
                <Tabs
                    isFitted
                    isLazy
                    variant={"enclosed-colored"}
                    onChange={(index) => handleTabSwitch(index)}
                >
                    <TabList overflowX={"scroll"} overflowY={"hidden"}>
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
