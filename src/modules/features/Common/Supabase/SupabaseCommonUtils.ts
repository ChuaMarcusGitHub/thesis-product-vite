import { CRUD_OP, SUPABASE_RESPONSE } from "./SupabaseCommonTypes";

export const handleCUDRsponseStatus = (
    operation: CRUD_OP,
    responseStatus: number,
    statusText: string
) => {
    if (
        responseStatus &&
        responseStatus !== getOperationSuccessCode(operation)
    ) {
        console.error(
            `Error encountered in Supabase when performing ${operation}, Error Msg:`,
            statusText
        );
        return {
            success: false,
            errorMessage: statusText,
        };
    }
    return { success: true, errorMessage: "" };
};

const getOperationSuccessCode = (operation: CRUD_OP) => {
    switch (operation) {
        case CRUD_OP.INSERT:
            return SUPABASE_RESPONSE.INSERT_SUCCESS;
        case CRUD_OP.UPDATE:
        default:
            return SUPABASE_RESPONSE.UPDATE_SUCCESS;
    }
};

export const getTimeStamptz = (parameterDate = new Date()) => {
    return parameterDate.toISOString();
};
