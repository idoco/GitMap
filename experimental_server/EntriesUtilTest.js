const Entry = require('./Entry');
const EntriesUtil = require('./EntriesUtil');

const symbols = EntriesUtil.validSymobls;

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

function createRandomEntryList(size) {
    var entryList = [];
    for (var i = 0; i < size; i++) {
        entryList.push(createRandomEntry());
    }
    return entryList;
}

var newEntries = createRandomEntryList(10);
var file = "server/test.geojson";

for (var i = 0; i < newEntries.length; i++) {
    var obj = newEntries[i];
    EntriesUtil.validateEntry(obj);
}

EntriesUtil.addNewEntries(file, newEntries);
