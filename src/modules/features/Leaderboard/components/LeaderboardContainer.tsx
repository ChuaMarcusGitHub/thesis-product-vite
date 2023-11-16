import {
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Image,
    HStack,
    Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertMsToStringTime } from "../../OnThisDay/component/ContentComponent/UtilFiles/ContentComponentUtil";
import { initLeaderboard } from "../actions/LeaderboardActions";
import { getLeaderUsers } from "../selector/LeaderboardSelector";
import { ILeaderboardStats } from "../types/LeaderboardTypes";
import goldMedal from "@rsc/leaderboard/gold_medal.png";
import silverMedal from "@rsc/leaderboard/silver_medal.png";
import bronzeMedal from "@rsc/leaderboard/bronze_medal.png";
import { leaderboardTableContainr } from "./LeaderboardPageStyleProps";

const LeaderboardContainer: React.FC = () => {
    // Constants
    const dispatch = useDispatch();

    // Use Effects
    useEffect(() => {
        dispatch(initLeaderboard());
    }, []);

    // Seelctors
    const leaderboardUsers: ILeaderboardStats[] = useSelector(getLeaderUsers);

    // Render methods
    const renderMedalIcon = (index: number) => {
        let imgSrc: string = "";
        switch (index) {
            case 0:
                imgSrc = goldMedal;
                break;
            case 1:
                imgSrc = silverMedal;
                break;
            case 2:
            default:
                imgSrc = bronzeMedal;
                break;
        }
        return <Image src={imgSrc} objectFit={"contain"} width={"50px"} />;
    };
    const renderTableData = () => (
        <>
            {leaderboardUsers.map((userData, index) => (
                <Tr key={`table-data-row-${index}`}>
                    <Td
                        fontSize={"1.5rem"}
                        display={"flex"}
                        justifyContent={"space-around"}
                    >
                        <HStack gap={4}>
                            {index < 3 && renderMedalIcon(index)}
                            <Text>{userData.username}</Text>
                        </HStack>
                    </Td>
                    <Td fontSize={"1.5rem"} textAlign={"center"}>
                        {userData.articlesRead}
                    </Td>
                    <Td fontSize={"1.5rem"} textAlign={"center"}>
                        {convertMsToStringTime(userData.timeSpentMS)}
                    </Td>
                </Tr>
            ))}
        </>
    );
    const renderComponent = () => (
        <TableContainer {...leaderboardTableContainr}>
            <Table size={"sm"}>
                <Thead marginBottom={"20px"} height={"50px"}>
                    <Tr>
                        <Th textAlign={"center"} fontSize={"1.8rem"}>
                            Username
                        </Th>
                        <Th textAlign={"center"} fontSize={"1.8rem"}>
                            Articles Read
                        </Th>
                        <Th textAlign={"center"} fontSize={"1.8rem"}>
                            Time Spent
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>{renderTableData()}</Tbody>
            </Table>
        </TableContainer>
    );

    return renderComponent();
};

export default LeaderboardContainer;
