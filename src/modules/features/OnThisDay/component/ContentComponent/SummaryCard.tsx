import React, { useMemo } from "react";
import { IOtdCardPageData } from "@modules/features/OnThisDay/type/OnThisDayCommonTypes";
import {
    Card,
    CardBody,
    CardFooter,
    Image,
    Skeleton,
    SkeletonText,
    Text,
    Button,
} from "@chakra-ui/react";
import cardStyles from "./SummaryCard.module.scss";
import classNames from "classnames/bind";

import {
    DEFAULT_FADE_DURATION,
    ICommonSkeletonProps,
} from "@src/modules/features/Skeletons/SkeletonTypes";
import { imageStyles } from "./SummaryCardPropStyles";
import { useDispatch } from "react-redux";
import { addToReadList } from "../../actions/OnThisDaySummaryActions";

const cx = classNames.bind({ ...cardStyles });
interface IContentCardProps {
    handleClick?: () => void;
    eventDescript?: string;
    pageData?: IOtdCardPageData | null;
}

const SummaryCard: React.FC<IContentCardProps> = ({
    handleClick = () => console.warn("Summary Card - onCLick not defined!"),
    eventDescript,
    pageData,
}) => {
    // Constants
    const dispatch = useDispatch();
    const isLoaded = useMemo(() => {
        return eventDescript || (pageData?.thumbnail.source && pageData?.title);
    }, [pageData?.thumbnail?.source, pageData?.title, eventDescript]);

    const skelProps: ICommonSkeletonProps = {
        isLoaded: !!isLoaded,
        fadeDuration: DEFAULT_FADE_DURATION,
    };

    // Logic Methods
    const handleAddToReadlist = () => {
        if (pageData) dispatch(addToReadList(pageData));
    };

    // Render Methods
    const renderHeader = () => (
        <div
            className={cx("summary-card-header-container")}
            onClick={handleClick}
        >
            <Skeleton
                minW={"50px"}
                maxW={"40%"}
                minH={"50px"}
                maxH={"100px"}
                borderRadius={"50%"}
                {...skelProps}
                alignSelf={"left"}
            >
                {pageData?.thumbnail && (
                    <Image
                        src={pageData?.thumbnail.source}
                        alt={pageData?.title || ""}
                        {...imageStyles}
                    />
                )}
            </Skeleton>

            <Skeleton
                height={5}
                width={"50%"}
                {...skelProps}
                alignSelf={"center"}
            >
                <Text textAlign={"left"} maxW={"100%"} fontWeight={"bold"}>
                    {pageData?.title}
                </Text>
            </Skeleton>
        </div>
    );

    const renderBody = () => (
        <CardBody onClick={handleClick}>
            <SkeletonText
                {...skelProps}
                mt={"4"}
                noOfLines={4}
                spacing={4}
                skeletonHeight={"2"}
            >
                <Text noOfLines={[1, 3, 4]} textAlign={"left"}>
                    {eventDescript}
                </Text>
            </SkeletonText>
        </CardBody>
    );

    const renderFooter = () => (
        <CardFooter>
            {pageData && (
                <Button onClick={handleAddToReadlist}> Add to Readlist</Button>
            )}
        </CardFooter>
    );
    const renderComponent = () => {
        return (
            <Card id={pageData?.tid || "undefined"}>
                {renderHeader()}
                {renderBody()}
                {renderFooter()}
            </Card>
        );
    };

    return renderComponent();
};

export default SummaryCard;
