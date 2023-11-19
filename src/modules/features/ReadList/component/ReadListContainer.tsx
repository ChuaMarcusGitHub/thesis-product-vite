import {
    Box,
    Fade,
    GridItem,
    SimpleGrid,
    useDisclosure,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    clearModalProps,
    triggerAnalyticsWithArticle,
} from "@features/OnThisDay/actions/OnThisDaySummaryActions";
import SummaryCard from "@features/OnThisDay/component/ContentComponent/SummaryCard";
import { transformToAnalyticsArticlePayload } from "@features/OnThisDay/component/ContentComponent/UtilFiles/ContentComponentUtil";
import { getReadlist } from "@features/OnThisDay/selector/OnThisDaySummarySelector";
import {
    IOtdCardPageData,
    IReadingCardData,
    IReadlistObject,
} from "@features/OnThisDay/type/OnThisDayCommonTypes";
import { IAnalyticsDataArticlePayload } from "@features/OnThisDay/type/OnThisDayWebserviceTypes";
import { transformReadListObjectToList } from "./ReadListComponentUtil";
import {
    readListContainer,
    simpleGridContainer,
} from "./ReadListContainerStyle";

export const ReadListContainer: React.FC = () => {
    // Dispatch
    const dispatch = useDispatch();
    const { onClose } = useDisclosure();
    // Selectors
    // const isLoggedIn: boolean = useSelector(getIsLoggedIn);
    const userReadList: IReadlistObject = useSelector(getReadlist);

    // Memos
    const readListArray = useMemo(() => {
        return transformReadListObjectToList(userReadList);
    }, [userReadList]);

    // Component Methods
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

    // Render Methods
    const renderCard = (page: IReadingCardData, index: number) => (
        <GridItem key={`grid-item-${index}`}>
            <Fade key={`fade-card-${index}`} in={page.eventDescription !== ""}>
                <SummaryCard
                    handleClick={() =>
                        handleCardClick(
                            page,
                            page.eventDescription || "description not found",
                            page.eventType
                        )
                    }
                    eventDescript={page.eventDescription}
                    pageData={page}
                    key={index}
                />
            </Fade>
        </GridItem>
    );
    const renderComponent = () => {
        return (
            <Box {...readListContainer}>
                <SimpleGrid {...simpleGridContainer}>
                    {readListArray &&
                        readListArray.map((page, index) =>
                            renderCard(page, index)
                        )}
                </SimpleGrid>
            </Box>
        );
    };

    return renderComponent();
};
export default ReadListContainer;
