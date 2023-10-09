import { WebServiceURLs } from "@modules/root/webservice/WebserviceURLs";
import {
    IArticleBriefObject,
    IArticleDetail,
    IArticleDetailObject,
    ON_THIS_DAY_TOPICS,
} from "../type/OnThisDayCommonTypes";

// Constants for validation
export const INVALID_SEARCH_PAGE = "-1";
/**
 *
 * @param response Type is any because the original response has way too many params that aren't used.
 *  @returns IArticleDetail type object for easier manipulation of data in Frontend
 */
export const transformDetailedArticleObject = (
    response: IArticleDetailObject
): IArticleDetail => {
    const displayTitle = response.displaytitle || "";
    const title = response.title || "";
    const textHTML = response.text?.["*"] || "N/A";
    const pageId = response.pageid || -1;
    const headHTML = response.headhtml?.["*"] || "";

    return {
        displayTitle,
        title,
        headHTML,
        textHTML,
        pageId,
    };
};

export const transformBriefArticleObject = (
    queryObject: any
): IArticleBriefObject | null => {
    // Guard Clause, not a valid response Object
    if (!queryObject.pages) return null;

    let pageKey = "-1";
    for (let key in queryObject.pages) {
        console.log(key);
        if (key === INVALID_SEARCH_PAGE)
            throw Error("Search query resulted in Invalid page!");
        // Valid non "-1" key
        pageKey = key.toString();
    }

    const briefArticleObj: IArticleBriefObject = {
        title: queryObject?.pages?.[pageKey].title,
        pageId: queryObject?.pages?.[pageKey].title,
        extract: queryObject?.pages?.[pageKey].extract,
    };

    console.log("----Transformed Article Object -------");
    console.log(briefArticleObj);

    return briefArticleObj;
};

export const buildOnThisDayQuery = (
    type = ON_THIS_DAY_TOPICS.ALL,
    day = 1,
    month = 1
): string => {
    let builtURL = WebServiceURLs.ON_THIS_DAY;
    let queryDay = "";
    if (day < 10) queryDay = `0${day}`;
    else queryDay = day.toString();

    let queryMonth = "";
    if (month < 10) queryMonth = `0${month}`;
    else queryMonth = month.toString();

    // build string;
    builtURL
        .replace("{event_type}", type)
        .replace("{month}", queryMonth)
        .replace("{day}", queryDay);
    console.log(`Built query url: ${builtURL}`);
    return builtURL;
};
