import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    useColorMode,
} from "@chakra-ui/react";
import { colourModeContainer } from "@src/modules/features/OnThisDay/component/Pages/OnThisDayDashboardComponentProps";

const ColourModeSwitch: React.FC = () => {
    // Colour Mode
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === "dark";

    const renderComponent = () => (
        <Box {...colourModeContainer}>
            <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="colour-mode" mb="0">
                    Colour Mode:
                </FormLabel>
                <Button onClick={toggleColorMode} gap={2}>
                    {isDark ? <MoonIcon /> : <SunIcon />}
                    {isDark ? "Dark" : "Light"} Mode
                </Button>
            </FormControl>
        </Box>
    );

    return renderComponent();
};

export default ColourModeSwitch;
