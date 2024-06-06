/******************************************************************************
 * Objetivo: criar uma api para responder os dados da empresa Leilão Expresso
 * Data: 28/05/2024
 * Autor: Gabriela Fernandes, Eduardo Gonçalves e Mariana Sousa
 * Versão: 1.0
 *****************************************************************************/

// imports de bibliotecas
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// criando objeto app
const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', '*')
    app.use(cors())
    // app.use(express.json());
    next()
})

// cria um objeto do tipo JSON para receber os dados via body nas requisições POST ou PUT
const bodyParserJSON = bodyParser.json()

// #region IMPORTS
/****************************** IMPORT DE CONTROLLERS ****************************/
const controllerAdmin = require('./controller/controller-administrator.js')
const controllerCategoria = require('./controller/controller-categoria.js')
const controllerProduto = require('./controller/controller-produto.js')
const controllerLote = require('./controller/controller-lotes.js')
/*********************************************************************************/

// #region ADMIN

/****************************** ADMINISTRADOR ****************************/
// endpoints: listar os admins
app.get('/v1/leilao_expresso/admins', cors(), async(request, response, next) => {
    // chama a função para retornar os dados do admin
    let dadosAdmins = await controllerAdmin.getListarAdmins()

    response.status(dadosAdmins.status_code)
    response.json(dadosAdmins)
})

// endpoint: filtrar pelo nome
app.get('/v1/leilao_expresso/admins/filtro', cors(), async(request, response, next) => {
    let filtro = request.query.nome

    // chama a função para retornar os dados do admin
    let dadosAdmins = await controllerAdmin.getAdminByNome(filtro)

    response.status(dadosAdmins.status_code)
    response.json(dadosAdmins)
})

// endpoint: retorna os dados do admin, filtrando pelo ID
app.get('/v1/leilao_expresso/admin/:id', cors(), async(request, response, next) => {
    // recebe o id da requisição do admin
    let idAdmin = request.params.id

    let dadosAdmin = await controllerAdmin.getBuscarAdmin(idAdmin)

    response.status(dadosAdmin.status_code)
    response.json(dadosAdmin)
})

// endpoint: inserir novos admins no Banco de Dados
    // não esquecer de colocar o bodyParserJSON que é quem define o formato de chegada dos dados
app.post('/v1/leilao_expresso/admin', cors(), bodyParserJSON, async(request, response, next) => {

        // recebe o content type da requisição (A API deve receber somente application/json)
        let contentType = request.headers['content-type']
    
        //recebe os dados encaminhados na requisição no body(JSON)
        let dadosBody = request.body
    
        // encaminha os dados da requisição para a controller enviar para o BD
        let resultDados = await controllerAdmin.setNovoAdmin(dadosBody, contentType)
        
        response.status(resultDados.status_code)
        response.json(resultDados)
    
})

// endpoint: editar o status do admin para false para "exclui-lo"
app.put('/v1/leilao_expresso/admin/excluir/:id', cors(), async(request, response, next) => {
    let admin = request.params.id
    let dadosAdmin = await controllerAdmin.setEditarExcluirAdmin(admin)

    response.status(dadosAdmin.status_code)
    response.json(dadosAdmin)
})

// endpoint: editar o status do admin para false para acha-lo
app.put('/v1/leilao_expresso/admin/ativar/:id', cors(), async(request, response, next) => {
    let admin = request.params.id
    let dadosAdmin = await controllerAdmin.setEditarRenovarAdmin(admin)

    response.status(dadosAdmin.status_code)
    response.json(dadosAdmin)
})

// endpoint: editar os dados do admin
app.put('/v1/leilao_expresso/admin/:id', cors(), bodyParserJSON, async(request, response, next) => {
    let admin = request.params.id

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerAdmin.setAtualizarAdmin(dadosBody, contentType, admin)
    
    response.status(resultDados.status_code)
    response.json(resultDados)
})
/*************************************************************************/

// #region CATEGORIA

/****************************** CATEGORIA ****************************/
// endpoints: listar as categorias
app.get('/v1/leilao_expresso/categorias', cors(), async(request, response, next) => {
    // chama a função para retornar os dados da categoria
    let dadosCategorias = await controllerCategoria.getListarCategoria()

    response.status(dadosCategorias.status_code)
    response.json(dadosCategorias)
})

// endpoint: filtrar pelo nome
app.get('/v1/leilao_expresso/categoria/filtro', cors(), async(request, response, next) => {
    let filtro = request.query.nome

    // chama a função para retornar os dados da categoria
    let dadosCategorias = await controllerCategoria.getCategoriaByNome(filtro)

    response.status(dadosCategorias.status_code)
    response.json(dadosCategorias)
})

// endpoint: retorna os dados da categoria, filtrando pelo ID
app.get('/v1/leilao_expresso/categoria/:id', cors(), async(request, response, next) => {
    // recebe o id da requisição da categoria
    let idCategoria = request.params.id

    let dadosCategoria = await controllerCategoria.getBuscarCategoria(idCategoria)

    response.status(dadosCategoria.status_code)
    response.json(dadosCategoria)
})

// endpoint: inserir novas categorias no Banco de Dados
    // não esquecer de colocar o bodyParserJSON que é quem define o formato de chegada dos dados
app.post('/v1/leilao_expresso/categoria', cors(), bodyParserJSON, async(request, response, next) => {

        // recebe o content type da requisição (A API deve receber somente application/json)
        let contentType = request.headers['content-type']
    
        //recebe os dados encaminhados na requisição no body(JSON)
        let dadosBody = request.body
    
        // encaminha os dados da requisição para a controller enviar para o BD
        let resultDados = await controllerCategoria.setNovaCategoria(dadosBody, contentType)
        
        response.status(resultDados.status_code)
        response.json(resultDados)
    
})

// endpoint: editar o status da categoria para false para "exclui-lo"
app.put('/v1/leilao_expresso/categoria/excluir/:id', cors(), async(request, response, next) => {
    let categoria = request.params.id
    let dadosCategoria = await controllerCategoria.setEditarExcluirCategoria(categoria)

    response.status(dadosCategoria.status_code)
    response.json(dadosCategoria)
})

// endpoint: editar o status da categoria para true para ativa-la
app.put('/v1/leilao_expresso/categoria/ativar/:id', cors(), async(request, response, next) => {
    let categoria = request.params.id
    let dadosCategoria = await controllerCategoria.setEditarRenovarCategoria(categoria)

    response.status(dadosCategoria.status_code)
    response.json(dadosCategoria)
})

// endpoint: editar os dados da categoria
app.put('/v1/leilao_expresso/categoria/:id', cors(), bodyParserJSON, async(request, response, next) => {
    let categoria = request.params.id

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerCategoria.setAtualizarCategoria(dadosBody, contentType, categoria)
    
    response.status(resultDados.status_code)
    response.json(resultDados)
})
/*************************************************************************/

// #region PRODUTOS

/****************************** PRODUTOS ****************************/
// endpoints: listar os produtos
app.get('/v1/leilao_expresso/produtos', cors(), async(request, response, next) => {
    // chama a função para retornar os dados do produto
    let dadosProdutos = await controllerProduto.getListarProdutos()

    response.status(dadosProdutos.status_code)
    response.json(dadosProdutos)
})

// endpoint: filtrar pela categoria
app.get('/v1/leilao_expresso/produto/filtro', cors(), async(request, response, next) => {
    let filtro = request.query.categoria

    // chama a função para retornar os dados do produto
    let dadosProdutos = await controllerProduto.getProdutoByCategoria(filtro)

    response.status(dadosProdutos.status_code)
    response.json(dadosProdutos)
})
// endpoint: filtrar pelo nome
app.get('/v1/leilao_expresso/produto/filtro', cors(), async(request, response, next) => {
    let filtro = request.query.nome

    // chama a função para retornar os dados do produto
    let dadosProdutos = await controllerProduto.getProdutoByNome(filtro)

    response.status(dadosProdutos.status_code)
    response.json(dadosProdutos)
})

// endpoint: retorna os dados do produto, filtrando pelo ID
app.get('/v1/leilao_expresso/produto/:id', cors(), async(request, response, next) => {
    // recebe o id da requisição do produto
    let idProduto = request.params.id

    let dadosProduto = await controllerProduto.getBuscarProduto(idProduto)

    response.status(dadosProduto.status_code)
    response.json(dadosProduto)
})

// endpoint: inserir novos produtos no Banco de Dados
    // não esquecer de colocar o bodyParserJSON que é quem define o formato de chegada dos dados
app.post('/v1/leilao_expresso/produto', cors(), bodyParserJSON, async(request, response, next) => {

        // recebe o content type da requisição (A API deve receber somente application/json)
        let contentType = request.headers['content-type']
    
        //recebe os dados encaminhados na requisição no body(JSON)
        let dadosBody = request.body
    
        // encaminha os dados da requisição para a controller enviar para o BD
        let resultDados = await controllerProduto.setNovoProduto(dadosBody, contentType)
        
        response.status(resultDados.status_code)
        response.json(resultDados)
    
})

// endpoint: editar o status do produto para false para "exclui-lo"
app.put('/v1/leilao_expresso/produto/excluir/:id', cors(), async(request, response, next) => {
    let produto = request.params.id
    let dadosProduto = await controllerProduto.setEditarExcluirProduto(produto)

    response.status(dadosProduto.status_code)
    response.json(dadosProduto)
})

// endpoint: editar o status do produto para true para ativa-la
app.put('/v1/leilao_expresso/produto/ativar/:id', cors(), async(request, response, next) => {
    let produto = request.params.id
    let dadosProduto = await controllerProduto.setEditarRenovarProduto(produto)

    response.status(dadosProduto.status_code)
    response.json(dadosProduto)
})

// endpoint: editar os dados do produto
app.put('/v1/leilao_expresso/produto/:id', cors(), bodyParserJSON, async(request, response, next) => {
    let produto = request.params.id

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerProduto.setAtualizarProduto(dadosBody, contentType, produto)
    
    response.status(resultDados.status_code)
    response.json(resultDados)
})
/*************************************************************************/

// #region LOTES

/****************************** LOTES AAAA***********************************/
// endpoints: listar os lotes
app.get('/v1/leilao_expresso/lotes', cors(), async(request, response, next) => {
    // chama a função para retornar os dados do produto
    let dadosLote = await controllerLote.getListarLotes()

    response.status(dadosLote.status_code)
    response.json(dadosLote)
})

// endpoint: filtrar pela data de fim
app.get('/v1/leilao_expresso/lote/filtro', cors(), async(request, response, next) => {
    let filtro = request.query.data

    // chama a função para retornar os dados do produto
    let dadosLote = await controllerLote.getLoteByDataFinal(filtro)

    response.status(dadosLote.status_code)
    response.json(dadosLote)
})

// endpoint: retorna os dados do lote, filtrando pelo ID
app.get('/v1/leilao_expresso/lote/:id', cors(), async(request, response, next) => {
    // recebe o id da requisição do lote
    let idLote = request.params.id

    let dadosLote = await controllerLote.getBuscarLote(idLote)

    response.status(dadosLote.status_code)
    response.json(dadosLote)
})

// endpoint: retorna os dados do lote, filtrando pela categoria
app.get('/v1/leilao_expresso/lote/categoria/filtro', cors(), async(request, response, next) => {
    // recebe o id da requisição do lote
    let categoria = request.query.categoria

    let dadosLote = await controllerLote.getLoteByCategoria(categoria)

    response.status(dadosLote.status_code)
    response.json(dadosLote)
})

// endpoint: retorna os dados do lote, filtrando pelo valor
app.get('/v1/leilao_expresso/lote/valor/filtro', cors(), async(request, response, next) => {
    // recebe o id da requisição do lote
    let valorFixo = request.query.valorFixo

    let dadosLote = await controllerLote.getLoteByValorFixo(valorFixo)

    response.status(dadosLote.status_code)
    response.json(dadosLote)
})

// endpoint: inserir novos lotes no Banco de Dados
    // não esquecer de colocar o bodyParserJSON que é quem define o formato de chegada dos dados
app.post('/v1/leilao_expresso/lote', cors(), bodyParserJSON, async(request, response, next) => {

        // recebe o content type da requisição (A API deve receber somente application/json)
        let contentType = request.headers['content-type']
    
        //recebe os dados encaminhados na requisição no body(JSON)
        let dadosBody = request.body
    
        // encaminha os dados da requisição para a controller enviar para o BD
        let resultDados = await controllerLote.setNovoLote(dadosBody, contentType)
        
        response.status(resultDados.status_code)
        response.json(resultDados)
    
})

// endpoint: editar o status do lote para false para "exclui-lo"
app.put('/v1/leilao_expresso/lote/excluir/:id', cors(), async(request, response, next) => {
    let lote = request.params.id
    let dadosLote = await controllerLote.setEditarExcluirLote(lote)

    response.status(dadosLote.status_code)
    response.json(dadosLote)
})

// endpoint: editar o status do lote para true para ativa-lo
app.put('/v1/leilao_expresso/lote/ativar/:id', cors(), async(request, response, next) => {
    let lote = request.params.id
    let dadosLote = await controllerLote.setEditarRenovarLote(lote)

    response.status(dadosLote.status_code)
    response.json(dadosLote)
})

// endpoint: editar os dados do lote
app.put('/v1/leilao_expresso/lote/:id', cors(), bodyParserJSON, async(request, response, next) => {
    let lote = request.params.id

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerLote.setAtualizarLote(dadosBody, contentType, lote)
    
    response.status(resultDados.status_code)
    response.json(resultDados)
})
/*************************************************************************/

app.listen(8080, () => {
    console.log('API rodando na porta 8080.')
})