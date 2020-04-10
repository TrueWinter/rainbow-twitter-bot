var Twitter = require('twitter');
var config = require('./config.js');

var client = new Twitter({
	consumer_key: config.auth.consumer_key,
	consumer_secret: config.auth.consumer_secret,
	access_token_key: config.auth.access_token_key,
	access_token_secret: config.auth.access_token_secret
});

function verifyAuth() {
	client.get('account/verify_credentials', function(error, response) {
		if (error) throw error;
		//console.log(response); // Raw response object
		if (Object.prototype.hasOwnProperty.call(response, 'screen_name')) {
			console.log(`Logged in as ${response.screen_name}`);
			tweet(getRandomRainbow());
		} else {
			console.log('Unable to log in');
			process.exit(1);
		}
	});
}

function tweet(status) {
	client.post('statuses/update', { status }, function(error, tweet, response) {
		if (error) throw error;
		//console.log(tweet); // Tweet body.
		//console.log(response); // Raw response object
		//console.log(response.statusCode);
		if (response.statusCode === 200) {
			console.log(`Tweeted`);
		} else {
			console.log('Failed to Tweet');
		}
	});
}

function getRandomRainbow() {
	var red = config.colours.red[Math.floor(Math.random() * config.colours.red.length)];
	var orange = config.colours.orange[Math.floor(Math.random() * config.colours.orange.length)];
	var yellow = config.colours.yellow[Math.floor(Math.random() * config.colours.yellow.length)];
	var green = config.colours.green[Math.floor(Math.random() * config.colours.green.length)];
	var blue = config.colours.blue[Math.floor(Math.random() * config.colours.blue.length)];
	var purple = config.colours.purple[Math.floor(Math.random() * config.colours.purple.length)];

	var rainbow = red + orange + yellow + green + blue + purple;
	return rainbow;
}

verifyAuth();

setInterval(function() {
	tweet(getRandomRainbow());
}, config.tweet_options.interval * 60 * 60 * 1000);