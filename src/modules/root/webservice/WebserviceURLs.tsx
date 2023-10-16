
export enum WebServiceURLs {
    TEST_URL = "/",
    WIKI_ON_THIS_DAY = "/api/wikiday/en/onthisday/{event_type}/{month}/{day}",    
    WIKI_ON_THIS_DAY_LANG= "/api/wikiday/{lang}/onthisday/{event_type}/{month}/{day}", // extension with language currently incompatiable
    WIKIPEDIA_EXTRACT = "/api/wikidetail/w/api.php?action=query&origin=*&prop=extracts&format={format}&exintro=&titles={article}",
    WIKIPEDIA_FULL = "/api/wikidetail/w/api.php?action=parse&format=json&page={article}&prop=text|headhtml",
    WIKIPEDIA_WEB = "/api/wikidetail/api/rest_v1/page/html/{article}"
}

export enum WebServiceURLsDev{
    WIKI_ON_THIS_DAY = "api.wikimedia.org/feed/v1/wikipedia/en/onthisday/{event_type}/{month}/{day}",    
    WIKI_ON_THIS_DAY_LANG= "api.wikimedia.org/feed/v1/wikipedia/{lang}/onthisday/{event_type}/{month}/{day}", // extension with language currently incompatiable
    WIKIPEDIA_EXTRACT = "en.wikipedia.org/w//api.php?action=query&origin=*&prop=extracts&format={format}&exintro=&titles={article}",
    WIKIPEDIA_FULL = "en.wikipedia.org/w//api.php?action=parse&format=json&page={article}&prop=text|headhtml",
    WIKIPEDIA_WEB = "en.wikipedia.org/api/rest_v1/page/html/{article}"
}

