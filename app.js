// Set up server
var express = require('express');
var app = express();
var net = require('net');
var http = require('http');
var mongoose = require("mongoose");

var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/temperature';
var theport = process.env.PORT || 5000;

//mongoose.connect('mongodb://temp-monitor.herokuapp.com');
//mongoose.connect(uristring);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	// yay!
	console.log("Database connection Opened OK");
	
	var filter = {}; // no filter
	var fields = 'timestamp user inTemp outTemp'
	
	astronautModel.find(filter, fields, function(err, astronauts){
	if (err) {
	    console.error('uhoh something went wrong');
	    console.error(err);
	}
	if (astronauts == null) {
	    console.log("No records found");
	} else {
	    console.log("Found " + astronauts.length + " records");
	
	/*
	// We could loop over each record and do something with them.
	    for(a in astronauts) {
	        var currAstro = astronauts[a];
	        console.log(currAstro.user + " " + currAstro.inTemp + " " + currAstro.outTemp);
	    }
	*/
	}
	})
	
});

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function(err, res) {
	if (err) {
		console.log('ERROR connecting to: ' + uristring + '. ' + err);
	} else {
		console.log('Succeeded connected to: ' + uristring);		
	}
});

var astronautModel = require('./astronaut.js');
	var sergio = {
		timeStamp: 0,
		user: "SM",
		inTemp: 70,
		outTemp: 40
	};
	var allison = {
		timeStamp: 2,
		user: "AB",
		inTemp: 75,
		outTemp: 50
	};
	var donna = {
		timeStamp: 4,
		user: "DM",
		inTemp: 78,
		outTemp: 55
	};
	var newAstro = new astronautModel(sergio); // new astronaut document
	//newAstro.save(); //save to database
	
	var newAstro2 = new astronautModel(allison); // new astronaut document
	//newAstro2.save(); //save to database

	var newAstro3 = new astronautModel(donna); // new astronaut document
	//newAstro3.save(); //save to database
	
	
// Set up Forecast.io
var Forecast = require('forecast.io');
var util = require('util')
var options = {
	APIKey: "49f769efb11fc808363e17f9d04c428f"
},
	lat_AB = 40.696963,
	long_AB = -73.974601,
	lat_DM = 40.723389,
	long_DM = -73.985746
	lat_SM = 40.771369,
	long_SM = -73.930970,
	forecast = new Forecast(options);

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});

// Run Server 


app.use(express.static(__dirname + '/public/bootstrap'));

app.get('/', function(request, response) {
	response.sendfile(__dirname + "/public/bootstrap/index.html");
});
app.get('/user/ab', function(request, response) {
	response.sendfile(__dirname + "/public/bootstrap/user-ab.html");
});
app.get('/user/dm', function(request, response) {
	response.sendfile(__dirname + "/public/bootstrap/user-dm.html");
});
app.get('/user/sm', function(request, response) {
	response.sendfile(__dirname + "/public/bootstrap/user-sm.html");
});

app.get('/userlist', function(req, res) {
	console.log("userList");
	
	var filter = {}; // no filter
	var fields = 'timestamp user inTemp outTemp'
	
	astronautModel.find(filter, fields, function(err, astronauts){
	if (err) {
	    console.error('uhoh something went wrong');
	    console.error(err);
	}
	if (astronauts == null) {
	    console.log("No temperature records found");
	} else {
	    console.log("Found " + astronauts.length + " temperature records");
	
	    for(a in astronauts) {
	        var currAstro = astronauts[a]; // current looped astronaut
	        console.log(currAstro.user + "\t inTemp: " + currAstro.inTemp + "\t outTemp: " + currAstro.outTemp);
	    }
	}
	})

});

app.get('/test/:id', function(req, res, next) {

	var filter = {}; // no filter
	var fields = 'user';
	var tempUser = (req.params.id).toUpperCase();
	
	console.log("[TEST] try and find records for " + tempUser);
	
	astronautModel.find({user: tempUser}, function(err, astronauts){
		if (err) {
		    console.error('uhoh something went wrong');
		    console.error(err);
		}
		if (astronauts == null) {
		    console.log("No records found");
		} else {
		    console.log("Found " + astronauts.length + " records");

		 
		 console.log(astronauts[0].inTemp);
		console.log(astronauts[1].inTemp);
		console.log(astronauts[2].inTemp);
		console.log(astronauts[3].inTemp);
// We could loop over each record and do something with them.
		    for(a in astronauts) {		    
		        var currAstro = astronauts[astronauts.length-1];
		        console.log(currAstro.user + " " + currAstro.inTemp + " " + currAstro.outTemp);
		        break;
		    }
		    
		 
	
		}
	//res.set('Content-Type', 'application/javascript');
	//res.send('testPage', astronauts);

	})
	
	
		var dA_inside  = [
		 ["Mon", 90], 
		 ["Tue", 80], 
		 ["Wed", 83], 
		 ["Thu", 88], 
		 ["Fri", 84], 
		 ["Sat", 82], 
		 ["Sun", 90] ];

	res.json(dA_inside);
});

app.get('/save/:id', function(req, res) {
	res.send("Incomplete request. Missing Temp");
});

app.get('/save/:id/:temp', function(req, res) {
	// set variables for current request
	var timestamp = (new Date()).getTime();
	var currentTime = (new Date()).getHours();
	var currentUser = req.params.id.toUpperCase();
	var currentTemp = req.params.temp;
	
	
	// call function to API, and store in local value
	var forecastTemp = null;

	// Any GET request will show results, but only registered cases will save to database
	getWeatherApi(currentUser, function(myTempForecast) {
		//console.log("my api temp is " + myTempForecast);
		forecastTemp = myTempForecast;
		
		var astronautModel = require('./astronaut.js');
		
		var t = {
			timeStamp: currentTime,
			user: currentUser,
			inTemp: currentTemp,
			outTemp: forecastTemp
		};
		var new_a = new astronautModel(t); // new astronaut document
		new_a.save(function (err) {
		  if (err) { console.log("error saving");}
		});
	
	
		//console.log("Forecast Temp is: " + forecastTemp);
		//console.log("Current Time is:  " + currentTime);
		console.log(t);
		
		if (currentTime > 6 && currentTime < 22 && forecastTemp < 55 && currentTemp > 68) {
			console.log("daytime: your house is sufficiently heated");
		} else if (currentTime > 6 && currentTime < 22 && forecastTemp < 55 && currentTemp < 68) {
			console.log("daytime: your house is cold");
		} else if (currentTime > 22 && currentTime < 6 && forecastTemp < 40 && currentTemp > 55) {
			console.log("nightime: your house is sufficiently heated");
		} else if (currentTime > 22 && currentTime < 6 && forecastTemp < 40 && currentTemp < 55) {
			console.log("nightime: your house is cold");
		}
	});


	res.send({
		timeStamp: currentTime,
		user: currentUser,
		inTemp: currentTemp,
		outTemp: forecastTemp
	});
	console.log({
		timeStamp: currentTime,
		user: currentUser,
		inTemp: currentTemp,
		outTemp: forecastTemp
	});
});

app.get('/:id', function(req, res) {
	
	var filter = {}; // no filter
	var fields = 'user';
	var tempUser = (req.params.id).toUpperCase();
	
	console.log("Try to find records for " + tempUser);
	
	astronautModel.find({user: tempUser}, function(err, astronauts){
		if (err) {
		    console.error('uhoh something went wrong');
		    console.error(err);
		}
		if (astronauts == null) {
		    console.log("No records found");
		} else {
		    console.log("Found " + astronauts.length + " records");
		
		// We could loop over each record and do something with them.
		    for(a in astronauts) {
		        var currAstro = astronauts[astronauts.length-1];
		        console.log(currAstro.user + " " + currAstro.inTemp + " " + currAstro.outTemp);
		        break;
		    }
		}
   //res.set('Content-Type', 'application/javascript');
  res.send(astronauts);

	})
	
});

app.get('/:id/last', function(req, res) {
	
	var filter = {}; // no filter
	var fields = 'user';
	var tempUser = (req.params.id).toUpperCase();
	
	console.log("Try to find records for " + tempUser);
	
	astronautModel.find({user: tempUser}, function(err, astronauts){
		if (err) {
		    console.error('uhoh something went wrong');
		    console.error(err);
		}
		if (astronauts == null) {
		    console.log("No records found");
		} else {
		    console.log("Found " + astronauts.length + " records");
		
		// We could loop over each record and do something with them.
		    for(a in astronauts) {
		        var currAstro = astronauts[astronauts.length-1];
		        console.log(currAstro.user + " " + currAstro.inTemp + " " + currAstro.outTemp);
		        break;
		    }
		}
	//res.set('Content-Type', 'application/javascript');
	res.send(currAstro);
	//res.send("Incomplete request. Missing Temp");

	})
	
});

// Weather API
function getWeatherApi(userID, callback) {
	switch (userID) {
	case "AB":
		forecast.get(lat_AB, long_AB, function(err, res, data) {
			if (err) throw err;
			myTempForecast = util.inspect(data.currently.temperature);
			callback(myTempForecast);
		});
		break;
	case "DM":
		forecast.get(lat_DM, long_DM, function(err, res, data) {
			if (err) throw err;
			myTempForecast = util.inspect(data.currently.temperature);
			callback(myTempForecast);
		});
		break;
	case "SM":
		forecast.get(lat_SM, long_SM, function(err, res, data) {
			if (err) throw err;
			myTempForecast = util.inspect(data.currently.temperature);
			callback(myTempForecast);
		});
		break;
	default:
		console.log(userID + " is an unkown user; will not save to Data Base");
	}
}