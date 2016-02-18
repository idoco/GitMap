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

Entry.validateEntry = function (entry) {
    var symbols = ["rocket", "industrial", "clothing-store"];

    var lng = entry.geometry.coordinates[0];
    var lat = entry.geometry.coordinates[1];
    var title = entry.properties.title;
    var description = entry.properties.description;
    var symbol = entry.properties['marker-symbol'];

    if (isNaN(lat) || isNaN(lng)) {
        throw "coordinates must be numbers";
    }

    if (lat > 90 || lat < -90 || lng > 180 || lng < -180) {
        throw "coordinates out of range";
    }

    if (symbols.indexOf(symbol) < 0) {
        throw "Not a valid symbol";
    }

    if (typeof title != 'string' || typeof description != 'string') {
        throw "Content must be text";
    }

    if (title.length > 100) {
        throw "Title too long";
    }

    if (description.length > 2000) {
        throw "Description too long";
    }
};

// used for testing
Entry.createRandomEntry = function () {
    var symbols = ["rocket", "industrial", "clothing-store"];
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
};

module.exports = Entry;
