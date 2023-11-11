import React, { useMemo } from "react";
import {
    IOtdCardPageData,
    IReadingCardData,
} from "@modules/features/OnThisDay/type/OnThisDayCommonTypes";
import {
    Card,
    CardBody,
    CardFooter,
    Image,
    Text,
    Button,
    Stack,
    Box,
    Heading,
} from "@chakra-ui/react";
// import cardStyles from "./SummaryCard.module.scss";
// import classNames from "classnames/bind";

// import {
//     DEFAULT_FADE_DURATION,
//     ICommonSkeletonProps,
// } from "@src/modules/features/Skeletons/SkeletonTypes";
import { imageContainerStyle } from "./SummaryCardPropStyles";
import { useDispatch, useSelector } from "react-redux";
import {
    addToReadList,
    removeFromReadList,
} from "../../actions/OnThisDaySummaryActions";
import { getReadlist } from "../../selector/OnThisDaySummarySelector";

// const cx = classNames.bind({ ...cardStyles });
interface IContentCardProps {
    handleClick?: () => void;
    eventDescript?: string;
    pageData?: IOtdCardPageData | IReadingCardData | null;
    topic?: string;
}

const SummaryCard: React.FC<IContentCardProps> = ({
    handleClick = () => console.warn("Summary Card - onCLick not defined!"),
    eventDescript,
    pageData,
    topic = "",
}) => {
    // Selector
    const readingList = useSelector(getReadlist);
    // Constants
    const dispatch = useDispatch();
    // const isLoaded = useMemo(() => {
    //     return eventDescript || (pageData?.thumbnail.source && pageData?.title);
    // }, [pageData?.thumbnail?.source, pageData?.title, eventDescript]);

    const isInReadList = useMemo(() => {
        if (readingList && pageData?.pageId)
            return readingList[pageData.pageId];
        else return false;
    }, [readingList, pageData?.pageId]);

    // const skelProps: ICommonSkeletonProps = {
    //     isLoaded: !!isLoaded,
    //     fadeDuration: DEFAULT_FADE_DURATION,
    // };

    // Logic Methods
    const handleAddToReadlist = () => {
        if (pageData)
            dispatch(
                addToReadList({
                    ...pageData,
                    eventType: topic,
                    eventDescription: eventDescript,
                })
            );
    };

    const handleRemoveFromReadlist = () => {
        if (pageData) dispatch(removeFromReadList(pageData?.pageId));
    };

    // Render Methods
    const renderHeader = () => <Heading size="md">{pageData?.title}</Heading>;

    const renderBody = () => (
        <Text py="2" noOfLines={[1, 3, 4]} textAlign={"left"}>
            {eventDescript}
        </Text>
    );

    const renderFooter = () => (
        <CardFooter>
            {pageData &&
                (isInReadList ? (
                    <Button onClick={handleRemoveFromReadlist}>
                        Remove from Readlist
                    </Button>
                ) : (
                    <Button onClick={handleAddToReadlist}>
                        Add to Readlist
                    </Button>
                ))}
        </CardFooter>
    );

    const renderImage = () => (
        <Box {...imageContainerStyle} onClick={handleClick}>
            <Image
                objectFit="contain"
                src={pageData?.thumbnail.source}
                alt={pageData?.title || ""}
            />
        </Box>
    );
    const renderComponent = () => {
        return (
            <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                height={"250px"}
            >
                {pageData?.thumbnail && renderImage()}
                <Stack>
                    <CardBody onClick={handleClick}>
                        {renderHeader()}
                        {renderBody()}
                    </CardBody>
                    {renderFooter()}
                </Stack>
            </Card>
        );
    };

    return renderComponent();
};

export default SummaryCard;
