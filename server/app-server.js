var fs = require('fs');
var file = "test.geojson";

// Playing with geoJson editing
fs.readFile(file, 'utf8', function (err, data) {
    if (err) return console.log(err);
    var geoJson = JSON.parse(data);
    var firstEntry = geoJson.features.shift();

    var randomFiveCharString = Math.random().toString(36).substr(2,5);
    var title = firstEntry.properties.title;
    title = title.substring(0,title.length - 5) + randomFiveCharString;
    firstEntry.properties.title = title;
    geoJson.features.push(firstEntry);
    var geoJsonAsString = JSON.stringify(geoJson, null, 4);

    fs.writeFile(file, geoJsonAsString, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});