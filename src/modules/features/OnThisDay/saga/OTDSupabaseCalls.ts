// const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
import supabaseClient from "@src/clientfolder/supabaseClient";
import {
    CRUD_OP,
    SUPABASE_TABLES,
} from "@features/Common/Supabase/SupabaseCommonTypes";
import { handleCUDRsponseStatus } from "@features/Common/Supabase/SupabaseCommonUtils";
import { IReadlistObject } from "../type/OnThisDayCommonTypes";

const FILE_LOC_ERR_STRING = "Error encountered in OnThisDaySupabase Calls |";
export const supaAddToReadList = async (
    user_id_input: string,
    payload: IReadlistObject
) => {
    try {
        const { status: responseStatus, statusText } = await supabaseClient
            .from(SUPABASE_TABLES.USER_STATS)
            .insert({
                user_id: user_id_input,
                updated_at: new Date().toISOString(),
                read_list_data: payload,
            });

        return handleCUDRsponseStatus(
            CRUD_OP.INSERT,
            responseStatus,
            statusText
        );
    } catch (e) {
        console.error(`${FILE_LOC_ERR_STRING}| supaGetUserStats`, e);
    }
};

export const supaFetchReadlist = async (user_id_input: string) => {
    try {
        const { data: userReadlist, error } = await supabaseClient
            .from(SUPABASE_TABLES.USER_READLIST)
            .select("*")
            .eq("user_id", user_id_input)
            .single();

        if (error) {
            console.error(error);
            return null;
        }

        return userReadlist;
    } catch (e) {
        console.error(`${FILE_LOC_ERR_STRING}| supaGetUserStats`, e);
    }
};
