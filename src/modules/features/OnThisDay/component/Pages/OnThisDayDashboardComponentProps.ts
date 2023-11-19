export const pageContainer = {
    width: "99vw",
    minH: "50vh",
    borderRadius: "10px",
    padding: "5px",
};
export const bannerContainer = {
    width: "100vw",
};
export const bannerGrid = {
    templateColumns: ["repeat(3, 32vw)", "repeat(3, 32vw)", "repeat(4, 20vw)"],
    templateRows: ["repeat(9, 6vh)", "repeat(9, 6vh)", "repeat(5, 6vh)"],
};
export const searchGridItem = {
    colStart: [1, 1, 2],
    colEnd: [4, 4, 5],
    rowStart: [4, 4, 2],
    rowEnd: [8, 8, 5],
};
export const searchComponentItem = {
    border: "1px solid grey",
    _dark: {
        border: "1px solid white",
    },
    borderRadius: "5px",
};
export const sessionGridItem = {
    colStart: [1, 1, 4],
    colEnd: [4, 4, 5],
};
export const colourModeGridItem = {
    colStart: [1, 1, 5],
    colEnd: [4, 4, 6],
    rowStart: [2, 2, 1],
};
export const colourModeContainer = {
    paddingLeft: "5px",
    paddingRight: "2px",
    display: "flex",
    width: "100$",
    height: "100%",
    alignItems: "center",
};
export const sideBarItem = {
    colStart: 1,
    colEnd: 2,
    rowStart: 3,
    rowEnd: 4,
    paddingLeft: 5,
    paddingTop: 2,
};
export const mobileSideBarItem = {
    ...sideBarItem,
    colEnd: 4,
    display: "flex",
    paddingRight: 2,
    justifyContent: "flex-end",
};
export const userStatsGridItem = {
    colStart: [1, 1, 2],
    colEnd: [4, 4, 5],
    rowStart: [8, 8, 5],
    rowEnd: [10, 10, 6],
    padding: "10px",
};
