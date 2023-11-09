export interface IDatabaseCUDResponse {
    // No "R" of CRUD
    success: boolean;
    errorMessage?: string;
}
export enum SUPABASE_TABLES {
    USER_STATS = "USER_STATS",
    SEC_USER = "SEC_USER",
    MODAL_STATS = "MODAL_STATS",
    ARTICLE_ENTRY = "ARTICLE_ENTRY",
    USER_READLIST = "USER_READLIST",
}
export enum CRUD_OP {
    INSERT = "INSERT",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
}
export enum SUPABASE_RESPONSE {
    UPDATE_SUCCESS = 204,
    INSERT_SUCCESS = 201,
}
