import { Box, Button, HStack, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { SignInTabType } from "../types/LoginComponentTypes";
import SignInComponents from "./SignInComponents/SignInModal";

const SigninContainer: React.FC = () => {
    // Constants
    const { isOpen, onOpen, onClose } = useDisclosure();
    // State
    const [tabValue, setTabValue] = useState<SignInTabType>(
        SignInTabType.Login
    );

    useEffect(() => {
        // dispatch(initSession());
    }, []);

    // COmponent methods
    const handleSignInUp = (keyTab: SignInTabType) => {
        setTabValue(keyTab);
        onOpen();
    };
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

    const renderComponent = () => {
        return (
            <Box border={"1px solid black"} width={"100%"}>
                {renderSignUpInSet()}
                <SignInComponents
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
