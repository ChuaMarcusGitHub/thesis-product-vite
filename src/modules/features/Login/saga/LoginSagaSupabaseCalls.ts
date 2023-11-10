// const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
import supabaseClient from "@src/clientfolder/supabaseClient";
import {
    CRUD_OP,
    SUPABASE_TABLES,
} from "@features/Common/Supabase/SupabaseCommonTypes";
import { handleCUDRsponseStatus } from "@features/Common/Supabase/SupabaseCommonUtils";
import { IUserStats } from "../types/LoginActionPayloadTypes";

const FILE_LOC_ERR_STRING = "Error encountered in LoginSupabase Calls |";
export const supaGetUserStats = async (user_id_input: string) => {
    try {
        const { data: userStats, error } = await supabaseClient
            .from(SUPABASE_TABLES.USER_STATS)
            .select("*")
            .eq("user_id", user_id_input)
            .single();

        if (error) {
            console.error(error);
            return null;
        }

        return userStats as IUserStats;
    } catch (e) {
        console.error(`${FILE_LOC_ERR_STRING}| supaGetUserStats`, e);
    }
};

export const supaUpdateUserStats = async (payload: IUserStats) => {
    try {
        const { status: responseStatus, statusText } = await supabaseClient
            .from(SUPABASE_TABLES.USER_STATS)
            .update({
                articles_read: payload.articlesRead,
                time_spent: payload.timeSpent,
            })
            .eq("user_id", payload.userId);

        //check for status update

        return handleCUDRsponseStatus(
            CRUD_OP.UPDATE,
            responseStatus,
            statusText
        );
    } catch (e) {
        console.error(`${FILE_LOC_ERR_STRING}| supaUpdateUserStats`);
        console.error(e);
    }
};

export const supaGetUsernameExists = async (username_input: string) => {
    try {
        const { data: usernames, error } = await supabaseClient
            .from(SUPABASE_TABLES.SEC_USER)
            .select("username")
            .eq("username", username_input);
        /*
            Return Format for usernames
            [
                {username: "username"}
            ]
        */
        console.log("usernames:", usernames);
        //check for status update
        if (error) {
            console.error(error);
            return null;
        }

        return usernames.length > 0;
    } catch (e) {
        console.error(`${FILE_LOC_ERR_STRING}| supaGetUsernameExists`);
        console.error(e);
    }
};

export const supaGetEmailExist = async (email_input: string) => {
    try {
        const { data: emails, error } = await supabaseClient
            .from(SUPABASE_TABLES.SEC_USER)
            .select("email")
            .eq("email", email_input);

        console.log("emails:", emails);
        //check for status update
        if (error) {
            console.error(error);
            return null;
        }

        return emails.length > 0;
    } catch (e) {
        console.error(`${FILE_LOC_ERR_STRING}| supaGetEmailExist`);
        console.error(e);
    }
};

export const updateUserSecUsername = async (
    user_id_input: string,
    username_input: string
) => {
    try {
        const { status: responseStatus, statusText } = await supabaseClient
            .from(SUPABASE_TABLES.SEC_USER)
            .update({
                username: username_input,
            })
            .eq("user_id", user_id_input);

        return handleCUDRsponseStatus(
            CRUD_OP.UPDATE,
            responseStatus,
            statusText
        );
    } catch (e) {
        console.error(`${FILE_LOC_ERR_STRING}| createUserEntry`);
        console.error(e);
    }
};
export const updateStatsUsername = async (
    user_id_input: string,
    username_input: string
) => {
    try {
        const { status: responseStatus, statusText } = await supabaseClient
            .from(SUPABASE_TABLES.USER_STATS)
            .update({
                username: username_input,
            })
            .eq("user_id", user_id_input);

        //check for status update
        return handleCUDRsponseStatus(
            CRUD_OP.UPDATE,
            responseStatus,
            statusText
        );
    } catch (e) {
        console.error(`${FILE_LOC_ERR_STRING}| initializeStats`);
        console.error(e);
    }
};
