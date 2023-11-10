import {
    Box,
    Text,
    Button,
    Stack,
    Grid,
    GridItem,
    Heading,
} from "@chakra-ui/react";
import ContentDetailModal from "@src/modules/features/OnThisDay/component/ContentComponent/ContentDetailModal";
import ReadListContainer from "../ReadListContainer";

import {
    bannerContainer,
    readListPageContainer,
    bannerGrid,
    readListContainerWrapper,
    titleGrid,
} from "./ReadListpageProps";

const ReadListPage: React.FC = () => {
    const renderBannerContainer = () => (
        <Box {...bannerContainer}>
            <Grid {...bannerGrid}>
                <GridItem {...titleGrid}>
                    <Heading>Reading List</Heading>
                </GridItem>
            </Grid>
        </Box>
    );
    const renderReadlistContainer = () => (
        <Box {...readListContainerWrapper}>
            <ReadListContainer placeholder={""} />
        </Box>
    );
    const renderComponent = () => (
        <Box {...readListPageContainer}>
            <Stack gap={4}>
                {renderBannerContainer()}
                {renderReadlistContainer()}
            </Stack>
            <ContentDetailModal />
        </Box>
    );
    return renderComponent();
};

export default ReadListPage;
