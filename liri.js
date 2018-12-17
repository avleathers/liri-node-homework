// Require and request variables:
// fs is used to file save the results to a file


// var request = require("request"); Needed for movie and concert but not spotify because there is a spotify package that is a constructor.

var fs = require("fs");

// Require and configure dotenv:

require("dotenv").config();

var keys = require("./keys.js");

// Request.

var request = require("request");

// Spotify search:

var Spotify = require("node-spotify-api");

// spotify points to Spotify:

var spotify = new Spotify(keys.spotify);

var moment = require("moment")

var nodeArgs = process.argv;

// spotify.search does what AJAX did in jQuery.
function main() {
    var command = process.argv[2]
    var searchItem = process.argv[3]

    switch (command) {
        case "spotify-this-song":
            showSong(searchItem);
            break;
        case "concert-this":
            showConcert(searchItem);
            break;
        case "movie-this":
            showMovie(searchItem);
            break;
        default:
            showRandom()
            break;
    }

}

function showSong(song) {

    spotify.search({ type: "track", query: song }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }

        // the data for 1 song:

        var songData = data.tracks.items[0]
        // console.log(songData);
        var song = {
            artist: songData.artists[0].name,
            songName: songData.name,
            songURL: songData.preview_url,
            album: songData.album.name
        }
        console.log(song);
    });
}

function showConcert(band) {
    var artistname = "";

    // For loop to handle band names that are greater than 1 word
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3) {
            artistname = artistname + "+" + nodeArgs[i];
        }

        else {
            artistname += nodeArgs[i];
        }
    }

    request("https://rest.bandsintown.com/artists/" + artistname + "/events?app_id=921e3a24f084f00f3b04bddb73e28c50", function (error, response, body) {
        console.log(response.body)
        var body = JSON.parse(body)

        console.log("Upcoming concerts for " + artistname + ": ");
        for (var set in body) {
            var date = moment(body[set].datetime).format("MM/DD/YYYY")
            console.log(body[set].venue.city + ", " + "at " + body[set].venue.name + ", " + "on " + date)
        }

    })






    function showMovie(movie) {

        http://www.omdbapi.com/?i=tt3896198&apikey=ff202796

        var showmovieName = "";


    }

    function showRandom() {

    }
}

main();


   
