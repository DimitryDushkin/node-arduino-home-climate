var express = require('express'),
    router = express.Router(),
    db = require('../db');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});

router.get('/graph', (req, res) => {
    db
        .getAllPresence()
        .then((rows) => {
            res.send(rows);
        });
});

module.exports = router;
