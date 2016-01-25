var fs = require('fs');
var file = "server/test.geojson";

const symbols = ["rocket", "industrial", "clothing-store"];

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

fs.readFile(file, 'utf8', function (err, data) {
    if (err) return console.log(err);
    var geoJson = JSON.parse(data);
    var entries = geoJson.features;

    for (var i=0; i<100; i++){
        var newEntry = createRandomEntry();
        if (entries.length >= 100) {
            entries.shift();
        }
        entries.push(newEntry);
    }

    var geoJsonAsString = JSON.stringify(geoJson, null, 4);

    fs.writeFile(file, geoJsonAsString, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});