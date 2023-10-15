import { Button, useColorMode, useDisclosure } from "@chakra-ui/react";
import SignInModal from "@modules/features/Login/components/SignInComponents/SignInModal";
import {
    initializeOnThisDay,
    loadBriefArticle,
    loadDetailedArticle,
} from "@modules/features/OnThisDay/actions/OnThisDaySummaryActions";
import ContentDetailModal from "@src/modules/features/OnThisDay/component/ContentComponent/ContentDetailModalProps";
import {
    initSession,
    logoutSession,
} from "@modules/root/authprovider/actions/AuthActions";
import {
    getIsLoggedIn,
    getSessionData,
} from "@modules/root/authprovider/selector/AuthSelector";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import SummaryCard from "./modules/features/OnThisDay/component/ContentComponent/SummaryCard";

import sampleFeed from "@rsc/sampleResponse/sampleFeedResponse.json";
const testSample = JSON.parse(JSON.stringify(sampleFeed));

function App() {
    // Colour Mode
    const { colorMode, toggleColorMode } = useColorMode();

    const iframeUrl3 =
        "/api/wikidetail/api.php?action=parse&format=json&page=Berlin&prop=text|headhtml";
    // const iframeUrl4 = "/api/wikidetail/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=Berlin";

    const query = "Berlin";

    const dispatch = useDispatch();
    const sessionData: Session | null | undefined = useSelector(getSessionData);
    const isLoggedIn: boolean = useSelector(getIsLoggedIn);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isContentOpen,
        onOpen: contentOpen,
        onClose: contentClose,
    } = useDisclosure();

    let timerId: NodeJS.Timeout;
    const [propsData, setPropsData] = useState();
    const [propsDesc, setPropsDesc] = useState();

    useEffect(() => {
        console.log(" ----Fetching Session ------");
        dispatch(initSession());

        timerId = setTimeout(() => {
            
            console.log(testSample[0]);
            setPropsData(testSample[0].pages[0]);
            setPropsDesc(testSample[0].event);
        }, 3000);

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
        dispatch(loadDetailedArticle(query));
        // contentOpen();
    };
    const handleFeedOpenContent = () => {
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
                <ContentDetailModal
                    onClose={contentClose}
                    isOpen={isContentOpen}
                    title={"Test iFrame"}
                    contentUrl={iframeUrl3}
                />
                <Button onClick={toggleColorMode}>
                    Toggle {colorMode === "light" ? "Dark" : "Light"}
                </Button>

                <SummaryCard
                    pageData={propsData}
                    eventDescript={propsDesc}
                    handleClick={() => {
                        console.log("Card was clicked");
                    }}
                />
                {/* <a rel="noopener noreferrer" href={"https://en.wikipedia.org/api/rest_v1/page/html/Berlin"} target="_blank">Open a new wikiLink</a> */}
            </div>
        );
    };

    return renderApplication();
}

export default App;
