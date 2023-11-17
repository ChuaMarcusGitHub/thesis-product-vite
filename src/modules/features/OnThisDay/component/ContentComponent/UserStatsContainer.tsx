import { Text, HStack, Box } from "@chakra-ui/react";
import { IUserStats } from "@src/modules/features/Login/types/LoginActionPayloadTypes";
import { convertMsToStringTime } from "./UtilFiles/ContentComponentUtil";

interface IUserStatsContainerProps {
    userData: IUserStats | null;
}
const UserStatsContainer: React.FC<IUserStatsContainerProps> = ({
    userData = null,
}) => {
    const returnArticlesRead = (articlesRead: number | undefined): string => {
        // Segregating check since 0 is a number
        if (articlesRead === undefined || articlesRead === null) return "--";
        else if (articlesRead === 0) return "0";
        return `${articlesRead}`;
    };
    const renderComponent = () => (
        <Box display={"flex"} alignItems={"center"}>
            <HStack
                display={"flex"}
                justifyContent={"space-around"}
                width={"100%"}
            >
                <Text fontSize={"1.5rem"}>Articles Read:</Text>
                <Text fontSize={"1.5rem"}>
                    {`${returnArticlesRead(userData?.articlesRead)} Articles`}
                </Text>
                <Text fontSize={"1.5rem"}>Time Spent Reading:</Text>
                <Text fontSize={"1.5rem"}>
                    {convertMsToStringTime(userData?.timeSpent || 0)}
                </Text>
            </HStack>
        </Box>
    );

    return renderComponent();
};

export default UserStatsContainer;
