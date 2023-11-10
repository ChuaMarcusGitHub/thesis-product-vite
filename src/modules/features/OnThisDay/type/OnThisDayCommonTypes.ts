import { IReducerLoadingState } from "@src/modules/root/webservice/WebserviceTypes";
import { IContentDetailModalProps } from "../component/ContentComponent/ContentDetailModal";
import { IDateObject } from "./OnThisDayComponentTypes";

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

export enum ARTICLE_TYPE {
    INACTIVE = "INACTIVE", // only used for onload
    BRIEF = "BRIEF",
    DETAILED = "DETAILED",
}

export const Months = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
};
export const ON_THIS_DAY_TOPICS = {
    EVENTS: "events",
    DEATHS: "deaths",
    BIRTHS: "births",
    HOLIDAYS: "holidays",
    SELECTED: "selected",
    ALL: "all",
};

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
    pages: {
        [pageId: number]: IBriefArticleObject;
    };
}

// Converted into local data for state storage
// Also used for keeping in DB (for history/favourites)
export interface IOtdCardPageData {
    pageId: number;
    title: string;
    description: string;
    extract: string;
    thumbnail: IThumbnailData;
    tid: string;
}
export interface IReadingCardData extends IOtdCardPageData {
    eventDescription?: string;
    eventType: string;
}
export interface IReadlistObject {
    [pageId: number]: IReadingCardData;
}
export interface IOtdCardData {
    year: number;
    event: string;
    pages: IOtdCardPageData[] | null;
    tag: string;
}

export interface IOtdFeedObject {
    [key: number]: IOtdCardData[];
}

export interface ISetFeedArticlePayload {
    events: IOtdFeedObject;
    type: string;
}
export interface IArticleDetailedPayload {
    detailedArticle: string | TrustedHTML | null;
    pageId: number;
}
export interface ILoadArticleDetailPayload {
    title: string;
    shouldClear?: boolean;
}
export interface IUpdateActiveTabPayload {
    [tabs: string]: boolean;
}
export interface IOnThisDaySummaryDataState {
    all?: IOtdFeedObject;
    events?: IOtdFeedObject;
    deaths?: IOtdFeedObject;
    births?: IOtdFeedObject;
    holidays?: IOtdFeedObject;
    selected?: IOtdFeedObject;
    selectedArticle?: {
        detailed?: IArticleDetailedPayload;
        brief?: IArticleBriefObject;
    };
    activeTabs: {
        //tabs to be displayed on the content screen
        [tabs: string]: boolean;
    };
    modalProps: {
        data: IContentDetailModalProps;
        isOpen: boolean;
    };
    readList: IReadlistObject | null;
    loadState: IReducerLoadingState;
}
export interface IFetchEventsPayload {
    date: IDateObject;
    eventTypes: string[];
}

export interface IFetchEventsDataPayload {
    type: string;
    month: string;
    day: string;
}

export interface IArticleCategory {
    [type: string]: IOtdFeedObject | null;
}
export interface IArticleHtml {
    article: string;
}
export interface IArticleBriefObject {
    pageId?: number;
    title: string;
    extract?: string;
}
