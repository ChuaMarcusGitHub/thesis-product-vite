export const leaderboardPageContainer = {
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
    rowStart: [5, 5, 2],
    rowEnd: [6, 6, 5],
    display: "flex",
    padding: "5px",
    alignItems: "flex-end",
    borderBottom: "2px solid #D3D3D3",
};
export const titleBox = {};

export const leaderboardContainerWrapper = {
    width: "100%",
    minH: "30vh",
    maxH: "76vh",
    overflow: "scroll",
    padding: "10px",
};

export const leaderboardTableContainr = {
    width: ["80%", "60%"],
    border: "1px solid #495770",
    _dark: {
        border: "1px solid white",
    },
    borderRadius: "20px",
    padding: "5px",
};

export const tableDataStyle = {
    fontSize: "1.5rem",
    textAlign: "center",
};
export const userStatsGridItem = {
    colStart: [1, 1, 2],
    colEnd: [4, 4, 5],
    rowStart: [5, 5, 5],
    rowEnd: [6, 6, 6],
    padding: "10px",
};