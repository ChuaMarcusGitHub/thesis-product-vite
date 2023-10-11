import { IArticleDetailObject, IOtdWikiData } from "./OnThisDayCommonTypes";

export interface IArticleDetailResponse {
    parse: IArticleDetailObject;
}

export interface IArticleBriefResponse {
    batchcomplete?: string;
    warnings: {
        extracts: {
            "*": string;
        };
    };
    query: any; // Any is used because response returns a pageID; dependent on the article being selected
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