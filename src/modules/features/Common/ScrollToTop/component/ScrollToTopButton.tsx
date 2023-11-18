import { ChevronUpIcon } from "@chakra-ui/icons";
import { Fade, IconButton } from "@chakra-ui/react";
import styles from "./ScrollToTopButton.module.scss";
import classNames from "classnames/bind";
import { getIsMobileDevice } from "../../Utils/UtilsMethods";

const cx = classNames.bind({ ...styles });
export interface IScrollToTopButton {
    triggerVisible: boolean;
    handleClick: () => unknown;
}
const ScrollToTopButton: React.FC<IScrollToTopButton> = ({
    triggerVisible = false,
    handleClick = () => console.warn(`Scroll to Top HandleClick not defined!`),
}) => {
    const isMobileDevice = getIsMobileDevice();

    const renderComponent = () => (
        <span className={cx(isMobileDevice ? "mobile-span" : "web-span")}>
            <Fade in={triggerVisible}>
                <IconButton
                    onClick={handleClick}
                    height={"60px"}
                    width={"60px"}
                    isRound={true}
                    variant="solid"
                    colorScheme="teal"
                    aria-label="back-to-top"
                    icon={<ChevronUpIcon height={"55px"} width={"55px"} />}
                />
            </Fade>
        </span>
    );

    return renderComponent();
};

export default ScrollToTopButton;
