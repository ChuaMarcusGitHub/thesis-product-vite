import { Box, Button, HStack, useDisclosure } from "@chakra-ui/react";
import {
    initSession,
    logoutSession,
} from "@src/modules/root/authprovider/actions/AuthActions";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getIsMobileDevice } from "../../Common/Utils/UtilsMethods";
import { IUserStats } from "../types/LoginActionPayloadTypes";
import { SignInTabType } from "../types/LoginComponentTypes";
import SignInComponents from "./SignInComponents/SignInModal";
import { mobileSignInContainerBox, signInContainerBox } from "./SignInContainerStyles";

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
    const isMobileDevice = getIsMobileDevice();
    // State
    const [tabValue, setTabValue] = useState<SignInTabType>(
        SignInTabType.Login
    );

    useEffect(() => {
        dispatch(initSession());
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
    const renderSignInUpButtons = () => (
        <HStack gap={4}>
            <Button onClick={() => handleSignInUp(SignInTabType.Login)}>
                Log In
            </Button>
            <Button onClick={() => handleSignInUp(SignInTabType.SignUp)}>
                Sign Up
            </Button>
        </HStack>
    );
    const renderMobileSignUpInSet = (children: React.ReactNode) => (
        <Box {...mobileSignInContainerBox}>{children}</Box>
    );
    const renderSignUpInSet = (children: React.ReactNode) => (
        <Box {...signInContainerBox}>{children}</Box>
    );

    const renderSignOutSet = () => (
        <Box {...signInContainerBox}>
            <HStack gap={4}>
                <Box>{`Welcome, ${userData?.username || "unnamed"}!! `}</Box>
                <Button onClick={() => handleLogout()}>Log out</Button>
            </HStack>
        </Box>
    );

    const renderComponent = () => {
        return (
            <Box width={"100%"} padding={"4px"} height={"100%"}>
                {isLoggedIn
                    ? // For Logout
                      renderSignOutSet()
                    : // For Login
                    isMobileDevice
                    ? renderMobileSignUpInSet(renderSignInUpButtons())
                    : renderSignUpInSet(renderSignInUpButtons())}
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
