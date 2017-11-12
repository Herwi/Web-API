var express = require('express');
var router = express.Router();
var User = require('../bin/user.js');


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
                var Users = new Array();
                for(var i = 0; i < result.length; i++) {
                    var CurrentUser = new User(result[i].id, result[i].name, result[i].surname);
                    Users.push(CurrentUser);
                }
                res.render('users', { title: 'Users', isUsers: true, Users: Users });
            });
        }
    });
});

module.exports = router;