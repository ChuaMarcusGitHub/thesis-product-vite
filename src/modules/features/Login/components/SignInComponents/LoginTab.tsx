import {
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    Button,
} from "@chakra-ui/react";
import { loginSession } from "@src/modules/root/authprovider/actions/AuthActions";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

export interface ILoginTabProps {
    onClose: () => void;
    isActive: boolean;
}

const LoginTab: React.FC<ILoginTabProps> = ({ onClose }) => {
    const dispatch = useDispatch();
    
    const [email, setEmail] = useState("test1@gmail.com");
    const [password, setPassword] = useState("password");

    const initialRef = useRef(null);

    const login = () =>
        dispatch(loginSession({ email: email, password: password }));

    const renderComponent = () => (
        <>
            <ModalBody pb={6}>
                <FormControl>
                    <FormLabel>E-mail </FormLabel>
                    <Input
                        ref={initialRef}
                        placeholder="E-mail"
                        type={"text"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        placeholder="Password"
                        type={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={login}>
                    Login
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </>
    );
    return renderComponent();
};

export default LoginTab;
