import { IDbUserStats } from "@features/Login/types/LoginActionPayloadTypes";
import { ILeaderboardStats } from "../types/LeaderboardTypes";

export const transformUserToLeaderboardStats = (
    dbStats: IDbUserStats[]
): ILeaderboardStats[] => {
    let unknownCounter = 0;
    
    return dbStats.map((stat) => ({
        username: stat.username || `unkwown_user_${unknownCounter++}`,
        articlesRead: stat.articles_read,
        timeSpentMS: stat.time_spent,
    }));
};
