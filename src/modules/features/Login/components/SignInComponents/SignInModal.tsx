import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    TabList,
    Tab,
    TabPanels,
    Tabs,
    TabPanel,
} from "@chakra-ui/react";
import LoginTab from "./LoginTab";
import {
    activeTabIndex,
    SignInTabType,
} from "@features/Login/types/LoginComponentTypes";
import SignUpTab from "./SignUpTab";

export interface ILoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    activeTab: SignInTabType;
}
const SignInComponents: React.FC<ILoginModalProps> = ({
    isOpen,
    onClose = () => console.error("LoginModal onClose Method undefined!"),
    activeTab = SignInTabType.Login,
}) => {
    //state
    const [tabIndex, setTabIndex] = useState(0);

    // Effects
    useEffect(() => {
        setTabIndex(activeTabIndex[activeTab]);
    }, [activeTab]);

    // component Methods
    const handleIndexChange = (index: number) => {
        setTabIndex(activeTabIndex[index]);
    };
    const renderComponent = () => (
        <Modal isOpen={isOpen} onClose={onClose}>
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
                                onClose={onClose}
                                isActive={tabIndex === 0}
                            />
                        </TabPanel>
                        <TabPanel>
                            <SignUpTab
                                onClose={onClose}
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
