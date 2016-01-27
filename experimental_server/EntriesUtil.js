const fs            = require('fs');
const GitExecUtil   = require('./GitExecUtil');


function EntriesUtil() {}

EntriesUtil.validSymobls = ["rocket", "industrial", "clothing-store"];

EntriesUtil.addNewEntries = function (file, newEntries) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) return console.log(err);

        var geoJson = JSON.parse(data);
        var existingEntries = geoJson.features;

        while (newEntries.length > 0){
            var newEntry = newEntries.pop();
            if (existingEntries.length >= 100) {
                existingEntries.shift();
            }
            existingEntries.push(newEntry);
        }

        var geoJsonAsString = JSON.stringify(geoJson, null, 4);
        fs.writeFile(file, geoJsonAsString, 'utf8', function (err) {
            if (err) return console.log(err);

            GitExecUtil.commitData("", file, "Api server adding new entries");

        });
    });
};

EntriesUtil.validateEntry = function (entry) {
    var lng = entry.geometry.coordinates[0];
    var lat = entry.geometry.coordinates[1];
    var title = entry.properties['title'];
    var description = entry.properties['description'];
    var symbol = entry.properties['marker-symbol'];

    if (isNaN(lat) || isNaN(lng)) {
        throw "coordinates must be numbers";
    }

    if (lat > 90 || lat < -90 || lng > 180 || lng < -180) {
        throw "coordinates out of range";
    }

    if (this.validSymobls.indexOf(symbol) < 0) {
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
module.exports = EntriesUtil;