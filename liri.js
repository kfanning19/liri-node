// require variables
var twitter = require('twitter');
var request = require('request');
var spotify = require('spotify');
var Keys = require("./keys.js")
var fs =  require("fs");

// keys
var client = new twitter(Keys.twitterKeys)

// command line variables
var action = process.argv[2];
var name = process.argv[3];

// functions
// writing to log
function writeLog(data){
	fs.appendFile("log.txt", data, function (err){
		if (err){
			console.log(err)
		}
	} )
}
// Twitter
function tweet(){
	var params = {screen_name: 'texotexere', count: 20};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	for (var i = 0; i < tweets.length; i++){
	  		var twitterData = "==============\n" + 
	    		"Created at: " + tweets[i].created_at + "\n" +
	    		"Text: " + tweets[i].text + "\n";
	    	console.log(twitterData);
	    	writeLog(twitterData);
		}
	  } else{
	  	console.log(error);
	  }
});
};
// Spotify
function song(){
	if(!name){
		name = 'The Sign by Ace of Base';
	}
	spotify.search({ type: 'track', query: name }, function(err, data) {
    if ( err ) {
        console.log(err);
    }	
    	var results = data.tracks.items

    	for(var n = 0; n < 5; n++){
    		for (var i = 0; i < results[n].artists.length; i ++){
    			var songData = "==============================================" + "\n" +
		 	    			"Artist(s): " + results[n].artists[i].name + "\n" +
		 	    			"Name of Song: " + results[n].name + "\n" +
		 	    			"Preview: " + results[n].preview_url + "\n" +
		 	    			"Album: " + results[n].album.name  + "\n";
		 	    console.log(songResults);
		 	    writeLog(songResults);
 	    	}
 		}
	});
};
// OMDB
function movie(){
if (!name){
	name = 'Mr. Nobody'
}
var queryUrl = "http://www.omdbapi.com/?t=" + name + "&tomatoes=true&y=&plot=short&r=json"

request (queryUrl, function(error, response, body){
		if (!error && response. statusCode === 200){
			var movieResult = JSON.parse(body)
			var movieData = "======================================" + "\n" + 
				"Title: " + movieResult.Title + "\n" + 
				"Year: " + movieResult.Year + "\n" + 
				"IMDB Rating: " + movieResult.imdbRating + "\n" +
				"Country: " + movieResult.Country + "\n" +
				"Language: " + movieResult.Language + "\n" + 
				"Plot: " + movieResult.Plot + "\n" +
				"Actors: " +movieResult.Actors + "\n" +
				"Rotten Tomatoes Rating: " + movieResult.tomatoRating + "\n" +
				"Rotten Tomatoes URL" + movieResult.tomatoURL + "\n"
			
			console.log(movieData);
			writeLog(movieData);
		}
	})
};
// Do What It Says
function doThis(){
	var fs = require("fs");

fs.readFile("random.txt", "utf8", function (error, data) {
	var dataArray = data.split(",");

	action = dataArray[0];
	name = dataArray [1];
	switchStatement ();

})
}

// Switch 
function switchStatement (){
switch(action){
	case 'my-tweets':
		tweet();
		break;
	case 'spotify-this-song':
		song();
		break;
	case 'movie-this':
		movie();
		break;
	case 'do-what-it-says':
		doThis();
		break;
	default:
		console.log("Inputs are my-tweets, spotify-this-song, movie-this, or do-what-it-says");
};
}
switchStatement();