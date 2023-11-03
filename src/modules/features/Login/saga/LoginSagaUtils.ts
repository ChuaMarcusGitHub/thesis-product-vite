import { IDbUserStats, IUserStats } from "../types/LoginActionPayloadTypes";

export const transformUserStats = (dbData: IDbUserStats): IUserStats => {
    return {
        userId: dbData.user_id || "",
        username: dbData.username || `unnamed`,
        articlesRead: dbData.articles_read || 0,
        timeSpent: dbData.time_spent || 0.0,
    };
};
