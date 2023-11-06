import { ARTICLE_TYPE, IBriefArticleQueryObj, IOtdWikiData } from "./OnThisDayCommonTypes";

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
    pageId: number;
    tid?: string;
    title: string;
    articleType: ARTICLE_TYPE;
}
