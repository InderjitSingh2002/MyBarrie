var express = require('express');
const Category = require('../models/category');
var router = express.Router();

/* GET categories index page. */
router.get('/', function(req, res) {
    Category.find((err, categories) => {
        if(err) {
            console.log(err)
        }
        else {

            res.render('categories/index', { title: 'Categories | My Barrie' , categories: categories});
        }
    })
});

/* GET categories create page. */
router.get('/create', function(req, res, next) {
    res.render('categories/create', { title: 'Create New | Categories | My Barrie' });
  });


/* POST method for categories create page. Submits the form data to the database */
router.post('/create', function(req, res) { 
    Category.create(req.body, (err, category) => {
    if (err) {
        console.log(err)
        res.end(err)
    }
    else {
        res.redirect('/categories')
    }
})
  });
module.exports = router;
