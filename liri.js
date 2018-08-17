require("dotenv").config();

var fs = require("fs");

var keys = require("./keys");

var Twitter = require("twitter");

var Spotify = require("node-spotify-api");

var request = require("request");

var command = process.argv[2];
var query = "";
var nodeArgs = process.argv;

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

switch (command) {
  case "my-tweets":
    twitter();
    break;

  case "spotify-this-song":
    songSearch();
    break;

  case "movie-this":
    omdb();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
}

function twitter() {
  var params = { screen_name: "LIRIProject1", count: 20 };
  client.get("statuses/user_timeline", params, function(err, tweets, response) {
    if (err) {
      console.log(err);
    } else {
      //keep working on this
      // tweets.forEach(function() {
      //   console.log(tweets[i].created_at);
      //   console.log(tweets[i].text);
      // });
      for (var i = tweets.length - 1; i >= tweets.length - 20; i--) {
        console.log(tweets[i].created_at);
        console.log(tweets[i].text);
      }
    }
  });
}

function songSearch() {
  if (nodeArgs.length < 4) {
    query = "The Sign";
  } else {
    for (var i = 3; i < nodeArgs.length; i++) {
      if (i > 2 && i < nodeArgs.length) {
        query = query + "+" + nodeArgs[i];
      } else {
        query += nodeArgs[i];
      }
    }
  }

  spotify.search({ type: "track", query: query, limit: 1 }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
    console.log("Song name: " + data.tracks.items[0].name);
    console.log("Album: " + data.tracks.items[0].album.name);
    console.log("URL: " + data.tracks.items[0].external_urls.spotify);
  });
}

function omdb() {
  var movieName = "";

  if (nodeArgs.length < 4) {
    movieName = "mr nobody";
  } else {
    for (var i = 3; i < nodeArgs.length; i++) {
      if (i > 2 && i < nodeArgs.length) {
        movieName = movieName + "+" + nodeArgs[i];
      } else {
        movieName += nodeArgs[i];
      }
    }
  }

  // Then run a request to the OMDB API with the movie specified
  //store the apikey in the .env ????
  var queryUrl =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);

  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);

      if (!JSON.parse(body).Ratings[1]) {
        console.log("Rotten Tomatoes Score: none");
      } else {
        console.log(
          "Rotten Tomatoes Score: " + JSON.parse(body).Ratings[1].Value
        );
      }
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      console.log(err);
    } else {
      // console.log(data);
      var newArg = data.split(",");
      // console.log(newArg[1]);

      command = newArg[0];
      console.log(command);

      switch (command) {
        case "my-tweets":
          twitter();
          break;

        case "spotify-this-song":
          songSearch();
          break;

        case "movie-this":
          omdb();
          break;

        case "do-what-it-says":
          doWhatItSays();
          break;
      }
    }
  });
}
