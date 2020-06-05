# NLW - Next Level Week

Repositório para expor o resultado do desenvolvimento de uma página com front em HTML, CSS e JavaScript e backend em Node.js, durante a Next Level Week - Starter.




# Links rápidos

- API IBGE: [API e documentação](https://servicodados.ibge.gov.br/api/docs/localidades?versao=1);
- Imagens gratuitas utilizadas no projeto: [Unsplash](https://unsplash.com/);




# Notas de aula
## Configurando Backend

Configurações iniciais para backend em Node.js:

### NPM: Node Manager Package

```
$ npm init -y
$ npm install express
```

Adicionar *node_modules* ao arquivo .gitignore



### Node.js

Arquivo: src/server.js

```
const express = require("express")
const server = express()

server.listen(3000)
```

Inicializar o *localhost:3000*:

```
$ node src/server.js
```

Modificação inicial adicionada ao *package.json*:
```
  "scripts": {
    "start": "node src/server.js"
  }
```

```
$ npm start
```



### Nodemon

Configuração adicional para que não seja necessário reinicial o servidor local sempre que uma modificação for adicionada:

```
$ npm install nodemon -D
```
*-D* para adicionar como dependência de desenvolvimento aplicação.



Modificação adicionada ao *package.json*:

```
"scripts": {
    "start": "**nodemon** src/server.js"
}
```

Inicializar o *localhost*:


```
$ npm start
```

Extensões sob supervisão do *Nodemon*:


```
Note:
[nodemon] watching extensions: js,mjs,json
```



### Teste de funcionamento do *server.js*

```
const express = require("express")
const server = express()

server.get("/", (req,res) => {
    res.send("Hello Minerva")
})

server.listen(3000)

```



### Configurando rotas iniciais da aplicação
*server.js*

```
const express = require('express')
const server = express()

server.use(express.static('public'))

server.get("/", (req,res) => {
    res.sendFile(__dirname + '/views/index.html')
})

server.get("/create-point", (req,res) => {
    res.sendFile(__dirname + '/views/create-point.html')
})

server.listen(3000)
```





## Template Engine

Para trabalhar o HTML de modo integrado ao backend.



### Instalar o Nunjucks

```
$ npm install nunjucks
```



Configuração inicial adicionada ao *server.js*:

```
const nunjucks = require('nunjucks');
nunjuks.configure('src/views', {
  express: server,
  noCache:true
});
```



Como *nunjucks* já configura a rota para *src/views*, é preciso atualizar as rotas criadas em passos anteriores:

```
server.get('/', (request, response) => {
  return response.render('index.html');
});

server.get('/create-point', (request, response) => {
  return response.render('create-point.html');
});

server.get('/search', (request, response) => {
  return response.render('search-results.html');
});
```



## Plugin para o nunjucks
Colorir partes do código onde o *nunjucks* está aplicado:
https://github.com/eseom/nunjucks-template
https://marketplace.visualstudio.com/items?itemName=eseom.nunjucks-template#overview

