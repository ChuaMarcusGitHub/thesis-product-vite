import React, { useEffect, useState } from "react";

import { Session, User } from "@supabase/supabase-js";
import supabaseClient from "src/clientfolder/supabaseClient";


// import { createClient, PostgrestSingleResponse } from "@supabase/supabase-js";

// export const PROJECT_URL = "https://dyynwwvhlxtdjpzuyxtj.supabase.co";
// export const PROJECT_API_KEY =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5eW53d3ZobHh0ZGpwenV5eHRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyMTczNDgsImV4cCI6MjAxMDc5MzM0OH0.cSEw6Fz3r8-12XksgqOpVPeMxkIyUA_F1dQn4UAi6Fg";
// const supabase = createClient(PROJECT_URL, PROJECT_API_KEY);

const App: React.FC = () => {
    const [session, setSession] = useState<Session | null>();
    const [user, setUser] = useState<User | null>(null);
    // const [message, setMessage] = useState("");

    const [username, setUsername] = useState("mimosa2");
    const [email, setEmail] = useState("test1@gmail.com");
    const [password, setPassword] = useState("password");

    useEffect(() => {
        retrieveSession();
        supabaseClient.auth.onAuthStateChange((event, _session) => {
            switch (event) {
                case "SIGNED_IN":
                    setSession(_session);
                    if (_session) setUser(_session.user);
                    break;
                case "SIGNED_OUT":
                    setUser(null);
                    setSession(null);
                    break;
                default:
                    break;
            }
        });
    }, []);

    useEffect(() => {
        console.log(session);
        console.log(`logged in as :`);
        console.log(user);
    }, [session]);

    const login = async () => {
        await supabaseClient.auth.signInWithOAuth({
            provider: "github",
        });
    };
    const emailLogin = async () => {
        await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password,
        });
    };
    const signUp = async (e: any) => {
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
        });
        if (data) {
            console.log("data got");
            console.log(data.session);
            console.log("user got");
            console.log(data.user);

            const { data: _data, error: _error } = await supabaseClient
                .from("SEC_USER")
                .insert([
                    {
                        user_id: data.user?.id,
                        email: email,
                        username: username,
                    },
                ]);
            if (_data) {
                console.log("insert data");
                console.log(_data);
            }
            if (_error) {
                console.warn("insert errror");
                console.warn(_error);
            }
        }
        if (error) {
            console.warn("error got");
            console.warn(error);
        }
    };

    const logout = async () => {
        await supabaseClient.auth.signOut();
    };

    const retrieveSession = async () => {
        const promisedSession = await supabaseClient.auth.getSession();
        return promisedSession;
    };

    const superBaseTestRender = () => (
        <div>
            {user ? (
                <div>
                    <p> Authenticated</p>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <>
                    <button onClick={login}> Login with Github</button>
                    <p>
                        <div>
                            <div>
                                <label>Username: </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label>Email: </label>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Password: </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <p>
                                <button onClick={(e) => signUp(e)}>
                                    Sign up
                                </button>
                            </p>
                            <p>
                                <button onClick={emailLogin}> Login</button>
                            </p>
                        </div>
                    </p>
                </>
            )}
        </div>
    );

    return superBaseTestRender();
};

export default App;
