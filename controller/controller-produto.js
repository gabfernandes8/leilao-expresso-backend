/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
*           as tratativas e a regra de negócio para o CRUD de produtos
* Data: 04/06/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import do arquivo DAO para manipular dados do BD
const produtoDAO = require('../model/DAO/produto.js')
const controllerCategoria = require('../model/DAO/categoria.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// post: função para inserir um novo produto no DBA
const setNovoProduto = async(dadosProduto, contentType) => {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosProduto = {}
            let validacaoCategoria = await controllerCategoria.selectByIdCategoria(dadosProduto.categoria_id) 

             //Validação para verificar campos obrigatórios e conistência de dados
             if (dadosProduto.nome == ''        || dadosProduto.nome == undefined          || dadosProduto.valor_fixo.length > 65535 || 
                dadosProduto.descricao == ''    || dadosProduto.descricao == undefined     || dadosProduto.valor_fixo.length > 65535 ||
                dadosProduto.valor_fixo == ''   || dadosProduto.valor_fixo == undefined    ||
                dadosProduto.foto_produto == '' || dadosProduto.foto_produto == undefined  || dadosProduto.foto_produto.length > 255 ||
                dadosProduto.categoria_id == '' || dadosProduto.categoria_id == undefined  || validacaoCategoria.status_code == false
            ){
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                //envia os dados para o DAO inserir no BD
                let novoProduto = await produtoDAO.insertProduto(dadosProduto)

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (novoProduto) {                    
                    let id = await produtoDAO.selectLastId()
                    
                    dadosProduto.id = Number(id[0].id)
                    
                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosProduto.status = message.SUCCESS_CREATED_ITEM.status
                    resultDadosProduto.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    resultDadosProduto.message = message.SUCCESS_CREATED_ITEM.message
                    resultDadosProduto.produto = dadosProduto
                    return resultDadosProduto
                } 
            }

        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER // 500
    }
}

// put: função para atualizar um produto existente
const setAtualizarProduto = async (dadosProduto, contentType, id) => {
    try {
        
        let produto = id
        
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosProduto = {}
            let validacaoCategoria = await controllerCategoria.selectByIdCategoria(dadosProduto.categoria_id) 

            if (dadosProduto.nome == ''         || dadosProduto.nome == undefined          || dadosProduto.nome.length > 65535       ||
                dadosProduto.descricao == ''    || dadosProduto.descricao == undefined     || dadosProduto.valor_fixo.length > 65535 ||
                dadosProduto.valor_fixo == ''   || dadosProduto.valor_fixo == undefined    || dadosProduto.valor_fixo.length <= 0    ||
                dadosProduto.foto_produto == '' || dadosProduto.foto_produto == undefined  || dadosProduto.foto_produto.length > 255 ||
                dadosProduto.categoria_id == '' || dadosProduto.categoria_id == undefined  || validacaoCategoria.status_code == false
            ){
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                
                //envia os dados para o DAO inserir no BD
                let produtoAtt = await produtoDAO.updateProduto(dadosProduto, produto)

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (produtoAtt) {
                    dadosProduto.id = produto

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosProduto.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosProduto.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosProduto.message = message.SUCCESS_UPDATED_ITEM.message
                    resultDadosProduto.produto = dadosProduto

                    return resultDadosProduto
                } else {
                    return message.ERROR_INTERNAL_SERVER_DBA // 500
                }

            }

        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER // 500
    }
}

// delete/put: função para esconder um produto existente
const setEditarExcluirProduto = async (id) => {
    try {
        let produto = id
        let valProduto  = await getBuscarProduto(produto)
        let resultDadosProduto

        if (produto == '' || produto == undefined || isNaN(produto)) {
            return message.ERROR_INVALID_ID // 400
        } else if(valProduto.status == false){
            return message.ERROR_NOT_FOUND // 404
        }else {

            //envia os dados para a model inserir no BD
            resultDadosProduto = await produtoDAO.updateDeleteProduto(produto)
            //Valida se o BD inseriu corretamente os dados
            if (resultDadosProduto)
                return message.SUCCESS_DELETED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// put: função para achar um produto existente
const setEditarRenovarProduto = async (id) => {
    try {
        let produto = id
        let resultDadosProduto

        if (produto == '' || produto == undefined || isNaN(produto)) {
            return message.ERROR_INVALID_ID // 400
        }else {

            //envia os dados para a model inserir no BD
            resultDadosProduto = await produtoDAO.updateRecoverProduto(produto)
            //Valida se o BD inseriu corretamente os dados
            if (resultDadosProduto)
                return message.SUCCESS_UPDATED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// get: função para listar todos os produtos existentes no DBA
const getListarProdutos = async () => {
    let produtoJSON = {}
    let dadosProdutos = await produtoDAO.selectAllProdutos()

    if (dadosProdutos) {
        if (dadosProdutos.length > 0) {
            produtoJSON.produtos = dadosProdutos
            produtoJSON.qt = dadosProdutos.length
            produtoJSON.status_code = 200
            return produtoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }
}

// get: função para buscar um produto pelo ID
const getBuscarProduto = async (id) => {
    // recebe o id
    let idProduto = id;
    let produtoJSON = {}
    
    // validação para ID vazio, indefinido ou não numérico
    if (idProduto == '' || idProduto == undefined || isNaN(idProduto)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosProduto = await produtoDAO.selectByIdProduto(idProduto)

        if (dadosProduto) {
            // validação para verificar se existem dados de retorno
            if (dadosProduto.length > 0) {
                produtoJSON.produto = dadosProduto
                produtoJSON.status_code = 200
                return produtoJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// get: função para buscar um produto filtrando pelo nome
const getProdutoByNome = async (nome) => {
    let produtoJSON = {}
    let filtro = nome
    
    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {
        let dadosProduto = await produtoDAO.selectByNome(filtro)

        if (dadosProduto) {
            if (dadosProduto.length > 0) {
                produtoJSON.produto = dadosProduto
                produtoJSON.qt = dadosProduto.length
                produtoJSON.status_code = 200
                return produtoJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

// get: função para buscar um produto filtrando pela categoria
const getProdutoByCategoria = async (categoria) => {
    let produtoJSON = {}
    let filtro = categoria
    
    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {
        let dadosProduto = await produtoDAO.selectByCategoria(filtro)

        if (dadosProduto) {
            if (dadosProduto.length > 0) {
                produtoJSON.produto = dadosProduto
                produtoJSON.qt = dadosProduto.length
                produtoJSON.status_code = 200
                return produtoJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

module.exports={
    setNovoProduto,
    setAtualizarProduto,
    setEditarExcluirProduto,
    setEditarRenovarProduto,
    getListarProdutos,
    getBuscarProduto,
    getProdutoByCategoria,
    getProdutoByNome
}