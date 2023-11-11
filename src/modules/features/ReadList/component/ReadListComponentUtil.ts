import {
    IReadingCardData,
    IReadlistObject,
} from "@features/onThisDay/type/OnThisDayCommonTypes";

export const transformReadListObjectToList = (
    readList: IReadlistObject
): IReadingCardData[] => {
    const readArray: IReadingCardData[] = [];

    for (const page of Object.values(readList)) readArray.push(page);
    return readArray;
};
