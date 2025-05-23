import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
    const error = useRouteError();

    const errorMessage = (error: unknown): string => {
        if (isRouteErrorResponse(error)) {
            return `${error.status} ${error.statusText}`;
        } else if (error instanceof Error) {
            return error.message;
        } else if (typeof error === "string") {
            return error;
        } else {
            console.error(error);
            return "Unknown error";
        }
    };

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{errorMessage(error)}</i>
            </p>
        </div>
    );
};

export default ErrorPage;
