/*****************************************************************************
* Objetivo: criar uma api para responder os dados da empresa Leilão Expresso
* Data: 28/05/2024
* Autor: Gabriela Fernandes, Eduardo Gonçalves e Mariana Sousa
* Versão: 1.0
****************************************************************************/

// imports de bibliotecas
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

/****************************** IMPORT DE CONTROLLERS ****************************/


// criando objeto app
const app = express()
app.use((request, response, next) => {
    response.header('Acess-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', '*')
    app.use(cors())
    next()
})
