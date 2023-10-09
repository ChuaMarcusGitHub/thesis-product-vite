import supabaseClient from "@client/supabaseClient";
import { IAuthLoginEmail, IAuthSessionObject } from "../types/AuthSessionTypes";

export const fetchSessionData = async () => {
    const { data, error }: IAuthSessionObject =
        await supabaseClient.auth.getSession();
    if (error) throw error;
    // --- no visible error
    return data;
};

export const loginEmail = async (credentials: IAuthLoginEmail) => {
    const { data, error }: IAuthSessionObject =
        await supabaseClient.auth.signInWithPassword(credentials);
    if (error) throw error;
    return data;
};

export const logout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
    return true;
};
