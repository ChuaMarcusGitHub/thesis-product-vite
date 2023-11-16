import {
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    Button,
    Text,
} from "@chakra-ui/react";
import { loginSession } from "@src/modules/root/authprovider/actions/AuthActions";
import { IAuthErrorPayload } from "@src/modules/root/authprovider/types/AuthSessionTypes";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

export interface ILoginTabProps {
    onClose: () => void;
    isActive: boolean;
    authError: IAuthErrorPayload | null;
}

const LoginTab: React.FC<ILoginTabProps> = ({ onClose, authError = null }) => {
    const dispatch = useDispatch();

    // State
    const [email, setEmail] = useState("test1@gmail.com");
    const [password, setPassword] = useState("password");

    // Ref
    const initialRef = useRef(null);

    // Method handler
    const login = () =>
        dispatch(loginSession({ email: email, password: password }));

    //Render Methods
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
                {authError?.isError && (
                    <Text color={"red"} marginTop={"20px"}>
                        {authError.errorMsg}
                    </Text>
                )}
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
