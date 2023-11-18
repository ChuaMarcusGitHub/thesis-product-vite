const DEVICE_WIDTH = 430;

export const getIsMobileDevice = (): boolean => {
    return window.outerWidth <= DEVICE_WIDTH;
};
