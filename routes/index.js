/**
 * http://usejsdoc.org/
 */
var express = require('express');
var router = express.Router();
var ctrlMain = require("../controllers/main");


/*
 * GET Login page.
 */
router.get('/', ctrlMain.login);

/*
 * GET Register page.
 */
router.post('/register', ctrlMain.register);

/*
 * GET Login page.
 */
router.post('/post_register', ctrlMain.post_register);

/*
 * GET home page.
 */
router.post('/home', ctrlMain.home);

/*
 * GET restaurant page.
 */
router.post('/restaurant', ctrlMain.restaurant);

/*
 * GET billing page.
 */
router.post('/billing', ctrlMain.billing);

router.post('/statistics', ctrlMain.statistics);

router.post('/review', ctrlMain.review);
router.post('/reviews', ctrlMain.reviews);
router.post('/delreview', ctrlMain.delreview);
router.post('/editreview', ctrlMain.editreview);
router.post('/charts', ctrlMain.charts);
router.get('/graphs', ctrlMain.graphs);
module.exports = router;