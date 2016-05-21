var path = require('path'),
    sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database(path.resolve(__dirname + '/db.sqlite3'));

db.run('CREATE TABLE IF NOT EXISTS presence (timestamp INTEGER, presence INTEGER)');

module.exports = {
    savePresence: function(presence) {
        console.log(`INSERT INTO presence VALUES (${Date.now()}, ${presence})`);
        db.run(`INSERT INTO presence VALUES (${Date.now()}, ${presence})`);
    },

    getAllPresence: function() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM presence', (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results);
            });
        });
    }
};
