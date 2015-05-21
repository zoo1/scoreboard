
# ScoreBoard
A Node.js score board application using [Express 4](http://expressjs.com/). Which uses a mongodb database to store associated scores and usernames.

##Features
- AES-CBC-256 encryption on the score and username (which the key and IV can be modified via the config.js file)
- POST request appends correct score to database and returns ranking of that score
- GET request returns top 100 scores

Note: Tests are depended on the default config file change it will fail some test cases
