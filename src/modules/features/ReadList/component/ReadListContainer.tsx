import { Box } from "@chakra-ui/react";
import { readListContainer } from "./ReadListContainerStyle";

export interface IReadListContainerProps {
    placeholder: string;
}
export const ReadListContainer: React.FC<IReadListContainerProps> = () => {
    const renderComponent = () => {
        return <Box {...readListContainer}></Box>;
    };

    return renderComponent();
};
export default ReadListContainer;
