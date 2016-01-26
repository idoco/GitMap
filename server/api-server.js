
const express       = require('express');
const bodyParser    = require('body-parser');

const Entry         = require('./Entry');
const EntriesUtil   = require('./EntriesUtil');
const GitExecUtil   = require('./GitExecUtil');

var pathToRepo = require("path").resolve("");

const port = process.env.PORT || 8080,
    interval = 10 * 1000,
    file = "test.geojson";
var unprocessedEntries = [];


// create express app
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

// middleware  requests
router.use(function(req, res, next) {
    console.log('Incoming '+req.method+' request: '+JSON.stringify(req.body));
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// register post handler
router.post('/', function(req, res) {
    if (unprocessedEntries.length >= 100) {
        unprocessedEntries.shift();
    }
    unprocessedEntries.push(new Entry(req.body));
    res.json({
        message: 'Ok'
    });
});

app.use('/api', router);
app.listen(port);

console.log('Magic happens on port ' + port);

// process entities loop
setInterval(function() {
    if (unprocessedEntries.length > 0) {
        try {
            EntriesUtil.addNewEntriesToFile(file, unprocessedEntries);
            GitExecUtil.commitData(pathToRepo, file, "Api server adding new entries");
        } catch (e) {
            console.error("Failed to update entries: ", e);
        }
    }
}, interval);
