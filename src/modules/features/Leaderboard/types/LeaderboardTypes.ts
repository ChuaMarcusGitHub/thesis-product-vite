export const TOP_LIMIT = 5;
export interface ILeaderboardReducerState {
    topUsers: ILeaderboardStats[];
}

export interface ILeaderboardStats {
    username: string;
    articlesRead: number;
    timeSpentMS: number;
}
