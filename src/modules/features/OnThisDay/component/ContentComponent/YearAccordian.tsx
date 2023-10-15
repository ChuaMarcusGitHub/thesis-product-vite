import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Text,
    
    SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";

import {
    IOtdCardData,
    IOtdCardPageData,
    IOtdFeedObject,
} from "../../type/OnThisDayCommonTypes";
import { getAccordianYearsFromProps } from "./UtilFiles/ContentComponentUtil";
import SummaryCard from "./SummaryCard";
import { emptyPage } from "./UtilFiles/DefaultObjects";
import {
    accordianPanelGrid,
} from "../YearAccordianPropStyles";

export interface IYearAccordianProps {
    typeEvents: IOtdFeedObject;
}

const YearAccordian: React.FC<IYearAccordianProps> = ({ typeEvents }) => {
    const [accordianYears, setAccordianYears] = useState<string[]>([]);

    useEffect(() => {
        setAccordianYears(getAccordianYearsFromProps(typeEvents));
        console.log(getAccordianYearsFromProps(typeEvents));

        // unmount code
        return () => {
            setAccordianYears([]);
        };
    }, [typeEvents]);

    const isLoaded = useMemo(() => {
        return typeEvents && !!accordianYears.length;
    }, [typeEvents, accordianYears]);

    const renderYearEvents = (
        page: IOtdCardPageData,
        eventDescript: string,
        key: number
    ) => (
        <SummaryCard
            handleClick={() => console.log("define later")}
            eventDescript={eventDescript}
            pageData={page}
            key={key}
        />
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
            <Accordion allowMultiple={true}>
                {accordianYears.map((year, index) =>
                    renderYearAccordian(year, typeEvents?.[year], index)
                )}
            </Accordion>
        );
    };

    return renderComponent();
};

export default YearAccordian;
