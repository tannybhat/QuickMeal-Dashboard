var registeredUsers = [];
var mcdCount = 0;
var tcblCount = 0;
var chtbvnCount = 0;
var friesCount = 0;
var burgerCount = 0;
var sandwichCount = 0;
var quesadillaCount = 0;
var burritoCount = 0;
var lunchboxCount = 0;
var panipuriCount = 0;
var sevpuriCount = 0;
var bhelCount = 0;

let User = require('../models/modelMain');
let Review = require('../models/review');
var path = require('path');

module.exports.login = function(req, res)
{
	res.render('../views/login', { });
};

module.exports.register = function(req, res)
{
	res.render('../views/register', { title: 'Please Register!'});
};

module.exports.post_register = function(req, res)
{

	const username = req.body.username;
	const password = req.body.password;
	const email = req.body.email;

	User.findOne( { username: username}, function(err, user) {
		if(err) {
			console.log(err)
			return
		}

		if(user) {
			res.render('../views/login',{ message: "User already registered!" });
		} else {
			let newUser = new User({
				username:username,
				password:password,
				email:email,
			});
		
			newUser.save(function(err) {
				if(err) {
					console.log(err)
					return 
				} else {
					res.render('../views/login', { message: 'New User successfully Registered!', currentURL:'/views/' });
				}
			});
		}

	})

};

module.exports.home = function(req, res)
{

	let username = req.body.username;
	let password = req.body.password;

	User.findOne( { username: username}, function(err, user) {
		if(err) {
			console.log(err)
			return
		}

		if(!user) {
			res.render('../views/login',{ message: "User not found" });
		} else {
			if(password === user.password) {
				res.render('../views/home', { title: username});
			} else {
				res.render('../views/login',{ message: "Wrong Password. Please try again!" });
			}
	}

	});
	
};

module.exports.restaurant = function(req, res)
{
	if(req.body.Logout){
		res.render('../views/login', { });
	}
	else if(req.body.mcd) {
		res.render('../views/restaurant', {title: 'Mc Donalds', name:'mcd'});
	} else if(req.body.tcbl) {
		res.render('../views/restaurant', {title: 'Taco Bell', name:'tcbl'});
	} else {
		res.render('../views/restaurant', {title: 'Chaat Bhavan', name:'chtbvn'});
	}	
};

module.exports.billing = function(req, res)
{
	var order = req.body;
	var string = order.inputForm;
	var array = [];
	var text = 'Your order is'
	array = string.split(',');
	var len = array.length;
	if(len === 0) 
		res.send('Please select an item to order.');
	text = modify(text, array, len)
	res.render('../views/billing', { text });
	
};

module.exports.statistics = function(req, res)
{
	res.render('../views/statistics', {title: 'QuickMeal Statistics', friesCount: friesCount, burgerCount: burgerCount, sandwichCount:sandwichCount, burritoCount: burritoCount, quesadillaCount: quesadillaCount, lunchboxCount: lunchboxCount, panipuriCount: panipuriCount, sevpuriCount: sevpuriCount, bhelCount: bhelCount, mcdCount: mcdCount, tcblCount: tcblCount, chtbvnCount: chtbvnCount});
};

module.exports.review = function(req, res)
{
	const restaurant = req.body.restaurant;
	const text = req.body.text;

	let results;


	let newReview = new Review({
		restaurant:restaurant,
		text:text,
	});	


	newReview.save(function(err) {
		if(err) {
			console.log(err)
			return 
		} else {
			Review.find({}, function(err, re) {
				console.log(JSON.stringify(re))
				res.render('../views/review', { message: 'Review Submitted!', result: re});
			});
			// str.forEach(function (err, doc) {
            //     console.log(doc);   
            //     results.push(doc); //Push result onto results_array
        	// });  
			
		}
	});

	
};

module.exports.reviews = function(req, res) {

	let a = req.body.restaurant;
	let b = "Mc Donalds";
	let c = "Taco Bell";
	let d = "Chat Bhavan";

	if(a === 'mcd') {
		Review.find({ restaurant: b}, function(err, re) {
			console.log(JSON.stringify(re))
			res.render('../views/review_res', { message: 'Showing Mc. Donalds reviews', result: re});
		});
	} else if(a === 'tcb') {
		Review.find({ restaurant: c}, function(err, re) {
			console.log(JSON.stringify(re))
			res.render('../views/review_res', { message: 'Showing Taco Bell reviews', result: re});
		});
	} else if(a === 'chtbvn') {
		Review.find({ restaurant: d}, function(err, re) {
			console.log(JSON.stringify(re))
			res.render('../views/review_res', { message: 'Showing Chat Bhavan reviews', result: re});
		});
	}
}

module.exports.delreview = function(req, res)
{
	const rest = req.body.restaurant1;
	const rev = req.body.text1;


	let results;


	Review.deleteMany({restaurant: rest, text: rev}, function(err) {
		if(err) {
			console.log(err)
			return
		} else {
			Review.find({}, function(err, re) {
				console.log(JSON.stringify(re))
				res.render('../views/review', { message: 'Reviews Deleted!', result: re});
			});
			// str.forEach(function (err, doc) {
            //     console.log(doc);   
            //     results.push(doc); //Push result onto results_array
        	// });  
			
		}
	});

	
};

module.exports.editreview = function(req, res)
{
	const rest = req.body.restaurant2;
	const rev = req.body.rev;
	const newRev = req.body.rev_new;

	Review.updateOne({restaurant: rest , text: rev},{text: newRev}, function(err) {
		if(err) {
			console.log(err)
			return
		} else {
			Review.find({}, function(err, re) {
				console.log(JSON.stringify(re))
				res.render('../views/review', { message: 'Reviews Edites!', result: re});
			});
			// str.forEach(function (err, doc) {
            //     console.log(doc);   
            //     results.push(doc); //Push result onto results_array
        	// });  
			
		}
	});

	
};

function modify(text, array, len) {
	let x = 0;
	var y = 0;
	for(var i = 0; i <= len; i++) {
		if(array[i] === 'Fries') {
			mcdCount++;
			friesCount++;
			text = text + ', Fries';
			x=1;
			y+=5;
		}
		if(array[i] === 'Burger') {
			mcdCount++;
			burgerCount++;
			text = text + ', Burger';
			x=1;
			y+=5;
		}
		if(array[i] === 'Sandwich') {
			mcdCount++;
			sandwichCount++;
			text = text + ', Sandwich';
			x=1;
			y+=5;
		}
		if(array[i] === 'Burrito') {
			tcblCount++;
			burritoCount++;
			text = text + ', Burrito';
			x=1;
			y+=5;
		}
		if(array[i] === 'Quesadilla') {
			tcblCount++;
			quesadillaCount++;
			text = text + ', Quesadilla';
			x=1;
			y+=5;
		}
		if(array[i] === 'Lunch Box') {
			tcblCount++;
			lunchboxCount++;
			text = text + ', LunchBox';
			x=1;
			y+=5;
		}
		if(array[i] === 'Panipuri') {
			chtbvnCount++;
			panipuriCount++;
			text = text + ', Panipuri';
			x=1;
			y+=5;
		}
		if(array[i] === 'Sevpuri') {
			chtbvnCount++;
			sevpuriCount++;
			text = text + ', Sevpuri';
			x=1;
			y+=5;
		}
		if(array[i] === 'Bhel') {
			chtbvnCount++;
			bhelCount++;
			text = text + ', Bhel';
			x=1;
			y+=5;
		}
	}
	text = text + ",Your order Total is: $" + y + " - 20% Discount = $" + y*0.8  ;
	return text;
}

module.exports.charts = function(req, res)
{
	var path = require('path');
	//res.sendFile(path.resolve('charts.html'));
	res.sendFile(path.resolve('dashboard.html'));
	//res.sendFile( __dirname + "\\..\\charts.html" );
	//res.render('../views/charts');
};

module.exports.graphs = function(req, res)
{
	var path = require('path');
	//res.sendFile(path.resolve('charts.html'));
	res.sendFile(path.resolve('dashboard.html'));
	//res.sendFile( __dirname + "\\..\\charts.html" );
	//res.render('../views/charts');
};


