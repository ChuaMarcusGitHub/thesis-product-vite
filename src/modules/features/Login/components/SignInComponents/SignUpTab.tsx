import {
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    Text,
    ModalFooter,
    Button,
    Box,
} from "@chakra-ui/react";
import { useDebounceHook } from "@src/hooks/useDebounceHook";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignup } from "../../actions/LoginActions";
import { getSignupErrors } from "../../selector/LoginSelector";
import {
    IErrorTypeChecklist,
    LoginErrorTypes,
    passwordMatchResults,
    signUpErrorMessage,
    USERNAME_LENGTH_LIMIT,
} from "../../types/LoginComponentTypes";
import {
    matchPassword,
    generateIsErrorCheckList,
    validatePassword,
    validateEmailFormat,
    validateUsername,
    validateNoFormErrors,
} from "../LoginComponentUtilMethods";
import { errorMessageProp, inputBoxProps } from "./TabStyleProps";

export interface ISignUpTabProps {
    onClose: () => void;
    isActve: boolean;
    errorSelectors: LoginErrorTypes[] | null;
}

const SignUpTab: React.FC<ISignUpTabProps> = ({ onClose, isActve, errorSelectors = [] }) => {
    const dispatch = useDispatch();

    // States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    // Error States
    const [errorChecklist, setErrorChecklist] =
        useState<IErrorTypeChecklist | null>(null);

    // Selectors
    // const errorSelectors: LoginErrorTypes[] = useSelector(getSignupErrors);

    // Ref
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    // memos
    const allFieldsPopulated = useMemo(() => {
        return email && password && confirmPassword && username;
    }, [email, password, confirmPassword, username]);

    // UseEffects
    useEffect(() => {
        const _errorChecklist = { ...errorChecklist };
        if (errorSelectors?.includes(LoginErrorTypes.USERNAME_TAKEN))
            _errorChecklist[LoginErrorTypes.USERNAME_TAKEN] = true;
        if (errorSelectors?.includes(LoginErrorTypes.EMAIL_IN_USE))
            _errorChecklist[LoginErrorTypes.EMAIL_IN_USE] = true;
        if (_errorChecklist !== errorChecklist)
            setErrorChecklist(_errorChecklist);
    }, [errorSelectors]);

    // ---"Mount/unmount" Effect
    useEffect(() => {
        if (!isActve) setErrorChecklist({});
        else if (isActve) setErrorChecklist(generateIsErrorCheckList());
    }, [isActve]);

    useEffect(() => {
        const errorList: LoginErrorTypes[] = [];
        const resultsList: boolean[] = [];

        // validate Password
        errorList.push(LoginErrorTypes.INVALID_PASSWORD);
        resultsList.push(validatePassword(password));

        //Validate Password match
        errorList.push(LoginErrorTypes.MISMATCH_PASSWORD);
        resultsList.push(
            matchPassword(password, confirmPassword) ===
                passwordMatchResults.NOT_MATCHES
        );

        toggleErrorChecklist([...errorList], resultsList);
    }, [password, confirmPassword]);

    useEffect(() => {
        const errorList: LoginErrorTypes[] = [];
        const resultArray: boolean[] = [];
        const _errorChecklist = { ...errorChecklist };
        // Resetting of existing errors
        if (_errorChecklist[LoginErrorTypes.EMAIL_IN_USE]) {
            errorList.push(LoginErrorTypes.EMAIL_IN_USE);
            resultArray.push(false);
        }

        if (_errorChecklist[LoginErrorTypes.USERNAME_TAKEN]) {
            errorList.push(LoginErrorTypes.USERNAME_TAKEN);
            resultArray.push(false);
        }

        // Validate email format
        errorList.push(LoginErrorTypes.INVALID_EMAIL);
        resultArray.push(validateEmailFormat(email));

        // Validate username
        errorList.push(LoginErrorTypes.INVALID_USERNAME);
        resultArray.push(validateUsername(username));

        toggleErrorChecklist(errorList, resultArray);
    }, [email, username]);

    // component Methods
    const toggleErrorChecklist = (
        errors: LoginErrorTypes[],
        values: boolean[]
    ) => {
        const _errorChecklist = { ...errorChecklist };

        errors.forEach((error, index) => {
            _errorChecklist[error] = values[index];
        });
        setErrorChecklist(_errorChecklist);
    };

    const handleSignup = () => {
        if (!allFieldsPopulated) {
            toggleErrorChecklist([LoginErrorTypes.MISSING_FIELDS], [true]);
        } else if (allFieldsPopulated && validateNoFormErrors(errorChecklist)) {
            if (
                errorChecklist &&
                errorChecklist[LoginErrorTypes.MISSING_FIELDS]
            )
                toggleErrorChecklist([LoginErrorTypes.MISSING_FIELDS], [false]);

            dispatch(
                userSignup({
                    username: username,
                    email: email,
                    password: password,
                })
            );
        }
    };
    const debounceEmail = useDebounceHook(() => {
        if (emailRef && emailRef.current?.value)
            setEmail(emailRef.current.value);
    });
    // username cannot be debounced due to the requirement to actively limit the input. ref cannot be used
    const debounceUsername = (_username: string) => {
        if (_username.length > USERNAME_LENGTH_LIMIT) return;
        setUsername(_username);
    };

    const debouncePassword = useDebounceHook(() => {
        if (passwordRef && passwordRef.current?.value)
            setPassword(passwordRef.current.value);
    });

    const debounceConfirmPassword = useDebounceHook(() => {
        if (confirmPasswordRef && confirmPasswordRef.current?.value)
            setConfirmPassword(confirmPasswordRef.current.value);
    });

    const getErrorMessageString = (errorTypes: LoginErrorTypes[]) => {
        const errorMsgArray: string[] = [];
        // Guard Clause
        if (!errorChecklist) return null;

        errorTypes.forEach((error) => {
            if (errorChecklist[error])
                errorMsgArray.push(signUpErrorMessage[error]);
        });
        return errorMsgArray.join(" , ");
    };
    const handleCancel = () => {
        // Clear all handlers
        setConfirmPassword("");
        setPassword("");
        setEmail("");
        setUsername("");

        onClose();
    };

    // Render methods
    const renderComponent = () => (
        <>
            <ModalBody pb={8}>
                <FormControl>
                    <Box {...inputBoxProps}>
                        <FormLabel>E-mail </FormLabel>
                        <Input
                            ref={emailRef}
                            placeholder="E-mail"
                            type={"text"}
                            // value={email}
                            onChange={debounceEmail}
                        />
                        <Text {...errorMessageProp}>
                            {getErrorMessageString([
                                LoginErrorTypes.INVALID_EMAIL,
                                LoginErrorTypes.EMAIL_IN_USE,
                            ])}
                        </Text>
                    </Box>
                    <Box {...inputBoxProps}>
                        <FormLabel>Username </FormLabel>
                        <Input
                            placeholder="Username"
                            type={"text"}
                            value={username}
                            onChange={(e) => debounceUsername(e.target.value)}
                        />
                        <Text {...errorMessageProp}>
                            {getErrorMessageString([
                                LoginErrorTypes.INVALID_USERNAME,
                                LoginErrorTypes.USERNAME_TAKEN,
                            ])}
                        </Text>
                    </Box>
                </FormControl>

                <FormControl mt={6}>
                    <Box {...inputBoxProps}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            ref={passwordRef}
                            placeholder="Password"
                            type={"password"}
                            onChange={debouncePassword}
                        />
                        <Text {...errorMessageProp}>
                            {getErrorMessageString([
                                LoginErrorTypes.INVALID_PASSWORD,
                            ])}
                        </Text>
                    </Box>
                    <Box {...inputBoxProps}>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            ref={confirmPasswordRef}
                            placeholder="confirm Password"
                            type={"password"}
                            onChange={debounceConfirmPassword}
                        />
                        <Text {...errorMessageProp}>
                            {getErrorMessageString([
                                LoginErrorTypes.MISMATCH_PASSWORD,
                            ])}
                        </Text>
                    </Box>
                </FormControl>
                <Text {...errorMessageProp}>
                    {getErrorMessageString([LoginErrorTypes.MISSING_FIELDS])}
                </Text>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSignup}>
                    Sign Up
                </Button>
                <Button onClick={handleCancel}>Cancel</Button>
            </ModalFooter>
        </>
    );
    return renderComponent();
};

export default SignUpTab;
