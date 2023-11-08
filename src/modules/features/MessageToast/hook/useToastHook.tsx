import { useToast, UseToastOptions } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TOAST_STATUS } from "../type/ToastTypes";

const DEFAULT_POPUP_DURATION = 3000;
export const useToastHook = () => {
    const toast = useToast();
    const [toastOptions, setToastOptions] = useState<UseToastOptions>();

    useEffect(() => {
        if (toastOptions) {
            const {
                duration = DEFAULT_POPUP_DURATION,
                status = TOAST_STATUS.SUCCESS,
                isClosable = true,
                title = "",
                description = "",
            } = toastOptions;

            toast({
                ...toastOptions,
                title: title,
                description: description,
                duration: duration,
                status: status,
                isClosable: isClosable,
            });
        }
    }, [toastOptions, toast]);

    return [toastOptions, setToastOptions];
};

export default useToastHook;
