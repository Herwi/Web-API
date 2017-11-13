var express = require('express');
var router = express.Router();
var User = require('../bin/user.js');
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { layout: false, title: 'Login', success: req.session.success, errors: req.session.errors});
  req.session.errors = null;
  req.session.success = null;
});

router.post('/submit', function(req, res, next) {
  // Check validity
    req.check('inputLogin', "Invalid login").isLength({min: 5, max: 16});
    req.check('inputPassword', 'Invalid password').isLength({min: 8});

    var errors = req.validationErrors();
    if(errors) {
      req.session.errors = errors;
      req.session.success = false;
    }
    else
    {
        req.getConnection(function(err,conn){
            if(err)
            {
                console.error('SQL connection error: ', err);
                return next(err);
            }
            else
            {
                var selectSQL = "SELECT id, name, surname, DATE_FORMAT(birthDate, '%d %M %Y') AS 'birthDate', password FROM users WHERE login='" + req.body.inputLogin + "'";
                var query = conn.query(selectSQL, function(err,result){
                    if(err)
                    {
                        console.error('SQL error: ', err);
                        return next(err);
                    }
                    if(result.length == 0)
                    {
                        req.session.success = false;
                        //req.session.errors = "Username or password is invalid.";
                    }
                    else
                    {
                        var currentUser = new User(result[0].id, result[0].name, result[0].surname, result[0].birthDate, result[0].password);
                        req.session.user = currentUser;
                        if(currentUser.password == crypto.createHash('sha256').update(req.body.inputPassword).digest('base64'))
                        {
                            req.session.success = true;
                        }
                        else
                        {
                            //req.session.errors = "Username or password is invalid.";
                            req.session.success = false;
                            req.session.user = null;
                        }
                    }
                });
            }
        });
    }
    res.redirect('/login');
});

module.exports = router;
