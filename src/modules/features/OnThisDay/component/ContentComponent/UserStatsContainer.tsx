import { Text, Stack, StackDivider, Box, HStack } from "@chakra-ui/react";
import { IUserStats } from "@src/modules/features/Login/types/LoginActionPayloadTypes";
import { convertMsToStringTime } from "./UtilFiles/ContentComponentUtil";

interface IUserStatsContainerProps {
    userData: IUserStats | null;
}
const UserStatsContainer: React.FC<IUserStatsContainerProps> = ({
    userData = null,
}) => {
    const renderComponent = () => (
        <Stack divider={<StackDivider />} spacing={4}>
            <HStack display={"flex"} justifyContent={"space-around"}>
                <Text>Articles Read:</Text>
                <Text> {`${userData?.articlesRead || "--"} Articles`}</Text>
                <Text>Time Spent Reading:</Text>
                <Text> {convertMsToStringTime(userData?.timeSpent || 0)}</Text>
            </HStack>
        </Stack>
    );

    return renderComponent();
};

export default UserStatsContainer;
