import supabaseClient from "@src/clientfolder/supabaseClient";
import { SUPABASE_TABLES } from "@features/Common/Supabase/SupabaseCommonTypes";
// import { handleCUDRsponseStatus } from "@features/Common/Supabase/SupabaseCommonUtils";
import { IDbUserStats } from "@features/Login/types/LoginActionPayloadTypes";

const FILE_LOC_ERR_STRING = "Error encountered in LeaderboardSupabase Calls |";
export const supaGetTopXUsers = async (limit: number) => {
    try {
        const { data: userStats, error } = await supabaseClient
            .from(SUPABASE_TABLES.USER_STATS)
            .select("*")
            .limit(limit)
            .order("articles_read", { ascending: false });

        if (error) {
            console.error(error);
            return [];
        }

        return userStats as IDbUserStats[];
    } catch (e) {
        console.error(`${FILE_LOC_ERR_STRING}| supaGetUserStats`, e);
    }
};
