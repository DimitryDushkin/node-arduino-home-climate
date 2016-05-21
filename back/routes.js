var express = require('express'),
    router = express.Router(),
    path = require('path'),
    db = require('./db');

/* GET home page. */
router.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});

router.get('/graph', (req, res) => {
    db
        .getAllPresence()
        .then(rows => res.send(rows));
});

module.exports = router;
