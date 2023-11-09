import {
    Box,
    Text,
    Button,
    Stack,
    Grid,
    GridItem,
    Heading,
} from "@chakra-ui/react";
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
            <ReadListContainer />
        </Box>
    );
    const renderComponent = () => (
        <Box {...readListPageContainer}>
            <Stack gap={4}>
                {renderBannerContainer()}
                {renderReadlistContainer()}
            </Stack>
        </Box>
    );
    return renderComponent();
};

export default ReadListPage;
