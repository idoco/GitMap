
const express       = require('express');
const bodyParser    = require('body-parser');

const Entry         = require('./Entry');
const EntriesUtil   = require('./EntriesUtil');

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
            EntriesUtil.addNewEntries(file, unprocessedEntries);
        } catch (e) {
            console.error("Failed to update entries: ", e);
        }
    }
}, interval);
