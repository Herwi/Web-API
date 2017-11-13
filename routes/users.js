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
            var selectSQL = "SELECT id, name, surname, birthDate, password FROM users";
            var query = conn.query(selectSQL, function(err,result){
                if(err)
                {
                    console.error('SQL error: ', err);
                    return next(err);
                }
                var users = new Array();
                for(var i = 0; i < result.length; i++) {
                    var currentUser = new User(result[i].id, result[i].name, result[i].surname, result[i].birthDate, result[i].password);
                    users.push(currentUser);
                }
                res.render('users', { title: 'Users', isUsers: true, users: users });
            });
        }
    });
});

router.get('/:id', function(req, res, next) {
    req.getConnection(function(err,conn){
        if(err)
        {
            console.error('SQL connection error: ', err);
            return next(err);
        }
        else
        {
            var selectSQL = "SELECT id, name, surname, DATE_FORMAT(birthDate, '%d %M %Y') AS 'birthDate', password FROM users WHERE id=" + req.params.id;
            var query = conn.query(selectSQL, function(err,result){
                if(err)
                {
                    console.error('SQL error: ', err);
                    return next(err);
                }
                if(result.length == 0)
                {
                    res.render('user-details', {
                        title: 'Error',
                        doesUserExists: false,
                        id: req.params.id
                    });
                }
                else
                {
                    var currentUser = new User(result[0].id, result[0].name, result[0].surname, result[0].birthDate, result[0].password);
                    res.render('user-details', {
                        title: currentUser.name + " " + currentUser.surname,
                        doesUserExists: true,
                        user: currentUser
                    });
                }
            });
        }
    });
});

module.exports = router;