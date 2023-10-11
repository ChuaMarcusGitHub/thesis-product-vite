import { useDisclosure } from "@chakra-ui/react";
import SignInModal from "@modules/features/Login/components/SignInComponents/SignInModal";
import {
    initializeOnThisDay,
    loadBriefArticle,
    loadDetailedArticle,
} from "@modules/features/OnThisDay/actions/OnThisDaySummaryActions";
import ContentDetailModal from "@modules/features/OnThisDay/component/ContentComponent/ContentDetailModalProps";
import {
    initSession,
    logoutSession,
} from "@modules/root/authprovider/actions/AuthActions";
import {
    getIsLoggedIn,
    getSessionData,
} from "@modules/root/authprovider/selector/AuthSelector";
import { Session } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

function App() {
    const iframeUrl3 =
        "/api/wikidetail/api.php?action=parse&format=json&page=Berlin&prop=text|headhtml";
    const iframeUrl4 =
        "/api/wikidetail/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=Berlin";

    const dispatch = useDispatch();
    const sessionData: Session | null | undefined = useSelector(getSessionData);
    const isLoggedIn: boolean = useSelector(getIsLoggedIn);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isContentOpen,
        onOpen: contentOpen,
        onClose: contentClose,
    } = useDisclosure();

    useEffect(() => {
        console.log(" ----Fetching Session ------");
        dispatch(initSession());

        console.log(`isContent Open: ${isContentOpen}`);
        console.log(contentOpen);
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

    const handleBriefOpenContent = (url: string) => {
        // dispatch(loadDetailedArticle(url));
        dispatch(loadBriefArticle(url));
        // contentOpen();
        // dispatch(initializeOnThisDay())
    };
    const handleDetailedOpenContent = (url: string) => {
        dispatch(loadDetailedArticle(url));
        // dispatch(loadBriefArticle(url))
        // contentOpen();
        // dispatch(initializeOnThisDay())
    };
    const handleFeedOpenContent = () => {
        // dispatch(loadDetailedArticle(url));
        // dispatch(loadBriefArticle(url))
        // contentOpen();
        dispatch(initializeOnThisDay());
    };

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
                        <SignInModal onClose={onClose} isOpen={isOpen} />
                    </div>
                )}
                <div>
                    <button onClick={() => handleBriefOpenContent(iframeUrl4)}>
                        Open Brief Content
                    </button>
                </div>

                <div>
                    <button
                        onClick={() => handleDetailedOpenContent(iframeUrl3)}
                    >
                        Open Detailed Content
                    </button>
                </div>

                <div>
                    <button onClick={() => handleFeedOpenContent()}>
                        Open Feed Content
                    </button>
                </div>
                <ContentDetailModal
                    onClose={contentClose}
                    isOpen={isContentOpen}
                    title={"Test iFrame"}
                    contentUrl={iframeUrl3}
                />

                {/* <a rel="noopener noreferrer" href={"https://en.wikipedia.org/api/rest_v1/page/html/Berlin"} target="_blank">Open a new wikiLink</a> */}
            </div>
        );
    };

    return renderApplication();
}

export default App;
