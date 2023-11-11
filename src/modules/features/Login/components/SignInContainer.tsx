import { Box, Button, HStack, useDisclosure } from "@chakra-ui/react";
import { logoutSession } from "@src/modules/root/authprovider/actions/AuthActions";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IUserStats } from "../types/LoginActionPayloadTypes";
import { SignInTabType } from "../types/LoginComponentTypes";
import SignInComponents from "./SignInComponents/SignInModal";

interface ISignInComtainerProps {
    isLoggedIn: boolean;
    userData: IUserStats | null;
}
const SigninContainer: React.FC<ISignInComtainerProps> = ({
    isLoggedIn = false,
    userData = null,
}) => {
    // Constants
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    // State
    const [tabValue, setTabValue] = useState<SignInTabType>(
        SignInTabType.Login
    );

    useEffect(() => {
        // dispatch(initSession());
    }, []);

    useEffect(() => {
        if (isLoggedIn && isOpen) onClose();
    }, [isLoggedIn, isOpen]);

    // COmponent methods
    const handleSignInUp = (keyTab: SignInTabType) => {
        setTabValue(keyTab);
        onOpen();
    };

    const handleLogout = () => dispatch(logoutSession());
    // Render Methods
    const renderSignUpInSet = () => (
        <Box display={"flex"} justifyContent={"flex-start"}>
            <HStack gap={4}>
                <Button onClick={() => handleSignInUp(SignInTabType.Login)}>
                    Log In
                </Button>
                <Button onClick={() => handleSignInUp(SignInTabType.SignUp)}>
                    Sign Up
                </Button>
            </HStack>
        </Box>
    );

    const renderSignOutSet = () => (
        <Box display={"flex"} justifyContent={"space-evenly"}>
            <HStack gap={4}>
                <Box>{`Welcome, ${userData?.username || "unnamed"}!! `}</Box>
                <Button onClick={() => handleLogout()}>Log out</Button>
            </HStack>
        </Box>
    );

    const renderComponent = () => {
        return (
            <Box border={"1px solid black"} width={"100%"}>
                {isLoggedIn ? renderSignOutSet() : renderSignUpInSet()}
                <SignInComponents
                    isLoggedIn={isLoggedIn}
                    isOpen={isOpen}
                    onClose={onClose}
                    activeTab={tabValue}
                />
            </Box>
        );
    };

    return renderComponent();
};

export default SigninContainer;
