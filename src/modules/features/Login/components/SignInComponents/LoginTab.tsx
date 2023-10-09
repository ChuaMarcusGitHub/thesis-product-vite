import {
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    Button,
} from "@chakra-ui/react";
import React, { useRef } from "react";

export interface ILoginTabProps {
    onClose: () => void;
}

const LoginTab: React.FC<ILoginTabProps> = ({ onClose }) => {
    const initialRef = useRef(null);

    const renderComponent = () => (
        <>
            <ModalBody pb={6}>
                <FormControl>
                    <FormLabel>E-mail </FormLabel>
                    <Input ref={initialRef} placeholder="E-mail" />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Password</FormLabel>
                    <Input placeholder="Password" />
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme="blue" mr={3}>
                    Login
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </>
    );
    return renderComponent();
};

export default LoginTab;
