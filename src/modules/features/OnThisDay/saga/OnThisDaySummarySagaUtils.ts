import { WebServiceURLs } from "@modules/root/webservice/WebserviceURLs";
import {
    IArticleBriefObject,
    IArticleDetail,
    IArticleDetailObject,
    IOtdCardData,
    IOtdCardPageData,
    IOtdPageData,
    IOtdWikiData,
    ISetFeedArticlePayload,
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
    for (const key in queryObject.pages) {
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

export const transformOtdFeedResponse = (
    type: string,
    wikiData: IOtdWikiData[]
): ISetFeedArticlePayload => {
    const specialTopics: string[] = [ON_THIS_DAY_TOPICS.BIRTHS, ON_THIS_DAY_TOPICS.DEATHS]
    const cardMap = new Map<number, IOtdCardData[]>(); // <year, cardData>
    let transformMethod = transformEventPages;
    if (specialTopics.includes(type))
        transformMethod = transformBirthDeathPages;

    wikiData.forEach((article) => {
        const { text: event, pages, year= new Date().getFullYear() } = article;
        const cardData: IOtdCardData = {
            year: year,
            event: event,
            tag: type,
            pages: transformMethod(pages) || null,
        };

        const existingData = cardMap.get(year);
        // Can be optimized
        if (!existingData) cardMap.set(year, [cardData]);
        else cardMap.set(year, [...existingData, cardData]);
    });

    // Convert back to object since all dupes are gone
    return {
        type,
        events: Object.fromEntries(cardMap.entries())
    };
};

// Avoiding articles with this, since they are redundant
const BIRTH_AVOID_ARTICLE_DESC = "Day of the year";
// Using a special transform for birth pages as API delivers the date page ( e.g. 2nd of September)
// for every article assigned
export const transformBirthDeathPages = (
    pagesData: IOtdPageData[]
): IOtdCardPageData[] | null => {
    //guard clause
    if (!pagesData || pagesData.length == 0) return null;

    const transformedPages: IOtdCardPageData[] = [];

    for (let i = 0; i < pagesData.length; ++i) {
        const page = {
            pageId: pagesData[i].pageid,
            title: pagesData[i].normalizedtitle,
            description: pagesData[i].description,
            extract: pagesData[i].extract_html, // just because there's formatting already.
            thumbnail: pagesData[i].thumbnail,
            tid: pagesData[i].tid,
        };
        if (page.description == BIRTH_AVOID_ARTICLE_DESC) continue;
        else transformedPages.push(page);
    }
    return transformedPages;
};

export const transformEventPages = (
    pagesData: IOtdPageData[]
): IOtdCardPageData[] | null => {
    //guard clause
    if (!pagesData || pagesData.length == 0) return null;
    const transformedPages: IOtdCardPageData[] = pagesData.map((pageData) => ({
        pageId: pageData.pageid,
        title: pageData.normalizedtitle,
        description: pageData.description,
        extract: pageData.extract_html, // just because there's formatting already.
        thumbnail: pageData.thumbnail,
        tid: pageData.tid,
    }));

    return transformedPages;
};

export const buildOnThisDayQuery = (
    type = ON_THIS_DAY_TOPICS.ALL,
    day = "01",
    month = "01"
): string => {
    let builtURL = "";
    

    // build string;
    builtURL = WebServiceURLs.WIKI_ON_THIS_DAY.replace("{event_type}", type)
        .replace("{month}", month)
        .replace("{day}", day);
    console.log(`Built query url: ${builtURL}`);
    return builtURL;
};
