import {
    IWebserviceOptions,
    STATUS_TEXT,
    WEBSERVICE_METHOD,
    WEBSERVICE_MODE,
} from "./WebserviceTypes";
import { WebServiceURLs } from "./WebserviceURLs";

const BASE_URL = "https://";
// const TIME_OUT = 60000; // timeout in miliseconds
// const proxy = true;

const defaultOptions: IWebserviceOptions = {
    method: WEBSERVICE_METHOD.GET,
    headers: {
        "Content-Type": "application/json",
    },
    mode: WEBSERVICE_MODE.CORS,
    crossorigin: true,
    body: undefined,
};

async function fetchWebpage(
    urlString: string | WebServiceURLs,
    _method = WEBSERVICE_METHOD.GET,
    _options?: IWebserviceOptions,
    query = "",
    newBase = BASE_URL
) {
    try {
        if (!urlString) throw Error(`Unable to find url - ${urlString}`);
        
        // String build url
        const url = `${newBase}${urlString}${query}`;
        const urlOptions = {
            ...defaultOptions,
            method: _method,
            ..._options,
        };

        const response = await fetch(url, urlOptions)
            .then((promiseObj) => {
                if (promiseObj.ok) {
                    console.log("---Fetch Webpage success----");
                    console.log(promiseObj);
                                
                    return promiseObj.text();

                } else if (promiseObj.statusText === STATUS_TEXT.NOT_FOUND)
                    throw Error(`Unable to find url - ${url}`);
                
                    else {
                    console.info(promiseObj);
                    throw Error(
                        `Error in Promise Object - ${promiseObj?.statusText}`
                    );
                }
            })
            .then((data) => {
                console.log(`Webpage retrieved from : ${url}`);
                console.log(data)
                return data;
            })
            .catch((error) => {
                console.error(`Error in Response Object`);
                console.error(error);
            });

        return response;
    } catch (e) {
        console.error(`Error Fetching Webpage using urlString: ${urlString}`);
        console.error(e);
    }
}

async function fetchURL(
    urlString: string | WebServiceURLs,
    request?: any,
    _method = WEBSERVICE_METHOD.GET,
    _options?: Partial<IWebserviceOptions>,
    query = "",
    newBase = BASE_URL
) {
    try {
        if (!urlString) throw Error(`Unable to find url - ${urlString}`);
        // String build url
        const url = `${newBase}${urlString}${query}`;

        // Set up the options (with request, method type and other options if passed in)
        // const jsonRequest = request ?  JSON.stringify(request) : undefined;
        const jsonRequest = request ? JSON.stringify(request) : null;
        const urlOptions = {
            ...defaultOptions,
            method: _method,
            body: jsonRequest,
            ..._options,
        };

        //Perform fetch
        const response = await fetch(url, urlOptions)
            .then((promiseObject) => {
                if (promiseObject.ok) {
                    return promiseObject.json();
                } else if (promiseObject.statusText === STATUS_TEXT.NOT_FOUND)
                    throw Error(`Unable to find url - ${url}`);
                else {
                    console.info(promiseObject);
                    throw Error(
                        `Error in Promise Object - ${promiseObject?.statusText}`
                    );
                }
            })
            .then((responseObject) => {
                console.log(`Response success from ${url}
            --------------------------------------------------`);
                console.log(responseObject);
                return responseObject;
            })
            .catch((responseError) => {
                console.error(responseError);
            });

        return response;
    } catch (error) {
        console.error(`Unable to fetchURL -`, error);
    }
}

export { fetchURL, fetchWebpage };
