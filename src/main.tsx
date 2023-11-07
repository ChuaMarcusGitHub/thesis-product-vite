import ReactDOM from "react-dom/client";

import * as React from "react";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./modules/root/store/store";
import Routing from "./modules/root/store/routes";
import { AuthProvider } from "@modules/root/authprovider/component/AuthProvider";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./resource/theme/appTheme";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthProvider>
                <BrowserRouter>
                    <ChakraProvider theme={theme}>
                        <ColorModeScript
                            initialColorMode={theme.config.initialColorMode}
                        />
                        <Routing />
                    </ChakraProvider>
                </BrowserRouter>
            </AuthProvider>
        </Provider>
    </React.StrictMode>
);
