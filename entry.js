function Entry(options) {
    this.type = "Feature";
    this.geometry = {
        "type": "Point",
        "coordinates": [
            options.lng,
            options.lat
        ]
    };
    this.properties = {
        "title": options.title,
        "description": options.description,
        "marker-symbol": options.symbol,
        "marker-size": "large"
    };
}

var symbols = ["rocket", "industrial", "clothing-store"];

function createRandomEntry() {
    var randomFiveCharString = Math.random().toString(36).substr(2,5);
    var randomLat = (90 * Math.random() - 22.5).toFixed(3);
    var randomLng = (180 * Math.random() - 90).toFixed(3);
    var randomSymbol = symbols[Math.floor(Math.random()*symbols.length)];

    return new Entry({
        "lat": randomLat,
        "lng": randomLng,
        "title": "This is the title " + randomFiveCharString,
        "description": "And this is a long description " + randomFiveCharString,
        "symbol": randomSymbol
    });
}