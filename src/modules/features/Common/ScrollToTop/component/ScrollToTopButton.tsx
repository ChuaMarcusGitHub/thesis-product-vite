import { ChevronUpIcon } from "@chakra-ui/icons";
import { Fade, IconButton } from "@chakra-ui/react";

export interface IScrollToTopButton {
    triggerVisible: boolean;
    handleClick: () => unknown;
}
const ScrollToTopButton: React.FC<IScrollToTopButton> = ({
    triggerVisible = false,
    handleClick = () => console.warn(`Scroll to Top HandleClick not defined!`),
}) => {
    
    const renderComponent = () => (
        <span
            style={{
                height: "100px",
                width: "50px",
                position: "fixed",
                bottom: "20px",
                left: "92%",
            }}
        >
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
