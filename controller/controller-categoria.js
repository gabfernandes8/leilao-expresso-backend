/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
* as tratativas e a regra de negócio para o CRUD de categorias
* Data: 31/05/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import do arquivo DAO para manipular dados do BD
const categoriaDAO = require('../model/DAO/categoria.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// post: função para inserir uma nova categoria no DBA
const setNovaCategoria = async(dadosCategoria, contentType) => {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosCategoria = {}

             //Validação para verificar campos obrigatórios e conistência de dados
             if (dadosCategoria.nome == '' || dadosCategoria.nome == undefined || dadosCategoria.nome.length > 45
            ){
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                //envia os dados para o DAO inserir no BD
                let novaCategoria = await categoriaDAO.insertCategoria(dadosCategoria)
                
                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (novaCategoria) {
                    
                    let id = await categoriaDAO.selectLastId()
                    
                    dadosCategoria.id = Number(id[0].id)
                    
                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosCategoria.status = message.SUCCESS_CREATED_ITEM.status
                    resultDadosCategoria.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    resultDadosCategoria.message = message.SUCCESS_CREATED_ITEM.message
                    resultDadosCategoria.categoria = dadosCategoria
                    return resultDadosCategoria
                } 
            }

        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER // 500
    }
}

// put: função para atualizar uma categoria existente
const setAtualizarCategoria = async (dadosCategoria, contentType, id) => {
    try {
        
        let categoria = id
        
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosCategoria = {}

            if (dadosCategoria.nome == '' || dadosCategoria.nome == undefined || dadosCategoria.nome.length > 45
            ){
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                
                //envia os dados para o DAO inserir no BD
                let categoriaAtt = await categoriaDAO.updateCategoria(dadosCategoria, categoria);

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (categoriaAtt) {
                    dadosCategoria.id = categoria

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosCategoria.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosCategoria.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosCategoria.message = message.SUCCESS_UPDATED_ITEM.message
                    resultDadosCategoria.categoria = dadosCategoria

                    return resultDadosCategoria
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

// delete/put: função para esconder uma categoria existente
const setEditarExcluirCategoria = async (id) => {
    try {
        let categoria = id
        let valCategoria  = await getBuscarCategoria(categoria)
        let resultDadosCategoria

        if (categoria == '' || categoria == undefined || isNaN(categoria)) {
            return message.ERROR_INVALID_ID // 400
        } else if(valCategoria.status == false){
            return message.ERROR_NOT_FOUND // 404
        }else {

            //envia os dados para a model inserir no BD
            resultDadosCategoria = await categoriaDAO.updateDeleteCategoria(categoria)
            //Valida se o BD inseriu corretamente os dados
            if (resultDadosCategoria)
                return message.SUCCESS_DELETED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// put: função para achar uma categoria existente
const setEditarRenovarCategoria = async (id) => {
    try {
        let categoria = id
        let resultDadosCategoria

        if (categoria == '' || categoria == undefined || isNaN(categoria)) {
            return message.ERROR_INVALID_ID // 400
        }else {

            //envia os dados para a model inserir no BD
            resultDadosCategoria = await categoriaDAO.updateRecoverCategoria(categoria)
            //Valida se o BD inseriu corretamente os dados
            if (resultDadosCategoria)
                return message.SUCCESS_UPDATED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// get: função para listar todas as categorias existentes no DBA
const getListarCategoria = async () => {
    let categoriaJSON = {}
    let dadosCategorias = await categoriaDAO.selectAllCategorias()

    if (dadosCategorias) {
        if (dadosCategorias.length > 0) {
            categoriaJSON.categorias = dadosCategorias
            categoriaJSON.qt = dadosCategorias.length
            categoriaJSON.status_code = 200
            return categoriaJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }
}

// get: função para buscar uma categoria pelo ID
const getBuscarCategoria = async (id) => {
    // recebe o id da GegetBuscarClassificacao
    let idCategoria = id;
    let categoriaJSON = {}
    
    // validação para ID vazio, indefinido ou não numérico
    if (idCategoria == '' || idCategoria == undefined || isNaN(idCategoria)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosCategoria = await categoriaDAO.selectByIdCategoria(idCategoria)

        if (dadosCategoria) {
            // validação para verificar se existem dados de retorno
            if (dadosCategoria.length > 0) {
                categoriaJSON.categoria = dadosCategoria
                categoriaJSON.status_code = 200
                return categoriaJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// get: função para buscar uma categoria filtrando pelo nome
const getCategoriaByNome = async (nome) => {
    let categoriaJSON = {}
    let filtro = nome
    
    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {
        let dadosCategoria = await categoriaDAO.selectByNome(filtro)

        if (dadosCategoria) {
            if (dadosCategoria.length > 0) {
                categoriaJSON.categoria = dadosCategoria
                categoriaJSON.qt = dadosCategoria.length
                categoriaJSON.status_code = 200
                return categoriaJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

module.exports={
    setNovaCategoria,
    setAtualizarCategoria,
    setEditarExcluirCategoria,
    setEditarRenovarCategoria,
    getListarCategoria,
    getBuscarCategoria,
    getCategoriaByNome
}