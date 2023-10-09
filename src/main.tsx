import ReactDOM from 'react-dom/client'

import * as React from "react";
import { } from "react-dom"
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./modules/root/store/store";
import Routing from "./modules/root/store/routes";
import { AuthProvider } from "@modules/root/authprovider/component/AuthProvider";
import { ChakraProvider } from "@chakra-ui/react";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <Provider store={store}>
            <AuthProvider>
                <BrowserRouter>
                    <ChakraProvider>
                        <Routing />
                    </ChakraProvider>
                </BrowserRouter>
            </AuthProvider>
        </Provider>
    </React.StrictMode>
)
