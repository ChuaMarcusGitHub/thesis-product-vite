import { useToast, UseToastOptions } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setToastData } from "../actions/ToastActions";
import { TOAST_STATUS } from "../type/ToastTypes";

const DEFAULT_POPUP_DURATION = 2000;
export const useToastHook = () => {
    const dispatch = useDispatch();
    const toast = useToast();
    const [toastOptions, setToastOptions] = useState<UseToastOptions | null>();

    const defaultClose = () => {
        dispatch(setToastData(null));
        setToastOptions(null);
    };

    useEffect(() => {
        let closeHandler = defaultClose;
        if (toastOptions) {
            const {
                duration = DEFAULT_POPUP_DURATION,
                status = TOAST_STATUS.SUCCESS,
                isClosable = true,
                title = "",
                description = "",
                onCloseComplete,
            } = toastOptions;

            if (onCloseComplete) {
                closeHandler = () => {
                    onCloseComplete();
                    defaultClose();
                };
            }
            toast({
                ...toastOptions,
                title: title,
                description: description,
                duration: duration,
                status: status,
                isClosable: isClosable,
                onCloseComplete: closeHandler,
            });
        }
    }, [toastOptions, toast]);

    return [toastOptions, setToastOptions] as const;
};

export default useToastHook;
