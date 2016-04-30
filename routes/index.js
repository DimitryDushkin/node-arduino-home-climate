var express = require('express'),
    router = express.Router();

var MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017/home';

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});

router.get('/graph', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.error(err);
            return;
        }

        db.collection('presence').find().toArray((err, docs) => {
            res.send(docs);
            db.close();
        });
    });
});

module.exports = router;
