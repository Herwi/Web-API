var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    req.session.destroy();
    res.render('index', { title: 'Logout Successfully' });
});

module.exports = router;