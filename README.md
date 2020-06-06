# NLW - Next Level Week

Repositório para expor o resultado do desenvolvimento de um sistema com front em HTML, CSS e JavaScript, backend em Node.js e banco de dados SQL, durante a Next Level Week - Starter.




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

[Mozilla NonJucks](https://mozilla.github.io/nunjucks/);

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



### NunJucks Template
A extensão *NunJucks Template* do *VS Code* destaca partes do código onde o *NunJucks* está aplicado entre outras funcionalidades. Algumas configurações iniciais devem ser feitas para que funcione corretamente em extensões html.

Acesso:  [Github - NunJucks Template](https://github.com/eseom/nunjucks-template) | [VS Code - NunJucks Template](https://marketplace.visualstudio.com/items?itemName=eseom.nunjucks-template#overview);



# SQLite

## Instalação

```
$ npm install sqlite3
```



Para importar as dependências do *sqlite3* para o arquivo *./database/db.js*:

```
const sqlite3 = require("sqlite3").verbose()
```

Logo em seguida, ainda no *./database/db.js*, para criar o objeto que fará as operações no Banco de Dados:

```
const db = new sqlite3.Database("./src/database/database.db")
```

No terminal:

```
$ node src/database/db.js
```

Assim, o arquivo *database.db* foi gerado e adicionado ao projeto.



Adicionar ao *server.js*:

```
const db = require("./database/db.js")
```



## Manipulando Tabelas com SQL

**Criar** uma tabela com SQL:

```sqlite
db.run(`
	CREATE TABLE IF NOT EXISTS places(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		image TEXT,
		name TEXT,
		address TEXT,
		address2 TEXT,
		state TEXT,
		city TEXT,
		items TEXT
);
`)
```



**Inserir** dados na tabela com SQL:

```sqlite
const query = `
    INSERT INTO places (
    	  image,
    	  name,
	      address,
	      address2,
	      state,
	      city,
	      items
	    ) VALUES (?,?,?,?,?,?);
`

const values = [
    "https://images.unsplash.com/photo-1518792528501-352f829886dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
	"Colectoria",
	"Guilherme Gemballa, Jardim América ",
	"Numero 260",
	"Santa Catarina",
	"Rio do Sul",
	"Resíduos Eletrônicos, Lâmpadas" 
]

function afterInsertData(err){
	if(err){
		return console.log(err)
	}
	console.log("Cadastrado com sucesso!🙂")
	console.log(this)
}

db.run(query, values, afterInsertData)
```

  

**Consultar** os dados na tabela

```sqlite
db.all(`SELECT * FROM places`, function(err, rows){
       if(err){
       		return console.log(err)
       }

console.log("Aqui estão os registros! 🙂")
console.log(rows)
})

```

  

 **Deletar** um dado da tabela (exemplo para deletar o dado de Id=[1])

```sqlite
db.run(`DELETE FROM places WHERE id = ?`, [1] function(err) {
	if(err){
		return console.log(err)
}
console.log("Registro excluído com sucesso! 🙂")
})
```

