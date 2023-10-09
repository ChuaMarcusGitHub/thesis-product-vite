import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    Button,
    useDisclosure,
    TabList,
    Tab,
    TabPanels,
    Tabs,
    TabPanel,
} from "@chakra-ui/react";
import LoginTab from "./LoginTab";

export interface ILoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}
const SignInComponents: React.FC<ILoginModalProps> = ({
    isOpen,
    onClose = () => console.error("LoginModal onClose Method undefined!"),
}) => {
    const renderComponent = () => (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton onClick={onClose}/>
                <Tabs>
                    <TabList>
                        <Tab>Log into Account</Tab>
                        <Tab>Sign Up</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <LoginTab onClose={onClose} />
                        </TabPanel>
                        <TabPanel>
                            <div> Nobody here but us Chickens!</div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </ModalContent>
        </Modal>
    );
    return renderComponent();
};

export default SignInComponents;
