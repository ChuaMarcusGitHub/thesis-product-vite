import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    TabList,
    Tab,
    TabPanels,
    Tabs,
    TabPanel,
} from "@chakra-ui/react";
import LoginTab from "./LoginTab";
import {
    activeTabIndex,
    LoginErrorTypes,
    SignInTabType,
} from "@features/Login/types/LoginComponentTypes";
import SignUpTab from "./SignUpTab";
import { getAuthError } from "@src/modules/root/authprovider/selector/AuthSelector";
import { useDispatch, useSelector } from "react-redux";
import { IAuthErrorPayload } from "@src/modules/root/authprovider/types/AuthSessionTypes";
import { clearAuthError } from "@src/modules/root/authprovider/actions/AuthActions";
import { getSignupErrors } from "../../selector/LoginSelector";

export interface ILoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    activeTab: SignInTabType;
    isLoggedIn: boolean;
}
const SignInComponents: React.FC<ILoginModalProps> = ({
    isOpen,
    onClose = () => console.error("LoginModal onClose Method undefined!"),
    activeTab = SignInTabType.Login,
}) => {
    const dispatch = useDispatch();
    //state
    const [tabIndex, setTabIndex] = useState(0);

    // Selector
    const loginAuthError: IAuthErrorPayload | null = useSelector(getAuthError);
    const errorSelectors: LoginErrorTypes[] = useSelector(getSignupErrors);

    // Effects
    useEffect(() => {
        setTabIndex(activeTabIndex[activeTab]);
    }, [activeTab]);

    // component Methods
    const handleIndexChange = (index: number) => {
        setTabIndex(activeTabIndex[index]);
    };

    const handleClose = () => {
        if (loginAuthError?.isError) dispatch(clearAuthError());
        onClose();
    };
    const renderComponent = () => (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                <Tabs
                    index={tabIndex}
                    onChange={handleIndexChange}
                    isLazy
                    role={"tab"}
                >
                    <TabList role={"tablist"}>
                        <Tab>Log into Account</Tab>
                        <Tab>Sign Up</Tab>
                    </TabList>

                    <TabPanels role={"tabpanel"}>
                        <TabPanel>
                            <LoginTab
                                authError={loginAuthError}
                                onClose={handleClose}
                                isActive={tabIndex === 0}
                            />
                        </TabPanel>
                        <TabPanel>
                            <SignUpTab
                                errorSelectors={errorSelectors}
                                onClose={handleClose}
                                isActve={tabIndex === 1}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </ModalContent>
        </Modal>
    );
    return renderComponent();
};

export default SignInComponents;
