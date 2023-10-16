import {
    IArticleCategory,
    IOtdFeedObject,
    ON_THIS_DAY_TOPICS,
} from "@features/OnThisDay/type/OnThisDayCommonTypes";

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
    typeEvents: IArticleCategory
): string[] => {
    const tabSelections: string[] = [];
    for (const eventType in typeEvents) {
        if (typeEvents?.[eventType] !== null) {
            if (eventType === ON_THIS_DAY_TOPICS.SELECTED)
                tabSelections.unshift(eventType);
            else tabSelections.push(eventType);
        }
    }
    return tabSelections;
};
