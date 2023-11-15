import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
    // define the part you're going to style

    header: {
        paddingBottom: "2px",
    },
    body: {
        paddingTop: "2px",
    },
    footer: {
        paddingTop: "2px",
    },
});

const sizes = {
    md: definePartsStyle({
        container: {
            border: "1px solid grey",
            borderRadius: "10px",
            _dark: {
                border: "1px solid #495770",
            },
        },
    }),
};

export const cardTheme = defineMultiStyleConfig({ baseStyle, sizes });
