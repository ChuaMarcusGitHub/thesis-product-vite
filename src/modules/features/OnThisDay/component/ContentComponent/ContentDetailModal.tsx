import {
    Button,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Progress,
    Box,
    Text,
    Icon,
    Fade,
    SkeletonText,
    Stack,
} from "@chakra-ui/react";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getModalData,
    getModalOpen,
    getSelectedBriefArticle,
    getSelectedDetailedArticle,
} from "@modules/features/OnThisDay/selector/OnThisDaySummarySelector";
import ModalTabFullContent from "./ModalTabFullContent";
import HTMLReactParser from "html-react-parser";
import {
    ARTICLE_TYPE,
    IArticleBriefObject,
    IArticleDetailedPayload,
    IOtdCardPageData,
} from "@features/onThisDay/type/OnThisDayCommonTypes";
import "html-react-parser";
import {
    // clearDetailedArticle,
    loadBriefArticle,
    loadDetailedArticle,
} from "@features/onThisDay/actions/OnThisDaySummaryActions";
import {
    buttonStack,
    modalContent,
    progressBar,
} from "./ContentDetailModalStyleProps";

import styles from "./ContentDetailModal.module.scss";
import classNames from "classnames/bind";
import { MdArticle } from "react-icons/md";
import { transformToAnalyticsModalPayload } from "./UtilFiles/ContentComponentUtil";
import { analyticsInsertModalData } from "@src/modules/features/Common/Analytics/actions/AnalyticsActions";
import { getIsMobileDevice } from "@src/modules/features/Common/Utils/UtilsMethods";

const cx = classNames.bind({ ...styles });
export interface IContentDetailModalProps {
    pageData: IOtdCardPageData | null;
    onClose: () => void;
    articleType: ARTICLE_TYPE;
}
// eslint-disable-next-line react-refresh/only-export-components
export const defaultModalProps: IContentDetailModalProps = {
    pageData: null,
    articleType: ARTICLE_TYPE.INACTIVE,
    onClose: () => console.warn("onClose not defined!"),
};

const ContentDetailModal: React.FC = () => {
    // Selector
    const { pageData, onClose, articleType }: IContentDetailModalProps =
        useSelector(getModalData);

    // Constants
    const dispatch = useDispatch();
    const bodyRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const timerIdRef = useRef<NodeJS.Timeout | null>(null);
    const isMobileDevice = getIsMobileDevice();

    // States
    const [isDetailedArticle, setIsDetailedArticle] = useState(false);
    const [progressPercent, setProgressPercent] = useState(0.0);
    const detailedArticle: IArticleDetailedPayload | null = useSelector(
        getSelectedDetailedArticle
    );
    const isModalOpen = useSelector(getModalOpen);

    const briefArticle: IArticleBriefObject | null = useSelector(
        getSelectedBriefArticle
    );
    const isLoaded = useMemo(() => {
        return isDetailedArticle ? !!detailedArticle : !!briefArticle;
    }, [isDetailedArticle, detailedArticle, briefArticle]);

    // Analytics stats
    const [tabOpenTime, setTabOpenTime] = useState<Date | null>(null); // Used to track the time which the rendering tab was open.
    const [lastKnownType, setLastKnownType] = useState<ARTICLE_TYPE>(
        ARTICLE_TYPE.INACTIVE
    );

    const handleRefresh = () => {
        handleClose();
        window.removeEventListener("beforeunload", handleRefresh);
    };

    window.addEventListener("beforeunload", handleRefresh);

    // Use Effects
    useEffect(() => {
        console.log(`Window InnerWidth: ${window.outerWidth}`);
        //unmount effect (scenario when user clicks and navigates away from website)
        return () => {
            handleClose();
            if (timerIdRef.current) clearTimeout(timerIdRef.current);
        };
    }, []);

    useEffect(() => {
        let isTabDataActive = false;
        if (articleType === ARTICLE_TYPE.BRIEF)
            isTabDataActive = !!briefArticle;
        else isTabDataActive = !!detailedArticle;

        if (isTabDataActive) {
            console.log("Data loaded, setting time");
            timerIdRef.current = setTimeout(() => {
                if (isModalOpen) setTabOpenTime(new Date());
            }, 500);
            setLastKnownType(articleType);
        }
        if (progressPercent > 0) setProgressPercent(0);
    }, [isModalOpen, isLoaded]);

    // Component Methods
    const trackScroll = () => {
        if (bodyRef.current) {
            // Progress Completition  = scrollTop / (scrollHeight - offsetHeight) * 100%
            const {
                scrollTop = 0,
                scrollHeight = 0,
                offsetHeight = 0,
            } = bodyRef.current;
            const newProgressValue =
                (scrollTop / (scrollHeight - offsetHeight)) * 100;
            setProgressPercent(newProgressValue);
        }
    };

    const handleReadingModeSwitch = () => {
        if (!isDetailedArticle) {
            if (!detailedArticle) {
                dispatch(
                    loadDetailedArticle({
                        title: pageData!.title,
                        shouldClear: false,
                    })
                );
            } else if (
                detailedArticle &&
                detailedArticle.pageId !== briefArticle?.pageId
            ) {
                // If previous article already exist but not the same we clear
                dispatch(
                    loadDetailedArticle({
                        title: pageData!.title,
                        shouldClear: true,
                    })
                );
            }
        } else {
            if (!briefArticle) dispatch(loadBriefArticle(pageData!.title));
        }
        setProgressPercent(0);
        const newIsDetailedFlag = !isDetailedArticle;
        setIsDetailedArticle(newIsDetailedFlag);
        console.log(
            `new ArticleType: ${
                newIsDetailedFlag ? ARTICLE_TYPE.DETAILED : ARTICLE_TYPE.BRIEF
            }`
        );
        setLastKnownType(
            newIsDetailedFlag ? ARTICLE_TYPE.DETAILED : ARTICLE_TYPE.BRIEF
        );
    };

    const handleClose = () => {
        // If there is data to be tracked track said data.
        if (tabOpenTime && lastKnownType !== ARTICLE_TYPE.INACTIVE) {
            const modalAnalytics = transformToAnalyticsModalPayload(
                pageData,
                tabOpenTime,
                lastKnownType
            );
            dispatch(analyticsInsertModalData(modalAnalytics));
            // Reset Analytics
            setTabOpenTime(null);
        }
        setIsDetailedArticle(false);
        setProgressPercent(0);
        setLastKnownType(ARTICLE_TYPE.INACTIVE);
        onClose();
    };

    const renderBriefContent = () => (
        <div className={cx("parse-content-container")}>
            {HTMLReactParser(briefArticle?.extract || "")}
        </div>
    );

    const renderDetailedContent = () => (
        <ModalTabFullContent
            htmldoc={detailedArticle?.detailedArticle as TrustedHTML}
            pageId={detailedArticle?.pageId}
        />
    );

    const renderButtonStack = () => (
        <>
            <Button onClick={handleReadingModeSwitch}>
                <HStack gap={3}>
                    <Text>
                        {`Change to: ${
                            isDetailedArticle ? "Summarized" : "Detailed"
                        }`}
                    </Text>
                    <Icon as={MdArticle} />
                </HStack>
            </Button>
            <Button onClick={handleClose}>Close Article! (Esc)</Button>
        </>
    );

    const renderWebFooter = (children: React.ReactNode) => (
        <HStack {...buttonStack}>{children}</HStack>
    );
    const renderMobileFooter = (children: React.ReactNode) => (
        <Stack {...buttonStack}>{children} </Stack>
    );

    const renderModalFooter = () => (
        <ModalFooter flexDirection={isMobileDevice ? "column" : "row"}>
            {isMobileDevice
                ? renderMobileFooter(renderButtonStack())
                : renderWebFooter(renderButtonStack())}
        </ModalFooter>
    );

    const renderComponent = () => {
        return (
            <Modal
                isOpen={isModalOpen}
                onClose={handleClose}
                blockScrollOnMount={true}
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent {...modalContent} ref={containerRef}>
                    <ModalCloseButton onClick={handleClose} />
                    <ModalHeader> {pageData?.title} </ModalHeader>
                    <Box margin={"10px"}>
                        <Progress {...progressBar} value={progressPercent} />
                    </Box>
                    <ModalBody
                        overflowY={"scroll"}
                        ref={bodyRef}
                        onScroll={trackScroll}
                    >
                        <SkeletonText
                            isLoaded={isLoaded}
                            mt="4"
                            noOfLines={4}
                            spacing="4"
                            skeletonHeight="2"
                        >
                            <Fade in={isLoaded}>
                                {isDetailedArticle
                                    ? renderDetailedContent()
                                    : renderBriefContent()}
                            </Fade>
                        </SkeletonText>
                    </ModalBody>
                    {renderModalFooter()}
                </ModalContent>
            </Modal>
        );
    };
    return renderComponent();
};

export default ContentDetailModal;
