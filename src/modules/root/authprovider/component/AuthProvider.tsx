import React, { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearSessionData, initSession } from "../actions/AuthActions";

// interface IAuthContextType {
//     session: Session | null | undefined;
//     user: User | null | undefined;
//     signOut: () => void;
// }

//Creating a context for authentication - sample code from (https://github.com/daniellaera/react-supabase-auth-provider/blob/main/src/hooks/Auth.tsx)
export const AuthProvider = ({ children }: any) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initSession());

        return () => {
            dispatch(clearSessionData());
        };
    }, [dispatch]);

    const provider = () => <>{children}</>;
    return provider();
};
