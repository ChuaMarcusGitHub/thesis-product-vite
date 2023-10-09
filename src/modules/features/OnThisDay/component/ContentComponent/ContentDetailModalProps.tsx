import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Progress,
    Spinner,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSelector } from "react-redux";
import {
    getSelectedBriefArticle,
    getSelectedDetailedArticle,
} from "@modules/features/OnThisDay/selector/OnThisDaySummarySelector";
import ModalTabFullContent from "./ModalTabFullContent";
import { spinnerProps } from "./ModalTabFullContentStyles";
import HTMLReactParser from "html-react-parser";
import { IArticleBriefObject } from "../../type/OnThisDayCommonTypes";
import "html-react-parser";

export interface IContentDetailModalProps {
    title?: string;
    contentUrl: string;
    isOpen: boolean;
    onClose: () => void;
}
const ContentDetailModal: React.FC<IContentDetailModalProps> = ({
    title = "",
    isOpen = false,
    onClose = () =>
        console.error("ContentDetailModal onClose Method undefined!"),
}) => {
    // Constants
    const bodyRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

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

    const handleClose = () => {
        setProgressPercent(0);
        onClose();
    };

    const renderComponent = () => {
        return (
            <Modal
                isOpen={isOpen}
                onClose={handleClose}
                blockScrollOnMount={true}
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent
                    maxW={"85%"}
                    maxH={"75vh"}
                    padding={"1%"}
                    ref={containerRef}
                    id={"content-modal"}
                >
                    <ModalCloseButton onClick={handleClose} />

                    <Tabs>
                        <TabList>
                            <Tab>Summarized</Tab>
                            <Tab>Detailed</Tab>
                        </TabList>
                        <Progress
                            hasStripe
                            value={progressPercent}
                            isAnimated={true}
                        />
                        <TabPanels>
                            <TabPanel>
                                <ModalBody overflowY={"scroll"} ref={bodyRef}>
                                    {HTMLReactParser(briefArticle?.extract || "")}
                                </ModalBody>
                            </TabPanel>
                            <TabPanel
                                overflow={"scroll"}
                                onScroll={trackScroll}
                                style={{ border: "1px solid red" }}
                            >
                                <ModalBody overflowY={"scroll"} ref={bodyRef}>
                                    <ModalTabFullContent
                                        updateProgress={trackScroll}
                                        htmldoc={detailedArticle as TrustedHTML}
                                    />
                                </ModalBody>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </ModalContent>
            </Modal>
        );
    };
    return renderComponent();
};

export default ContentDetailModal;
