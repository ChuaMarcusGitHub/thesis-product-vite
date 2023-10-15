import { IArticleCategory, IOtdFeedObject } from "@features/OnThisDay/type/OnThisDayCommonTypes";

export const getAccordianYearsFromProps = (typeEvents: IOtdFeedObject): string[] =>{

    const years: string[] = [];
    for(const year in typeEvents){
        years.push(year);
    }
    return years;
}
export const getPopulatedArticles = (typeEvents: IArticleCategory): string[] =>{
    const tabSelections: string[] = [];
    for(const eventType in typeEvents){
        if(typeEvents?.[eventType] !== null) tabSelections.push(eventType);
    }
    return tabSelections;
}