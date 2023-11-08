import {
    Button,
    Stack,
    useDisclosure,
    UseToastOptions,
} from "@chakra-ui/react";
import SignInModal from "@modules/features/Login/components/SignInComponents/SignInModal";
import {
    initializeOnThisDay,
    loadBriefArticle,
    loadDetailedArticle,
} from "@modules/features/OnThisDay/actions/OnThisDaySummaryActions";
// import ContentDetailModal from "@src/modules/features/OnThisDay/component/ContentComponent/ContentDetailModal";
import {
    initSession,
    logoutSession,
    // signUpSession,
} from "@modules/root/authprovider/actions/AuthActions";
import {
    getIsLoggedIn,
    getSessionData,
} from "@modules/root/authprovider/selector/AuthSelector";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
// import SummaryCard from "./modules/features/OnThisDay/component/ContentComponent/SummaryCard";

// import sampleFeed from "@rsc/sampleResponse/sampleFeedResponse.json";
// import { getSelectedDetailedArticle } from "./modules/features/OnThisDay/selector/OnThisDaySummarySelector";
import {
    getUserStats,
    updateUserStats,
    userSignup,
} from "./modules/features/Login/actions/LoginActions";
import { SignInTabType } from "./modules/features/Login/types/LoginComponentTypes";
import { useToastHook } from "./modules/features/MessageToast/hook/useToastHook";
// const testSample = JSON.parse(JSON.stringify(sampleFeed));

function App() {
    // Colour Mode
    // const { colorMode, toggleColorMode } = useColorMode();

    // const iframeUrl3 =
    //     "/api/wikidetail/api.php?action=parse&format=json&page=Berlin&prop=text|headhtml";
    // // const iframeUrl4 = "/api/wikidetail/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=Berlin";
    // const testUrl = "jwyyocimufwwpegtzgpt.supabase.co/functions/v1/hello-world";

    const query = "Berlin";

    const dispatch = useDispatch();
    const sessionData: Session | null | undefined = useSelector(getSessionData);
    const isLoggedIn: boolean = useSelector(getIsLoggedIn);
    // const testArticle = useSelector(getSelectedDetailedArticle);

    const [openToast, newToast] = useToastHook();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isContentOpen,
        onOpen: contentOpen,
        // onClose: contentClose,
    } = useDisclosure();

    let timerId: NodeJS.Timeout;
    // const [propsData, setPropsData] = useState();
    // const [propsDesc, setPropsDesc] = useState();

    useEffect(() => {
        dispatch(initSession());
    }, []);

    useEffect(() => {
        console.log(" ----Fetching Session ------");
        dispatch(initSession());

        // timerId = setTimeout(() => {
        //     console.log(testSample[0]);
        // }, 3000);

        console.log(`isContent Open: ${isContentOpen}`);
        console.log(contentOpen);

        return () => clearTimeout(timerId);
    }, []);

    useEffect(() => {
        console.log(" ----Is Logged In ------");
        console.log(isLoggedIn);
    }, [isLoggedIn]);

    useEffect(() => {
        if (sessionData) {
            console.log("--------Session Data Existing [Start[--------");
            console.log(sessionData);
            console.log("--------Session Data Existing [End]--------");
        } else console.log("--------No Session Data--------");
    }, [sessionData]);

    const logout = () => dispatch(logoutSession());

    const handleBriefOpenContent = (query: string) => {
        dispatch(loadBriefArticle(query));
        // contentOpen();
    };
    const handleDetailedOpenContent = (query: string) => {
        dispatch(loadDetailedArticle({ title: query, shouldClear: true }));
        // contentOpen();
    };
    const handleFeedOpenContent = () => {
        dispatch(initializeOnThisDay());
    };

    const handleURLCall = () => {
        const uuid = "db650c1a-653c-406c-82ef-3c06e85b8d2b";
        dispatch(getUserStats(uuid));
    };
    const handleUpdateDB = () => {
        const uuid = "db650c1a-653c-406c-82ef-3c06e85b8d2b";
        dispatch(
            updateUserStats({
                userId: uuid,
                articlesRead: 10,
                timeSpent: 99.92,
            })
        );
    };
    const handleSignUp = () => {
        dispatch(
            // signUpSession({ email: "test3@gmail.com", password: "password" })
            userSignup({
                email: "test3@gmail.com",
                username: "mimosa3",
                password: "Seventyseven7s!",
            })
        );
    };

    const handleOpenToast = () => {
        const testToast: UseToastOptions = {
            position: "top",
        };
        newToast(testToast);
    };
    // ----- Sandbox ---------

    // const testSummaryCard = () => (
    //     <SummaryCard
    //         pageData={propsData}
    //         eventDescript={propsDesc}
    //         handleClick={() => {
    //             console.log("Card was clicked");
    //         }}
    //     />
    // );

    // const lightModeTest = () => (
    //     <Button onClick={toggleColorMode}>
    //         Toggle {colorMode === "light" ? "Dark" : "Light"}
    //     </Button>
    // );

    // const modalTest = () => (
    //     <ContentDetailModal
    //         onClose={contentClose}
    //         isOpen={isContentOpen}
    //         title={"Test iFrame"}
    //     />
    // );

    const renderApplication = () => {
        return (
            <div>
                <div> Welcome to the internet, Have a look around</div>
                {isLoggedIn ? (
                    <div>
                        <div> Hi, You're logged in! </div>
                        <button onClick={logout}> Logout Now!</button>
                    </div>
                ) : (
                    <div>
                        <button onClick={onOpen}> Login Now! </button>
                        <SignInModal
                            onClose={onClose}
                            isOpen={isOpen}
                            activeTab={SignInTabType.Login}
                        />
                    </div>
                )}
                <div>
                    <button onClick={() => handleBriefOpenContent(query)}>
                        Open Brief Content
                    </button>
                </div>

                <div>
                    <button onClick={() => handleDetailedOpenContent(query)}>
                        Open Detailed Content
                    </button>
                </div>

                <div>
                    <button onClick={() => handleFeedOpenContent()}>
                        Open Feed Content
                    </button>
                </div>
                <Stack gap={4}>
                    <Button onClick={handleURLCall}>Button</Button>
                    <Button onClick={handleUpdateDB}>Update the DB</Button>
                    <Button onClick={handleSignUp}>Handle Signup</Button>
                    <Button onClick={handleOpenToast}>{` OpenToast`}</Button>
                </Stack>

                {/* <a rel="noopener noreferrer" href={"https://en.wikipedia.org/api/rest_v1/page/html/Berlin"} target="_blank">Open a new wikiLink</a> */}
            </div>
        );
    };

    return renderApplication();
}

export default App;
