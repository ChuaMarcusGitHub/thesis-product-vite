
export enum WebServiceURLs {
    TEST_URL = "/",
    WIKI_ON_THIS_DAY = "/api/wikiday/en/onthisday/{event_type}/{month}/{day}",    
    WIKI_ON_THIS_DAY_LANG= "/api/wikiday/{lang}/onthisday/{event_type}/{month}/{day}", // extension with language currently incompatiable
    WIKIPEDIA_EXTRACT = "/api/wikidetail/api.php?action=query&origin=*&prop=extracts&format={format}&exintro=&titles={article}",
    WIKIPEDIA_FULL = "/api/wikidetail/api.php?action=parse&format=json&page=Berlin&prop=text|headhtml"
}

