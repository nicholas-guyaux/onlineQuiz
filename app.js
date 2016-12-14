var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pgp = require('pg-promise')();
var db = pgp(process.env.DATABASE_URL);

// this is to serve the css and js from the public folder to your app
// it's a little magical, but essentially you put files in there and link
// to them in you head of your files with css/styles.css
app.use(express.static(__dirname + '/public'));

// this is setting the template engine to use ejs
app.set('view engine', 'ejs');

// setting your view folder
app.set('views', __dirname+'/views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// get the username
app.get('/', function(req, res, next){
  res.render('index');
});

//play the game
app.get('/scores/game', function(req, res, next){
  res.render('game');
});

app.post('/scores/game', function(req, res, next){
  db.none('insert into scores(name, score)' +
     'values(${name}, ${score})',
   req.body)
   .then(function () {
     res.redirect('/scores/scores');
   })
   .catch(function (err) {
     return next(err);
   });
});

// gettting all the scores
app.get('/scores/scores', function(req, res, next){
  db.any('SELECT * FROM scores')
    .then(function(data){
      return res.render('scores', {scores: data})
    })
    .catch(function(err){
      return next(err);
    });
});

app.listen(process.env.PORT, function(){
  console.log('Application running on localhost on port 3000');
});
