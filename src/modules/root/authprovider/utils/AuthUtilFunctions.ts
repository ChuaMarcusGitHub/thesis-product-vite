import supabaseClient from "@client/supabaseClient";
import { Session } from "@supabase/supabase-js";
import {
    IAuthLoginEmail,
    IAuthSessionObject,
    ISessionResponse,
} from "../types/AuthSessionTypes";

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

export const setUserSession = async (session: Session) => {
    try {
        console.log("Supabase | Setting Session");
        const { data: sessionData, error: setSessionError } =
            await supabaseClient.auth.setSession(session);

        if (setSessionError) {
            console.log("=== Set Session Error ===");
            return { error: setSessionError, status: false };
        } else if (sessionData) {
            console.log("===Set Session Success===");
            console.log("Session Data:", sessionData);
            return {
                sessionData: sessionData,
                status: true,
            };
        }
    } catch (e) {
        console.error("Error encountered at Supabase | setUserSession!");
        console.error(e);

        return { sessionError: e, status: false };
    }
};

export const getUserSession = async () => {
    try {
        console.log("Supabase | Performing getSession...");
        const { data: sessionData, error: sessionError }: IAuthSessionObject =
            await supabaseClient.auth.getSession();

        if (sessionError) {
            console.error(
                "Encountered Error while fetching userSession: ",
                sessionError
            );
            return { error: sessionError, status: false };
        } else if (sessionData.session) {
            console.info("===Session Data available===");
            console.log(sessionData);
            return { session: sessionData.session, status: true, error: null };
        }
        // --- no visible error nor session
        return {
            session: null,
            error: {
                message: "Unable to get sesssion data nor error!!",
                name: "Auth Error",
                status: -1,
            },
            status: false,
        };
    } catch (e) {
        console.error(`error encountered while performing getUserSession`);
        console.error(e);
    }
};
