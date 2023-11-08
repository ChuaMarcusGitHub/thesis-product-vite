import {
    ARTICLE_TYPE,
    IArticleCategory,
    IOtdCardPageData,
    IOtdFeedObject,
    IUpdateActiveTabPayload,
    ON_THIS_DAY_TOPICS,
} from "@features/OnThisDay/type/OnThisDayCommonTypes";
import { ISelectOption } from "@src/modules/features/Common/types/FormTypes";
import {
    IDateObject,
    ITabCheckbox,
} from "@features/OnThisDay/type/OnThisDayComponentTypes";
import { IAnalyticsDataArticlePayload } from "../../../type/OnThisDayWebserviceTypes";
import { ISendAnalyticsModalDataPayload } from "@src/modules/features/Common/Analytics/types/AnalyticsPayloadTypes";

export const getAccordianYearsFromProps = (
    typeEvents: IOtdFeedObject
): string[] => {
    const years: string[] = [];
    for (const year in typeEvents) {
        years.push(year);
    }
    return years;
};
export const getPopulatedArticles = (
    typeEvents: IArticleCategory,
    activeTabs: IUpdateActiveTabPayload
): string[] => {
    const tabSelections: string[] = [];
    for (const eventType in typeEvents) {
        if (typeEvents?.[eventType] !== null && activeTabs[eventType]) {
            if (eventType === ON_THIS_DAY_TOPICS.SELECTED)
                tabSelections.unshift(eventType);
            else tabSelections.push(eventType);
        }
    }
    return tabSelections;
};
export const returnArrayOfIndexes = (): number[] => {
    const finalIndex = 300;
    const indexArray = [];
    for (let index = 0; index < finalIndex; ++index) {
        indexArray.push(index);
    }
    return indexArray;
};

export const getDefaultActiveTabs = (): string[] => {
    const tabArray: string[] = [];
    for (const value of Object.values(ON_THIS_DAY_TOPICS)) {
        if (value === ON_THIS_DAY_TOPICS.ALL) tabArray.unshift(value);
        else tabArray.push(value);
    }
    return tabArray;
};
export const transformActiveTabPayload = (
    activeTabs: ITabCheckbox[]
): IUpdateActiveTabPayload => {
    let payload: IUpdateActiveTabPayload = {};
    activeTabs.forEach((tab) => {
        payload = {
            ...payload,
            [tab.type]: tab.isChecked,
        };
    });

    return payload;
};
export const getMonths = (monthsObject: {
    [month: string]: number;
}): string[] => {
    const months: string[] = [];

    for (const month in monthsObject) {
        months.push(month);
    }
    return months;
};
export const getDaysInMonth = (year: number, month: number): number => {
    //february check
    if (month === 1) return 29; // accounting for leap years
    else return new Date(year, month, 0).getDate();
};
export const getMonthOptions = (months: {
    [month: string]: number;
}): ISelectOption[] => {
    const monthOptions = [];

    for (const month of Object.keys(months)) {
        const newOption: ISelectOption = { value: months[month], label: month };
        monthOptions.push(newOption);
    }

    return monthOptions;
};
export const generateDate = (): IDateObject => {
    const randMonth = Math.floor(Math.random() * 12); // 12 Months
    const maxDates = getDaysInMonth(new Date().getFullYear(), randMonth);
    const randDate = Math.floor(Math.random() * maxDates);

    return {
        month: randMonth,
        date: randDate,
    };
};
export const countWords = (textBlock: string): number => {
    if (!textBlock) return 0;
    return textBlock.split(" ").length;
};

export const transformToAnalyticsArticlePayload = (
    pageData: IOtdCardPageData,
    eventDescription: string,
    topic: string,
    onCloseHandler = () => {},
    articleType = ARTICLE_TYPE.BRIEF
): IAnalyticsDataArticlePayload => {
    return {
        descriptionLength: countWords(eventDescription),
        pageData: pageData,
        eventType: topic,
        articleType: articleType,

        onCloseHandler: onCloseHandler,
    };
};

export const transformToAnalyticsModalPayload = (
    pageData: IOtdCardPageData | null,
    tabOpenTime: Date,
    lastActiveTab: ARTICLE_TYPE
): ISendAnalyticsModalDataPayload | null => {
    if (!pageData) return null;
    const tabCloseTime: Date = new Date();
    const timeDifferenceMS = tabCloseTime.getTime() - tabOpenTime.getTime();

    return {
        articleId: pageData.pageId || -255,
        articleTitle: pageData.title || null,
        articleType: lastActiveTab,
        openAt: tabOpenTime.toISOString(),
        closeAt: tabCloseTime.toISOString(),
        timeSpentMS: timeDifferenceMS,
    };
};
