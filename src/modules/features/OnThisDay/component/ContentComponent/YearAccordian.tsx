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
} from "@features/OnThisDay/type/OnThisDayCommonTypes";
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
    clearModalProps,
    triggerAnalyticsWithArticle,
} from "@features/OnThisDay/actions/OnThisDaySummaryActions";
import { IAnalyticsDataArticlePayload } from "@features/OnThisDay/type/OnThisDayWebserviceTypes";

export interface IYearAccordianProps {
    typeEvents: IOtdFeedObject;
    componentRef?: React.RefObject<HTMLDivElement> | null;
}

const YearAccordian: React.FC<IYearAccordianProps> = ({
    typeEvents,
    componentRef = undefined,
}) => {
    // Constants
    const dispatch = useDispatch();
    const { onClose } = useDisclosure();
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
            transformToAnalyticsArticlePayload(
                _page,
                eventDescription,
                topic,
                handleCardClose
            );
        dispatch(triggerAnalyticsWithArticle(articlePayload));
    };
    const handleCardClose = () => {
        dispatch(clearModalProps());
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
                topic={topic}
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
                maxH={["80vh","80vh", "65vh"]}
                ref={componentRef}
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
