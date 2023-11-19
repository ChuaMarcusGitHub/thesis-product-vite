export const readListPageContainer = {
    width: "100vw",
    minH: "15vh",
    maxH: "100vh",
};
export const bannerContainer = {
    width: "100%",
    marginBottom: "5px",
};
export const bannerGrid = {
    templateColumns: ["repeat(3, 32vw)", "repeat(3, 32vw)", "repeat(4, 20vw)"],
    templateRows: ["repeat(5, 6vh)", "repeat(5, 6vh)", "repeat(5, 6vh)"],
};
export const titleGrid = {
    colStart: [1, 1, 2],
    colEnd: [4, 4, 5],
    rowStart: [4, 4, 2],
    rowEnd: [5, 5, 5],
    // bg: #ffffff,
    display: "flex",
    padding: "5px",
    alignItems: "flex-end",
    borderBottom: "2px solid #D3D3D3",
};
export const userStatsGridItem = {
    colStart: [1, 1, 2],
    colEnd: [4, 4, 5],
    rowStart: [5, 5, 5],
    rowEnd: [6, 6, 6],
    padding: "10px",
};

export const readListContainerWrapper = {
    width: "100%",
    minH: "30vh",
    maxH: ["66vh", "76vh"],
    overflow: "scroll",
};
