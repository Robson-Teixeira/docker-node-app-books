const express = require('express')
let app = express()
let routes = require('./routes')

//Detecta enviroment
let env = process.env.NODE_ENV;
if(!env){
	env = 'development'
}

// Carrega configurações de acordo
let config = require(`./config/config.${env}.json`);

//Conecta ao banco
require('./config/database')(`mongodb://${config.databaseConfig.host}:27017/${config.databaseConfig.database}`)

// Configura a porta pela variavel de ambiente ou usa a 6000 como padrão
const port = process.env.PORT || 6000

// Configura a pasta public para servir os arquivos estáticos, CSS, HTML, Imagens...
app.use(express.static("src/public"))

//Configura o arquivo de rotas
app.use(routes)

//Inicializa o servidor
app.listen(port, () =>{
     console.log('Server is listening on port ' + port) 
})