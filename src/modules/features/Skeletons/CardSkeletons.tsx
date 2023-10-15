import {
    Skeleton,
    SkeletonCircle,
    SkeletonText,
} from "@chakra-ui/react";
import classNames from "classnames/bind";
import styles from "./SkeletonStyles.module.scss";
import { ICommonSkeletonProps } from "./SkeletonTypes";

const cx = classNames.bind(styles);

export const CardSkeleton = (skelProps: ICommonSkeletonProps) => {
    return (
        <div className={cx("skeletonContainer")}>
            <div className={cx("skeletonHeader")}>
                <SkeletonCircle size={"10"} {...skelProps}/>
                <Skeleton height={10} width={"80%"} {...skelProps}/>
            </div>
            <div className={cx("skeletonBody")}>
                <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                    {...skelProps}
                />
            </div>
        </div>
    );
};
