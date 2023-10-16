import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Text,
    SimpleGrid,
    Fade,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import {
    IOtdCardData,
    IOtdCardPageData,
    IOtdFeedObject,
} from "@features/onThisDay/type/OnThisDayCommonTypes";
import { getAccordianYearsFromProps } from "./UtilFiles/ContentComponentUtil";
import SummaryCard from "./SummaryCard";
import { emptyPage } from "./UtilFiles/DefaultObjects";
import { accordianPanelGrid } from "../YearAccordianPropStyles";
import { useDispatch } from "react-redux";
import {
    clearBriefArticle,
    loadBriefArticle,
} from "@features/OnThisDay/actions/OnThisDaySummaryActions";
import ContentDetailModal from "./ContentDetailModal";

export interface IYearAccordianProps {
    typeEvents: IOtdFeedObject;
}

const YearAccordian: React.FC<IYearAccordianProps> = ({ typeEvents }) => {
    // Constants
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    //----- use States
    const [accordianYears, setAccordianYears] = useState<string[]>([]);
    const [selectedTitle, setSelectedTitle] = useState("");

    //----- Use Effects
    useEffect(() => {
        setAccordianYears(getAccordianYearsFromProps(typeEvents));
        console.log(getAccordianYearsFromProps(typeEvents));

        // unmount code
        return () => {
            setAccordianYears([]);
        };
    }, [typeEvents]);
    //----- Component Logic
    const handleCardClick = (title: string) => {
        dispatch(loadBriefArticle(title || ""));
        setSelectedTitle(title);
        onOpen();
    };
    const handleCardClose = () => {
        dispatch(clearBriefArticle());
        setSelectedTitle("");
        onClose();
    };

    //----- Render Methods

    const renderYearEvents = (
        page: IOtdCardPageData,
        eventDescript: string,
        key: number
    ) => (
        <Fade in={eventDescript !== ""} key={`fade-${key}`}>
            <SummaryCard
                handleClick={() => handleCardClick(page.title)}
                eventDescript={eventDescript}
                pageData={page}
                key={key}
            />
        </Fade>
    );

    const renderYearAccordian = (
        year: string,
        yearEvents: IOtdCardData[],
        key: number
    ) => (
        <AccordionItem key={`${year}-${key}`}>
            <h2>
                <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                        <Text>Year {year}</Text>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel>
                <SimpleGrid {...accordianPanelGrid}>
                    {yearEvents.length &&
                        yearEvents.map((event, index) => {
                            const pageData: IOtdCardPageData = event.pages
                                ?.length
                                ? event.pages[0]
                                : emptyPage;

                            return renderYearEvents(
                                pageData,
                                event.event,
                                index
                            );
                        })}
                </SimpleGrid>
            </AccordionPanel>
        </AccordionItem>
    );
    const renderComponent = () => {
        return (
            <Accordion allowMultiple={true} defaultIndex={0}>
                {accordianYears.map((year, index) =>
                    renderYearAccordian(year, typeEvents?.[year], index)
                )}
                <ContentDetailModal
                    isOpen={isOpen}
                    onClose={handleCardClose}
                    title={selectedTitle}
                />
            </Accordion>
        );
    };

    return renderComponent();
};

export default YearAccordian;
