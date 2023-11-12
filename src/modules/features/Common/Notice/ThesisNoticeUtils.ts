import noticeListJSON from "@rsc/notice/noticeList.json";

const noticeList: typeof noticeListJSON = JSON.parse(
    JSON.stringify(noticeListJSON)
);
export const getNoticeList = (): string[] => {
    return noticeList.noticeList.map((notice) => notice);
};
