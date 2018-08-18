# Liri Node App

### Overview

This is the ninth assignment for the Coding Bootcamp delivereed at University of Toronto Mississauga.

In this assignment we were required to create a command line node app called LIRI (Language Interpretation and Recognition Interface). LIRI takes in parameters and returns data to the user using the Twitter, Spotify, and OMDB APIs. Using this

### Description

### What Each Command Should Do

1. `node liri.js my-tweets`

   - This will show your last 20 tweets and when they were created at in your terminal/bash window.

2. `node liri.js spotify-this-song '<song name here>'`

   - This will show the following information about the song in your terminal/bash window

     - Artist(s)

     - The song's name

     - A preview link of the song from Spotify

     - The album that the song is from

   - If no song is provided then your program will default to "The Sign" by Ace of Base.

3. `node liri.js movie-this '<movie name here>'`

   - This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   - If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

4. `node liri.js do-what-it-says`

   - Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     - It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

### Built With

- Node.js (including the built-in File System module)
- JavaScript
- Twitter, Spotify, and OMDB APIs
- Twitter, Spotify, dotenv, and Request NPMs

##

Try it! Click on the following link to preview the completed assignment:

https://weirbran.github.io/liri-node-app/
