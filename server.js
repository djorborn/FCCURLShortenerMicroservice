var validUrl = require('valid-url');
var count = 1;


require('express')()
.set('view engine', 'pug')

.get('/', function(req, res){
  res.render('main');
})

.use(function(req, res, next){
  var uri = req._parsedUrl.path.toString().replace('/', '');
  if(!isNaN(uri)){
    res.redirect(urls[uri]);
  } else {
    next();
  }
})

.get('/new/*', function(req, res){
  var uri = req._parsedUrl.path.toString().replace('/new/', '');
  if(validUrl.isUri(uri)){
    //Make Short URL
    makeShortUrl(req, res, uri);
  } else {
    //Send Error
    res.render('error', {
      msg: "Error: Please enter a valid url like 'http://www.example.net'"
    });
  }

})

.listen(3000);

function makeShortUrl(req, res, uri){
  count++;
  urls.push(uri);
  res.render('done', {
    url: uri,
    num: count
  });
}

var urls = [
  'http//www.lazyfoo.net',
  'http//www.google.com'
];
