var express = require('express');
var router = express.Router();
//routes go here!

/* GET home page. */
router.get('/blogpost', function(req, res, next) {
   knex('blogpost')

  res.render('index', { title: 'Express' });
});




router.get('/comment')


module.exports = router;
