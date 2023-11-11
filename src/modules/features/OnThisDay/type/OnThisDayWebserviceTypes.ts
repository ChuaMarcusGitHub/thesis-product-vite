import {
    basicErrorTemplate,
    basicSuccessTemplate,
} from "@features/Toast/type/ToastTypes";
import {
    ARTICLE_TYPE,
    IBriefArticleQueryObj,
    IOtdCardPageData,
    IOtdWikiData,
} from "./OnThisDayCommonTypes";

export interface IArticleDetailResponse {
    parse: string;
}

export interface IArticleBriefResponse {
    batchcomplete?: string;
    warnings: {
        extracts: {
            "*": string;
        };
    };
    query: IBriefArticleQueryObj;
    /*
        sample object - query:{
            "3354":{
                pageId:3354,
                ns: 0,
                title: "Berlin",
                extract: "....html <document>"
            }
        }
     */
}
export interface IOnThisDayResponse {
    [type: string]: IOtdWikiData[];
}

export interface IAnalyticsDataArticlePayload {
    descriptionLength: number;
    eventType: string;
    pageData?: IOtdCardPageData;
    articleType: ARTICLE_TYPE;
    onCloseHandler: () => void;
}

export interface IReadlistCUDObject {
    user_id: string;
    updated_at: string;
    read_list_data: typeof JSON;
}

// ---------- Toast Objects/Interfaces -----------
export enum OTD_ERROR_KEY {
    LOAD_ARTICLE = "loadArticle",
    FETCH_ARTICLE = "fetchArticles",
    NOT_AUTHED = "notAuth",
    READLIST_FAIL = "readlistFail",
}
export enum OTD_TOAST_MSG {
    READLIST_SUCCESS = "readListSuccess",
    REMOVE_PAGE_SUCCESS ="removePageSuccess"
}

export const OTD_MSG_OBJ = {
    readListSuccess: {
        ...basicSuccessTemplate,
        title: "Added to Read list!",
    },
    removePageSuccess:{
        ...basicSuccessTemplate,
        title: "Removed from Read list!"
    }
};

export const OTD_ERROR_OBJECTS = {
    fetchArticles: {
        description: "Unable to fetch articles!",
        ...basicErrorTemplate,
    },
    loadArticle: {
        description: "Unable to load Article!",
        ...basicErrorTemplate,
    },
    notAuth: {
        ...basicErrorTemplate,
        title: "Not Logged In!",
        description: "Log in to use read list!",
    },
    readlistFail: {
        ...basicErrorTemplate,
        title: "Unable to update Readlist",
    },
};
