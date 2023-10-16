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
} from "@chakra-ui/react";
import React, { useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getSelectedBriefArticle,
    getSelectedDetailedArticle,
} from "@modules/features/OnThisDay/selector/OnThisDaySummarySelector";
import ModalTabFullContent from "./ModalTabFullContent";
import HTMLReactParser from "html-react-parser";
import {
    IArticleBriefObject,
    IArticleDetailedPayload,
} from "@features/onThisDay/type/OnThisDayCommonTypes";
import "html-react-parser";
import {
    clearDetailedArticle,
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

const cx = classNames.bind({ ...styles });
export interface IContentDetailModalProps {
    title?: string;
    isOpen: boolean;
    onClose: () => void;
}

const ContentDetailModal: React.FC<IContentDetailModalProps> = ({
    title = "None",
    isOpen = false,
    onClose = () =>
        console.error("ContentDetailModal onClose Method undefined!"),
}) => {
    // Constants
    const dispatch = useDispatch();
    const bodyRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // States
    const [isDetailedArticle, setIsDetailedArticle] = useState(false);
    const [progressPercent, setProgressPercent] = useState(0.0);
    const detailedArticle: IArticleDetailedPayload | null = useSelector(
        getSelectedDetailedArticle
    );

    const briefArticle: IArticleBriefObject | null = useSelector(
        getSelectedBriefArticle
    );
    const isLoaded = useMemo(() => {
        return isDetailedArticle ? !!detailedArticle : !!briefArticle;
    }, [isDetailedArticle, detailedArticle, briefArticle]);

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
            if (!detailedArticle)
                dispatch(
                    loadDetailedArticle({ title: title, shouldClear: false })
                );
            else if (
                detailedArticle &&
                detailedArticle.pageId !== briefArticle?.pageId
            ) {
                // If previous article already exist but not the same we clear
                dispatch(
                    loadDetailedArticle({ title: title, shouldClear: true })
                );
            }
        } else {
            if (!briefArticle) dispatch(loadBriefArticle(title));
        }
        setProgressPercent(0);
        setIsDetailedArticle(!isDetailedArticle);
    };

    const handleClose = () => {
        setIsDetailedArticle(false);
        setProgressPercent(0);
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

    const renderModalFooter = () => (
        <ModalFooter>
            <HStack {...buttonStack}>
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
                <Button onClick={onClose}>Close Article! (Esc)</Button>
            </HStack>
        </ModalFooter>
    );

    const renderComponent = () => {
        return (
            <Modal
                isOpen={isOpen}
                onClose={handleClose}
                blockScrollOnMount={true}
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent {...modalContent} ref={containerRef}>
                    <ModalCloseButton onClick={handleClose} />
                    <ModalHeader> {title} </ModalHeader>
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
