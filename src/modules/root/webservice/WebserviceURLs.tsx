
export enum WebServiceURLs {
    TEST_URL = "/",
    ON_THIS_DAY = "api.wikimedia.org/feed/v1/wikipedia/en/onthisday/{event_type}/{month}/{day}",    
    WIKI_ON_THIS_DAY= "api.wikimedia.org/feed/v1/wikipedia/{lang}/onthisday/{type}/{month}/{day}",
    WIKIPEDIA_EXTRACT = "{lang}.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format={format}&exintro=&titles={article}",
    WIKIPEDIA_PARSED = "{lang}.wikipedia.org/w/api.php?action=parse&format={format}&page={page}&prop=text|headhtml", // unused - no styling
    WIKIPEDIA_FULL = "wikipedia.org/wiki/{article}"
}

