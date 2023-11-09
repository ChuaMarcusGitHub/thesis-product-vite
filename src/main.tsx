import ReactDOM from "react-dom/client";

import * as React from "react";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./modules/root/store/store";
import { AuthProvider } from "@modules/root/authprovider/component/AuthProvider";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./resource/theme/appTheme";
import router from "./modules/root/store/routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthProvider>
                <ChakraProvider theme={theme}>
                    <ColorModeScript
                        initialColorMode={theme.config.initialColorMode}
                    />
                    <RouterProvider router={router} />
                </ChakraProvider>
            </AuthProvider>
        </Provider>
    </React.StrictMode>
);
