export enum API_SUPPORTED_LANGUAGES {
    ENGLISH = "en",
    GERMAN = "de",
    FRENCH = "fr",
    SWEDISH = "sv",
    PORTUGUESE = "pt",
    RUSSIAN = "ru",
    SPANISH = "es",
    ARABIC = "ar",
    BOSNIAN = "bs",
}
export const ON_THIS_DAY_TOPICS = {
    EVENTS: "events",
    DEATHS: "deaths",
    BIRTHS: "births",
    HOLIDAYS: "holidays",
    SELECTED: "selected",
    ALL: "all",
}

export interface IOtdWikiData {
    text: string;
    pages: IOtdPageData[];
    year: number;
}
export interface IThumbnailData {
    source: string;
    width: number;
    height: number;
}
export interface IContentUrlData {
    //used for containing url links
    page: string;
    revisions: string;
    edit: string;
    talk: string;
}
export interface IOtdPageData {
    type: string;
    title: string;
    displaytitle: string;
    namespace: {
        id: number;
        text: string;
    };
    wikibase_item: string;
    titles: {
        canonical: string;
        normalized: string;
        display: string; // HTML
    };
    pageid: number;
    thumbnail: IThumbnailData;
    originalimage: IThumbnailData;
    lang: string;
    dir: string;
    revision: string;
    tid: string;
    timestamp: string; // yyyy-m,m-ddTHH:MMLssZ
    description: string;
    description_source: string;
    content_urls: {
        desktop: IContentUrlData;
        mobile: IContentUrlData;
    };
    extract: string;
    extract_html: string;
    normalizedtitle: string;
}

export interface IBriefArticleObject {
    pageId: number;
    ns: number;
    title: string;
    extract: string;
}

export interface IBriefArticleQueryObj {
    [pageId: number]: IBriefArticleObject
}

// Converted into local data for state storage
// Also used for keeping in DB (for history/favourites)
export interface IOtdCardPageData{
    pageId: number;
    title: string;
    description: string;
    extract: string;
    thumbnail: IThumbnailData;
    tid: string;
}
export interface IOtdCardData {
    year: number;
    event: string;
    pages: IOtdCardPageData[] | null;
    tag: string;
}

export interface ISetFeedArticlePayload{
    events: IOtdFeedObject;
    type: string
}

export interface IOtdFeedObject {
    [key: number]: IOtdCardData[];
}
export interface IOnThisDaySummaryDataState {
    events?: IOtdFeedObject;
    deaths?: IOtdFeedObject;
    births?: IOtdFeedObject;
    holidays?: IOtdFeedObject;
    selected?: IOtdFeedObject;
    selectedArticle?: {
        detailed?: string | TrustedHTML | null;
        brief?: IArticleBriefObject;
    };
}
export interface IArticleHtml {
    article: string;
}
export interface IArticleBriefObject {
    pageId?: number;
    title: string;
    extract?: string;
}
/* Not used -- to be deleted by end of project*/
/*
    Sub-objects of the article response
*/
interface IArticleDetailLangLinks {
    lang: string;
    url: string;
    langname: string;
    autonym: string;
    "*": string;
}
interface IArticleDetailCategories {
    sortkey: string;
    hidden: string;
    "*": string;
}
interface IArticleDetailLinksTemplates {
    ns: number;
    exists: string;
    "*": string;
}
interface IArticleDetailSections {
    toclevel: number;
    level: string;
    line: string;
    number: string;
    index: string;
    fromtitle: string;
    byteoffset: number;
    anchor: string;
    linkAnchor: string;
}
interface IArticleDetailIWLinks {
    prefix: string;
    url: string;
    "*": string;
}
interface IArticleDetailProperties {
    name: string;
    "*": string;
}

export interface IArticleDetailObject {
    headhtml: {
        ["*"]: string;
    };
    title: string;
    pageid: number;
    revid: number;
    text: {
        "*": string;
    };
    langlinks: IArticleDetailLangLinks[];
    categories: IArticleDetailCategories[];
    links: IArticleDetailLinksTemplates[];
    templates: IArticleDetailLinksTemplates[];
    images: string[];
    externallinks: string[];
    sections: IArticleDetailSections[];
    showtoc: string;
    parsewarnings: string[];
    displaytitle: string;
    iwlinks: IArticleDetailIWLinks[];
    properties: IArticleDetailProperties[];
}
export interface IArticleDetail {
    displayTitle?: string;
    headHTML: string;
    textHTML?: string;
    title?: string;
    pageId?: number;
}
/* Not used -- to be deleted by end of project --- end*/
