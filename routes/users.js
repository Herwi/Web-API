var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    req.getConnection(function(err,conn){
        if(err)
        {
            console.error('SQL connection error: ', err);
            return next(err);
        }
        else
        {
            var selectSQL = "SELECT id, name, surname FROM users";
            var query = conn.query(selectSQL, function(err,result){
                if(err)
                {
                    console.error('SQL error: ', err);
                    return next(err);
                }
                res.render('users', { title: 'Users', isUsers: true, results: result });
            });
        }
    });
});

module.exports = router;