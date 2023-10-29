// import { Session, SupabaseClient } from "@supabase/supabase-js";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.0";
// import { IUserStats } from "../types/LoginActionPayloadTypes";

// const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
import supabaseClient from "@src/clientfolder/supabaseClient";
import {
    IUserStats,
    SUPABASE_RESPONSE,
} from "../types/LoginActionPayloadTypes";

const FILE_LOC_ERR_STRING = "Error encountered in LoginSupabase Calls |";
export const supaGetUserStats = async (user_id_input: string) => {
    try {
        const { data: userStats, error } = await supabaseClient
            .from("USER_STATS")
            .select("*")
            .eq("user_id", user_id_input)
            .single();

        if (error) {
            console.error(error);
            return null;
        }

        console.log(userStats);
        return userStats;
    } catch (e) {
        console.error(`${FILE_LOC_ERR_STRING}| supaGetUserStats`, e);
    }
};

export const supaUpdateUserStats = async (payload: IUserStats) => {
    try {
        const { status: responseStatus, statusText } = await supabaseClient
            .from("USER_STATS")
            .update({
                articles_read: payload.articlesRead,
                time_spent: payload.timeSpent,
            })
            .eq("user_id", payload.userId);

        //check for status update
        if (
            responseStatus &&
            responseStatus !== SUPABASE_RESPONSE.UPDATE_SUCCESS
        ) {
            console.error(
                "Error encountered when updating Supabase, Error Msg:",
                statusText
            );
            return {
                success: false,
                errorMessage: statusText,
            };
        }
        return { success: true, errorMessage: "" };
    } catch (e) {
        console.error(`${FILE_LOC_ERR_STRING}| supaUpdateUserStats`);
        console.error(e);
    }
};
