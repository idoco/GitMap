
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

module.exports = Entry;