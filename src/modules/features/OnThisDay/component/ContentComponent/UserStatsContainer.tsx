import { Text, HStack, Box, Stack } from "@chakra-ui/react";
import { getIsMobileDevice } from "@src/modules/features/Common/Utils/UtilsMethods";
import { IUserStats } from "@src/modules/features/Login/types/LoginActionPayloadTypes";
import React from "react";
import { convertMsToStringTime } from "./UtilFiles/ContentComponentUtil";

interface IUserStatsContainerProps {
    userData: IUserStats | null;
}
const UserStatsContainer: React.FC<IUserStatsContainerProps> = ({
    userData = null,
}) => {
    const isMobileDevice: boolean = getIsMobileDevice();

    const returnArticlesRead = (articlesRead: number | undefined): string => {
        // Segregating check since 0 is a number
        if (articlesRead === undefined || articlesRead === null) return "--";
        else if (articlesRead === 0) return "0";
        return `${articlesRead}`;
    };

    const renderWebStack = () => (
        <HStack display={"flex"} justifyContent={"space-around"} width={"100%"}>
            <Text fontSize={"1.5rem"}>Articles Read:</Text>
            <Text fontSize={"1.5rem"}>
                {`${returnArticlesRead(userData?.articlesRead)} Articles`}
            </Text>
            <Text fontSize={"1.5rem"}>Time Spent Reading:</Text>
            <Text fontSize={"1.5rem"}>
                {convertMsToStringTime(userData?.timeSpent || 0)}
            </Text>
        </HStack>
    );

    const renderMobileStack = () => (
        <Stack display={"flex"} justifyContent={"space-around"} width={"100%"}>
            <HStack display={"flex"} justifyContent={"space-around"}>
                <Text fontSize={"1.1rem"}>Articles Read:</Text>
                <Text fontSize={"1.1rem"}>
                    {`${returnArticlesRead(userData?.articlesRead)} Articles`}
                </Text>
            </HStack>
            <HStack display={"flex"} justifyContent={"space-around"}>
                <Text fontSize={"1.1rem"}>Time Spent Reading:</Text>
                <Text fontSize={"1.1rem"}>
                    {convertMsToStringTime(userData?.timeSpent || 0)}
                </Text>
            </HStack>
        </Stack>
    );
    const renderComponent = () => (
        <Box display={"flex"} alignItems={"center"}>
            {isMobileDevice ? renderMobileStack() : renderWebStack()}
        </Box>
    );

    return renderComponent();
};

export default UserStatsContainer;
