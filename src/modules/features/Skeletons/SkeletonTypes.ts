export const DEFAULT_FADE_DURATION = 1;

// Everything should extend from this
export interface ICommonSkeletonProps {
    isLoaded?: boolean;
    fadeDuration: number;
}