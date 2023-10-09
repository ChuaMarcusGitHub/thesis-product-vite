export enum STATUS_TEXT {
    OK = "OK",
    NOT_FOUND = "Not Found"
}
export enum WEBSERVICE_MODE{ 
    CORS = "cors",
    NO_CORS = "no-cors",
    SAME_ORIGIN = "same-origin",
}

export enum WEBSERVICE_METHOD {
    GET  ="GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
}

export enum REFERRER_POLICY_OPTIONS {
    NO_REFERRER = "no-referrer",
    NO_REFERRER_WHEN_DOWNGRADE = "no-referrer-when-downgrade",
    SAME_ORIGIN = "same-origin",
    STRICT_ORIGIN = "strict-origin",
    ORIGIN_WHEN_CROSS_ORIGIN = "origin-when-cross-origin",
    STRICT_ORIGIN_WHEN_CROSS_ORIGIN = "strict-origin-when-cross-origin",
    UNSAFE_URL = "unsafe-url",
}

export interface IWebserviceOptions {
    method?: WEBSERVICE_METHOD | string;
    headers?: any;
    body?: any;
    mode?: WEBSERVICE_MODE;
    credentials?: any;
    omit?: any;
    "same-origin"?: any;
    include?: any;
    cache?: RequestCache;
    redirect?: RequestRedirect;
    referrer?: string;
    referrerPolicy?: REFERRER_POLICY_OPTIONS;
    integrity?: string;
    keepalive?: any;
    signal?: AbortSignal;
    crossorigin?: boolean;
    [key: string]: any | undefined;
}


