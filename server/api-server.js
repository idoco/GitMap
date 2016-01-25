
const express    = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

const router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Incoming '+req.method+' request: '+JSON.stringify(req.body));
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Hooray! welcome to our api!' });
});

router.post('/', function(req, res) {
    var body = req.body;
    res.json({
        message: 'Something will happen on post',
        echo: body
    });
});

app.use('/api', router);
app.listen(port);

console.log('Magic happens on port ' + port);