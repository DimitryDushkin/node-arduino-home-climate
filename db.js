var MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017/home';

module.exports = function(stateEmitter) {

    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.error(err);
            return;
        }

        var presenceCollection = db.collection('presence');

        console.log('Connected correctly to mongodb');

        stateEmitter.on('state-change', (state) => {
            presenceCollection.insertOne({
                timestamp: Date.now(),
                presence: state.presence
            });
        });

    });

};
