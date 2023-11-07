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
import {
    getAccordianYearsFromProps,
    returnArrayOfIndexes,
    transformToAnalyticsArticlePayload,
} from "./UtilFiles/ContentComponentUtil";
import SummaryCard from "./SummaryCard";
import { emptyPage } from "./UtilFiles/DefaultObjects";
import { accordianPanelGrid } from "../YearAccordianPropStyles";
import { useDispatch } from "react-redux";
import {
    clearBriefArticle,
    setModalProperties,
    triggerAnalyticsWithArticle,
} from "@features/OnThisDay/actions/OnThisDaySummaryActions";
import { defaultModalProps } from "./ContentDetailModal";
import { IAnalyticsDataArticlePayload } from "../../type/OnThisDayWebserviceTypes";

export interface IYearAccordianProps {
    typeEvents: IOtdFeedObject;
}

const YearAccordian: React.FC<IYearAccordianProps> = ({ typeEvents }) => {
    // Constants
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    //----- use States
    const [accordianYears, setAccordianYears] = useState<string[]>([]);

    //----- Use Effects
    useEffect(() => {
        setAccordianYears(getAccordianYearsFromProps(typeEvents));
        // unmount code
        return () => {
            setAccordianYears([]);
        };
    }, [typeEvents]);

    //----- Component Logic
    const handleCardClick = (
        _page: IOtdCardPageData,
        eventDescription: string,
        topic: string
    ) => {
        const articlePayload: IAnalyticsDataArticlePayload =
            transformToAnalyticsArticlePayload(_page, eventDescription, topic);
        dispatch(triggerAnalyticsWithArticle(articlePayload));
        dispatch(
            setModalProperties({
                pageData: _page,
                isOpen: isOpen,
                onClose: handleCardClose,
                articleType: articlePayload.articleType,
            })
        );
        onOpen();
    };
    const handleCardClose = () => {
        dispatch(clearBriefArticle());
        dispatch(setModalProperties(defaultModalProps));
        onClose();
    };

    //----- Render Methods
    const renderYearEvents = (
        page: IOtdCardPageData,
        eventDescript: string,
        key: number,
        topic: string
    ) => (
        <Fade in={eventDescript !== ""} key={`fade-${key}`}>
            <SummaryCard
                handleClick={() => handleCardClick(page, eventDescript, topic)}
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
                                index,
                                event.tag
                            );
                        })}
                </SimpleGrid>
            </AccordionPanel>
        </AccordionItem>
    );
    const renderComponent = () => {
        return (
            <Accordion
                allowMultiple={true}
                defaultIndex={returnArrayOfIndexes()}
            >
                {accordianYears.map((year, index) =>
                    renderYearAccordian(year, typeEvents?.[year], index)
                )}
            </Accordion>
        );
    };

    return renderComponent();
};

export default YearAccordian;
