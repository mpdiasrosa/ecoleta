const express = require('express');
const server = express();

server.use(express.static('public'))

const nunjuks = require('nunjucks');
nunjuks.configure('src/views', {
  express: server,
  noCache:true
});


server.get('/', (request, response) => {
  return response.render('index.html', {title: 'Seu marketplace de coleta de resíduos.'});
});

server.get('/create-point', (request, response) => {
  return response.render('create-point.html');
});

server.get('/search', (request, response) => {
  return response.render('search-results.html');
});


server.listen(3000);
