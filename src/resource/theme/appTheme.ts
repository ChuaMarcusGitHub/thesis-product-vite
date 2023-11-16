// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { cardTheme } from "./cardTheme";

// 2. Add your color mode config
const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
    ...config,
    components: {
        Card: cardTheme,
    },
});

export default theme;
