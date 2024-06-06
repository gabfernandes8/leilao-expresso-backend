/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
*           as tratativas e a regra de negócio para o CRUD de lotes
* Data: 04/06/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import do arquivo DAO para manipular dados do BD
const loteDAO = require('../model/DAO/lotes.js')
const controllerProduto = require('../model/DAO/produto.js')
const controllerUsuario = require('../model/DAO/usuarios.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// post: função para inserir um novo lote no DBA
const setNovoLote = async(dadosLote, contentType) => {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosLote = {}
            let validacaoProduto = await controllerProduto.selectByIdProduto(dadosLote.produto_id) 
            let validacaoUsuario = await controllerUsuario.selectByIdUsuario(dadosLote.usuario_id) 

             //Validação para verificar campos obrigatórios e conistência de dados
             if (dadosLote.data_fim == ''    || dadosLote.data_fim == undefined      || dadosLote.data_fim.length > 10        || 
                dadosLote.produto_id == ''   || dadosLote.produto_id == undefined    || validacaoProduto.status_code == false ||
                dadosLote.usuario_id == ''   || dadosLote.usuario_id == undefined    || validacaoUsuario.status_code == false
            ){
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                //envia os dados para o DAO inserir no BD
                let novoLote = await loteDAO.insertLote(dadosLote)

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (novoLote) {                    
                    let id = await loteDAO.selectLastId()
                    
                    dadosLote.id = Number(id[0].id)
                    
                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosLote.status = message.SUCCESS_CREATED_ITEM.status
                    resultDadosLote.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    resultDadosLote.message = message.SUCCESS_CREATED_ITEM.message
                    resultDadosLote.lote = dadosLote
                    return resultDadosLote
                } 
            }

        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER // 500
    }
}

// put: função para atualizar um lote existente
const setAtualizarLote = async (dadosLote, contentType, id) => {
    try {
        
        let lote = id
        
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosLote = {}
            let validacaoProduto = await controllerProduto.selectByIdProduto(dadosLote.produto_id) 
            let validacaoUsuario = await controllerUsuario.selectByIdUsuario(dadosLote.usuario_id) 

            if (dadosLote.data_fim == ''     || dadosLote.data_fim == undefined      || dadosLote.data_fim.length > 10        || 
                dadosLote.produto_id == ''   || dadosLote.produto_id == undefined    || validacaoProduto.status_code == false ||
                dadosLote.usuario_id == ''   || dadosLote.usuario_id == undefined    || validacaoUsuario.status_code == false
            ){
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                
                //envia os dados para o DAO inserir no BD
                let loteAtt = await loteDAO.updateLote(dadosLote, lote)

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (loteAtt) {
                    dadosLote.id = lote

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosLote.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosLote.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosLote.message = message.SUCCESS_UPDATED_ITEM.message
                    resultDadosLote.lote = dadosLote

                    return resultDadosLote
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

// delete/put: função para esconder um lote existente
const setEditarExcluirLote = async (id) => {
    try {
        let lote = id
        let valLote  = await getBuscarLote(lote)
        let resultDadosLote

        if (lote == '' || lote == undefined || isNaN(lote)) {
            return message.ERROR_INVALID_ID // 400
        } else if(valLote.status == false){
            return message.ERROR_NOT_FOUND // 404
        }else {

            //envia os dados para a model inserir no BD
            resultDadosLote = await loteDAO.updateDeleteLote(lote)
            //Valida se o BD inseriu corretamente os dados
            if (resultDadosLote)
                return message.SUCCESS_DELETED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// put: função para achar um lote existente
const setEditarRenovarLote = async (id) => {
    try {
        let lote = id
        let resultDadosLote

        if (lote == '' || lote == undefined || isNaN(lote)) {
            return message.ERROR_INVALID_ID // 400
        }else {

            //envia os dados para a model inserir no BD
            resultDadosLote = await loteDAO.updateRecoverLote(lote)
            //Valida se o BD inseriu corretamente os dados
            if (resultDadosLote)
                return message.SUCCESS_UPDATED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// get: função para listar todos os lotes existentes no DBA
const getListarLotes = async () => {
    let lotesJSON = {}
    let dadosLotes = await loteDAO.selectAllLotes()

    if (dadosLotes) {
        if (dadosLotes.length > 0) {
            lotesJSON.lotes = dadosLotes
            lotesJSON.qt = dadosLotes.length
            lotesJSON.status_code = 200
            return lotesJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }
}

// get: função para buscar um lote pelo ID
const getBuscarLote = async (id) => {
    // recebe o id
    let idLote = id;
    let lotesJSON = {}
    
    // validação para ID vazio, indefinido ou não numérico
    if (idLote == '' || idLote == undefined || isNaN(idLote)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosLote = await loteDAO.selectByIdLote(idLote)

        if (dadosLote) {
            // validação para verificar se existem dados de retorno
            if (dadosLote.length > 0) {
                lotesJSON.lote = dadosLote
                lotesJSON.status_code = 200
                return lotesJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// get: função para buscar um lote filtrando pela data final
const getLoteByDataFinal = async (dataFinal) => {
    let lotesJSON = {}
    let filtro = dataFinal
    
    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {
        let dadosLote = await loteDAO.selectByDataFinal(filtro)

        if (dadosLote) {
            if (dadosLote.length > 0) {
                lotesJSON.lote = dadosLote
                lotesJSON.qt = dadosLote.length
                lotesJSON.status_code = 200
                return lotesJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

// get: função para buscar um lote filtrando pelo valor
const getLoteByValorFixo = async (valorFixo) => {
    let lotesJSON = {}
    let filtro = valorFixo
    
    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {
        let dadosLote = await loteDAO.selectByValor(filtro)

        if (dadosLote) {
            if (dadosLote.length > 0) {
                lotesJSON.lote = dadosLote
                lotesJSON.qt = dadosLote.length
                lotesJSON.status_code = 200
                return lotesJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

// get: função para buscar um lote filtrando pela categoria
const getLoteByCategoria = async (categoria) => {
    let lotesJSON = {}
    let filtro = categoria
    
    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {
        let dadosLote = await loteDAO.selectByCategoria(filtro)

        if (dadosLote) {
            if (dadosLote.length > 0) {
                lotesJSON.lote = dadosLote
                lotesJSON.qt = dadosLote.length
                lotesJSON.status_code = 200
                return lotesJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}


module.exports={
    setNovoLote,
    setAtualizarLote,
    setEditarExcluirLote,
    setEditarRenovarLote,
    getListarLotes,
    getBuscarLote,
    getLoteByDataFinal,
    getLoteByCategoria,
    getLoteByValorFixo
}