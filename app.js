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
const controllerUsuarios = require('./controller/controller-usuarios.js')
const controllerEnderecos = require('./controller/controller-enderecos.js')

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
app.get('/v1/leilao_expresso/produto/filtro/:categoria', cors(), async(request, response, next) => {
    let filtro = request.query.categoria

    // chama a função para retornar os dados do produto
    let dadosProdutos = await controllerProduto.getProdutoByCategoria(filtro)

    response.status(dadosProdutos.status_code)
    response.json(dadosProdutos)
})
// endpoint: filtrar pelo nome
app.get('/v1/leilao_expresso/produto/filtro:nome', cors(), async(request, response, next) => {
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

/****************************** LOTES ***********************************/
// endpoints: listar os lotes
app.get('/v1/leilao_expresso/lotes', cors(), async(request, response, next) => {
    // chama a função para retornar os dados do produto
    let dadosLote = await controllerLote.getListarLotes()

    response.status(dadosLote.status_code)
    response.json(dadosLote)
})

// endpoint: filtrar pela data de fim
app.get('/v1/leilao_expresso/lote/filtro/:data', cors(), async(request, response, next) => {
    let filtro = request.params.data
    
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

// #region USUARIO

/****************************** USUARIO ****************************/
// endpoints: listar os usuarios
app.get('/v1/leilao_expresso/usuarios', cors(), async(request, response, next) => {
    // chama a função para retornar os dados dos usuarios
    let dadosUsuarios = await controllerUsuarios.getListarUsuarios()

    response.status(dadosUsuarios.status_code)
    response.json(dadosUsuarios)
})

// endpoint: retorna os dados de usuarios, filtrando pelo ID
app.get('/v1/leilao_expresso/usuarios/:id', cors(), async(request, response, next) => {
    // recebe o id da requisição do admin
    let idUsuarios = request.params.id

    let dadosUsuarios = await controllerUsuarios.getBuscarUsuario(idUsuarios)

    response.status(dadosUsuarios.status_code)
    response.json(dadosUsuarios)
})

// endpoint: inserir novos Usuarios no Banco de Dados
// não esquecer de colocar o bodyParserJSON que é quem define o formato de chegada dos dados
app.post('/v1/leilao_expresso/usuarios', cors(), bodyParserJSON, async(request, response, next) => {

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerUsuarios.setNovoUsuario(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

// endpoint: editar o status de usuarios para false para "exclui-lo"
app.put('/v1/leilao_expresso/usuarios/excluir/:id', cors(), async(request, response, next) => {
    let usuario = request.params.id
    let dadosUsuario = await controllerUsuarios.setExcluirUsuario(usuario)

    response.status(dadosUsuario.status_code)
    response.json(dadosUsuario)
})

// endpoint: editar o status de usuarios para false para "ativa-lo"
app.put('/v1/leilao_expresso/usuarios/ativar/:id', cors(), async(request, response, next) => {
    let usuario = request.params.id
    let dadosUsuario = await controllerUsuarios.setExcluirUsuario(usuario)

    response.status(dadosUsuario.status_code)
    response.json(dadosUsuario)
})

// endpoint: editar os dados da categoria
app.put('/v1/leilao_expresso/usuarios/:id', cors(), bodyParserJSON, async(request, response, next) => {
    let usuario = request.params.id

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerUsuarios.setAtualizarUsuario(dadosBody, contentType, usuario)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.post('/v1/leilao_expresso/validacao/usuario', cors(), bodyParserJSON, async (request, response, next) => {

    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let dadosUsuario = await controllerUsuarios.getValidarUsuario(dadosBody.email, dadosBody.senha, contentType)
    response.status(dadosUsuario.status_code);
    response.json(dadosUsuario)

})

/*************************************************************************/

// #region ENDERECO

/****************************** ENDERECOS ****************************/
// endpoints: listar os enderecos
app.get('/v1/leilao_expresso/enderecos', cors(), async(request, response, next) => {
    // chama a função para retornar os dados dos enderecos
    let dadosEnderecos = await controllerEnderecos.getListarEnderecos()

    response.status(dadosEnderecos.status_code)
    response.json(dadosEnderecos)
})

// endpoint: retorna os dados de enderecos, filtrando pelo ID
app.get('/v1/leilao_expresso/enderecos/:id', cors(), async(request, response, next) => {
    // recebe o id da requisição do admin
    let idEnderecos = request.params.id

    let dadosEnderecos = await controllerEnderecos.getBuscarEndereco(idEnderecos)

    response.status(dadosEnderecos.status_code)
    response.json(dadosEnderecos)
})

// endpoint: inserir novos enderecos no Banco de Dados
// não esquecer de colocar o bodyParserJSON que é quem define o formato de chegada dos dados
app.post('/v1/leilao_expresso/enderecos', cors(), bodyParserJSON, async(request, response, next) => {

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerEnderecos.setInserirNovoEndereco(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

// endpoint: editar o status do endereco para false para "exclui-lo"
app.put('/v1/leilao_expresso/enderecos/excluir/:id', cors(), async(request, response, next) => {
    let endereco = request.params.id
    let dadosEnderecos = await controllerEnderecos.setEditarExcluirEndereco(endereco)

    response.status(dadosEnderecos.status_code)
    response.json(dadosEnderecos)
})

// endpoint: editar o status do endereco para true para ativa-lo
app.put('/v1/leilao_expresso/enderecos/ativar/:id', cors(), async(request, response, next) => {
    let endereco = request.params.id
    let dadosEnderecos = await controllerEnderecos.setEditarRenovarEndereco(endereco)

    response.status(dadosEnderecos.status_code)
    response.json(dadosEnderecos)
})

// endpoint: editar os dados do endereco
app.put('/v1/leilao_expresso/enderecos/:id', cors(), bodyParserJSON, async(request, response, next) => {
    let endereco = request.params.id

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerEnderecos.setAtualizarEndereco(dadosBody, contentType, endereco)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

// endpoint: editar os dados da usuario
app.put('/v1/leilao_expresso/usuarios/:id', cors(), bodyParserJSON, async(request, response, next) => {
    let usuario = request.params.id

    // recebe o content type da requisição (A API deve receber somente application/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body(JSON)
    let dadosBody = request.body

    // encaminha os dados da requisição para a controller enviar para o BD
    let resultDados = await controllerUsuarios.setAtualizarUsuario(dadosBody, contentType, usuario)
    
    response.status(resultDados.status_code)
    response.json(resultDados)
})

// ********************* VENDAS ******************************

app.get('/v1/leilao_expresso/vendas', cors(), async(request, response, next) => {
    // chama a função para retornar os dados das vendas
    let dadosVendas = await controllerVendas.getListarVendas()
    response.status(dadosVendas.status_code)
    response.json(dadosVendas)
})

app.get('/v1/leilao_expresso/vendas/:id', cors(), async(request, response, next) => {
    // recebe o id da requisição das vendas
    let idVendas = request.params.id
    let dadosVendas = await controllerVendas.getBuscarVendas(idVendas)

    response.status(dadosVendas.status_code)
    response.json(dadosVendas)
})

// endpoint: editar o status das vendas para false para "exclui-la"
app.put('/v1/leilao_expresso/vendas/excluir/:id', cors(), async(request, response, next) => {
    let vendas = request.params.id
    let dadosVendas = await controllerVendas.setEditarExcluirVendas(vendas)

    response.status(dadosVendas.status_code)
    response.json(dadosVendas)
})

// endpoint: editar o status das vendas para false para acha-la
app.put('/v1/leilao_expresso/vendas/ativar/:id', cors(), async(request, response, next) => {
    let vendas = request.params.id
    let dadosVendas = await controllerVendas.setEditarRenovarVendas(vendas)

    response.status(dadosVendas.status_code)
    response.json(dadosVendas)
})


app.post('/v1/leilao_expresso/vendas', cors(), bodyParserJSON, async(request, response, next) => {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultDados = await controllerVendas.setInserirNovaVendas(dadosBody, contentType)
    
    response.status(resultDados.status_code)
    response.json(resultDados)

})

app.put('/v1/leilao_expresso/vendas/:id', cors(), bodyParserJSON, async(request, response, next) => {
    let venda = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultDados = await controllerVendas.setAtualizarVendas(dadosBody, contentType, venda)
    
    response.status(resultDados.status_code)
    response.json(resultDados)
})

// ********************* LANCES ******************************

app.get('/v1/leilao_expresso/lances', cors(), async(request, response, next) => {
    // chama a função para retornar os dados dos lances
    let dadosLances = await controllerLances.getListarLances()

    response.status(dadosLances.status_code)
    response.json(dadosLances)
})

app.get('/v1/leilao_expresso/lances/:id', cors(), async(request, response, next) => {
    // recebe o id da requisição das vendas
    let idLances = request.params.id
    let dadosLances = await controllerLances.getBuscarLances(idLances)

    response.status(dadosLances.status_code)
    response.json(dadosLances)
})

// endpoint: editar o status dos arremates para false para "exclui-los"
app.put('/v1/leilao_expresso/lances/excluir/:id', cors(), async(request, response, next) => {
    let lances = request.params.id
    let dadosLances = await controllerLances.setEditarExcluirLances(lances)

    response.status(dadosLances.status_code)
    response.json(dadosLances)
})

// endpoint: editar o status dos arremtes para false para acha-la
app.put('/v1/leilao_expresso/lances/ativar/:id', cors(), async(request, response, next) => {
    let lances = request.params.id
    let dadosLances = await controllerLances.setEditarRenovarLances(lances)

    response.status(dadosLances.status_code)
    response.json(dadosLances)
})

app.post('/v1/leilao_expresso/lances', cors(), bodyParserJSON, async(request, response, next) => {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultDados = await controllerLances.setInserirNovoLance(dadosBody, contentType)
    
    response.status(resultDados.status_code)
    response.json(resultDados)

})

app.put('/v1/leilao_expresso/lances/:id', cors(), bodyParserJSON, async(request, response, next) => {
    let lance = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultDados = await controllerLances.setAtualizarLance(dadosBody, contentType, venda)
    
    response.status(resultDados.status_code)
    response.json(resultDados)
})

// ********************* ARREMATES ******************************

app.get('/v1/leilao_expresso/arremates', cors(), async(request, response, next) => {
    // chama a função para retornar os dados dos arremates
    let dadosArremates = await controllerArremates.getListarArremates()

    response.status(dadosArremates.status_code)
    response.json(dadosArremates)
})

app.get('/v1/leilao_expresso/arremates/:id', cors(), async(request, response, next) => {
    // recebe o id da requisição dos arremates
    let idArremates = request.params.id
    let dadosArremates = await controllerArremates.getBuscarArremates(idArremates)

    response.status(dadosArremates.status_code)
    response.json(dadosArremates)
})

app.put('/v1/leilao_expresso/arremates/excluir/:id', cors(), async(request, response, next) => {
    // para "excluir" um lance
    let arremates = request.params.id
    let dadosArremates = await controllerArremates.setExcluirArremates(arremates)

    response.status(dadosArremates.status_code)
    response.json(dadosArremates)
})

// endpoint: editar o status dos arremates para false para "exclui-los"
app.put('/v1/leilao_expresso/arremates/excluir/:id', cors(), async(request, response, next) => {
    let vendas = request.params.id
    let dadosArremates = await controllerArremates.setEditarExcluirArremates(arremates)

    response.status(dadosArremates.status_code)
    response.json(dadosArremates)
})

// endpoint: editar o status das arremates para false para acha-la
app.put('/v1/leilao_expresso/arremates/ativar/:id', cors(), async(request, response, next) => {
    let arremates = request.params.id
    let dadosArremates = await controllerArremates.setEditarRenovarArremates(arremates)

    response.status(dadosArremates.status_code)
    response.json(dadosArremates)
})


app.post('/v1/leilao_expresso/arremates', cors(), bodyParserJSON, async(request, response, next) => {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultDados = await controllerArremates.setInserirNovoArremate(dadosBody, contentType)
    
    response.status(resultDados.status_code)
    response.json(resultDados)

})

app.put('/v1/leilao_expresso/arremates/:id', cors(), bodyParserJSON, async(request, response, next) => {
    let arremates = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultDados = await controllerArremates.setAtualizarArremate(dadosBody, contentType, venda)
    
    response.status(resultDados.status_code)
    response.json(resultDados)
})

/*************************************************************************/

app.listen(8080, () => {
    console.log('API rodando na porta 8080.')
})
