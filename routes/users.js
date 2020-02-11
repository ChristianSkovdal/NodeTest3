var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  
  try {

    const sqlite3 = require('sqlite3');

    let db = new sqlite3.Database('./data/celLman.db', (err) => {
      if (err) {
        throw err;
      }

      let sql = `SELECT DISTINCT name,password FROM users`;

      db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }

        let r = [];
        rows.forEach((row) => {
          r.push({
            "name": row.name,
            "password": row.password,
          })
        });
        res.end(JSON.stringify(r));

      });


    });

  } catch (error) {
    res.end(error);
  }

});

module.exports = router;
