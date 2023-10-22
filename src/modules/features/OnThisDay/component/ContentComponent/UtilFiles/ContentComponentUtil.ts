import {
    IArticleCategory,
    IOtdFeedObject,
    ON_THIS_DAY_TOPICS,
} from "@features/OnThisDay/type/OnThisDayCommonTypes";
import { ISelectOption } from "@src/modules/features/Common/types/FormTypes";
import { IDateObject } from "@features/OnThisDay/type/OnThisDayComponentTypes";

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
export const returnArrayOfIndexes = () :number[] =>{
    const finalIndex = 300;
    const indexArray = [];
    for(let index = 0; index< finalIndex; ++index){
        indexArray.push(index);
    }
    return indexArray;
}
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
