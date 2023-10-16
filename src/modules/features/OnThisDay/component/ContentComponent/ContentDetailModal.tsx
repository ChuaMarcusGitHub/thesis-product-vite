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
    Icon,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getSelectedBriefArticle,
    getSelectedDetailedArticle,
} from "@modules/features/OnThisDay/selector/OnThisDaySummarySelector";
import ModalTabFullContent from "./ModalTabFullContent";
import HTMLReactParser from "html-react-parser";
import { IArticleBriefObject } from "@features/onThisDay/type/OnThisDayCommonTypes";
import "html-react-parser";
import {
    loadBriefArticle,
    loadDetailedArticle,
} from "@features/onThisDay/actions/OnThisDaySummaryActions";
import {
    buttonStack,
    modalContent,
    progressBar,
} from "./ContentDetailModalStyleProps";

import { MdArticle } from "react-icons/md";

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
    const detailedArticle: string | TrustedHTML | null = useSelector(
        getSelectedDetailedArticle
    );
    const briefArticle: IArticleBriefObject | null = useSelector(
        getSelectedBriefArticle
    );

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
            if (!detailedArticle) dispatch(loadDetailedArticle(title));
        } else {
            if (!briefArticle) dispatch(loadBriefArticle(title));
        }
        setIsDetailedArticle(!isDetailedArticle);
    };

    const handleClose = () => {
        setProgressPercent(0);
        onClose();
    };

    const renderBriefContent = () => (
        <ModalBody overflowY={"scroll"} ref={bodyRef}>
            {HTMLReactParser(briefArticle?.extract || "")}
        </ModalBody>
    );

    const renderDetailedContent = () => (
        <ModalBody overflowY={"scroll"} ref={bodyRef} onScroll={trackScroll}>
            <ModalTabFullContent
                updateProgress={trackScroll}
                htmldoc={detailedArticle as TrustedHTML}
            />
        </ModalBody>
    );

    const renderModalFooter = () => (
        <ModalFooter>
            <HStack {...buttonStack}>
                <Button onClick={handleReadingModeSwitch}>
                    {isDetailedArticle ? "Detailed" : "Summarized"}
                    <Icon as={MdArticle} />
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
                    <Progress {...progressBar} value={progressPercent} />
                    {isDetailedArticle
                        ? renderDetailedContent()
                        : renderBriefContent()}
                    {renderModalFooter()}
                </ModalContent>
            </Modal>
        );
    };
    return renderComponent();
};

export default ContentDetailModal;
