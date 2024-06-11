/******************************************************************************************************
 * Objetivo: Arquivo responsável pela interacão entre o App e a Model, que teremos 
 todas as tratativas e regras de negócio para o CRUD de arremates.
 * DATA: 04/06/2024.
 * Autor: Mariana Alves.
 * Versão: 1.0
******************************************************************************************************/

const arrematesDAO = require('../model/DAO/arremates.js')
const vendasDAO = require('../model/DAO/venda.js')
const lotesDAO = require('../model/DAO/lotes.js')

const getListarArremates = async function() {
    let arrematesJSON = {}
    let dadosArremates = await
    arrematesDAO.selectAllArremates()

    if (dadosArremates) {
       arrematesJSON.arremates = dadosArremates
       arrematesJSON.quantidade = dadosArremates.length
       arrematesJSON.status_code = 200
        return arrematesJSON
    } else {
        return false
    }
}

const getBuscarArremates = async function(id) {
    let idArremates = id
    let arrematesJSON = {}

    if (idArremates == '' || idArremates == undefined || isNaN(idArremates)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosArrematesPorId = await
        arrematesDAO.selectByIdArremates(idArremates)
        if (dadosArrematesPorId) {
            if (dadosArrematesPorId.length > 0) {
               arrematesJSON.arremates = dadosArrematesPorId
               arrematesJSON.status_code = 200
                return arrematesJSON  //200
            } else {
                return message.ERROR_NOT_FOUND //400
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
}

const setEditarExcluirArremates = async function(id) {
    try {
        let arremates = id
        let valArremates = await getBuscarVendas(vendas)
        let resultDadosArremates

        if (vendas == '' || vendas == undefined || isNaN(vendas)) {
            return message.ERROR_INVALID_ID // 400
        } else if(valArremates.status == false){
            return message.ERROR_NOT_FOUND // 404
        }else {
            //envia os dados para a model inserir no BD
            resultDadosArremates = await arrematesDAO.updateDeleteArremates(vendas)
            //envia os dados para a model inserir no BD
            resultDadosArremates = await arrematesDAO.updateArremates(arremates)

            if (resultDadosArremates)
                return message.SUCCESS_DELETED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500
        
    }
} catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

const setEditarRenovarArremates = async (id) => {
    try {
        let arremates = id
        let resultDadosArremates

        if (arremates == '' || arremates == undefined || isNaN(arremates)) {
            return message.ERROR_INVALID_ID // 400
        }else {

            //envia os dados para a model inserir no BD
            resultDadosArremates = await arrematesDAO.updateRecoverArremates(arremates)
            //Valida se o BD inseriu corretamente os dados
            if (resultDadosArremates)
                return message.SUCCESS_UPDATED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

const setInserirNovoArremate = async function(dadosArremates, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            let resultDadosArremates = {}

             if (dadosArremates.valor_final == ''         || dadosArremates.valor_final == undefined              || dadosArremates.valor_final.length > 150       ||
                dadosArremates.venda_id == ''             || dadosArremates.venda_id == undefined                 || dadosArremates.venda_id.length > 50           ||
                dadosArremates.lance_id == ''             || dadosArremates.lance_id == undefined                 || dadosArremates.lance_id.length > 12    
            ){
                return message.ERROR_REQUIRED_FIELDS 
            } else {
                let novoArremate = await arrematesDAO.setInserirNovoArremate(dadosArremates)
            
                if (novoArremate) {
                    
                    let id = await arrematesDAO.selectByIdArremates()
                    
                    resultDadosArremates.id = Number(id[0].id)
                    resultDadosArremates.status = message.SUCCESS_CREATED_ITEM.status
                    resultDadosArremates.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    resultDadosArremates.message = message.SUCCESS_CREATED_ITEM.message
                    resultDadosArremates.arremates = dadosArremates
                    return resultDadosArremates
                } 
            }

        } else {
            return message.ERROR_CONTENT_TYPE 
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER 
    }
}

const setAtualizarArremate = async function(dadosArremates, contentType, id){
    try {
        
        let arremates = id
        
        if (String(contentType).toLowerCase() == 'application/json') {

            let resultDadosArremates = {}

            if (dadosArremates.valor_final == ''       || dadosArremates.valor_final == undefined              || dadosArremates.valor_final.length > 150       ||
                dadosArremates.venda_id == ''          || dadosArremates.venda_id == undefined                 || dadosArremates.venda_id.length > 50           ||
                dadosArremates.lance_id == ''          || dadosArremates.lance_id == undefined                 || dadosArremates.lance_id.length > 12    
            ){
                return message.ERROR_REQUIRED_FIELDS 
            } else {
               
                let arrematesAtualizado = await arrematesDAO.updateArremates(dadosArremates, arremates);

                if (arrematesAtualizado) {
                    dadosArremates.id = arremates
                    resultDadosArremates.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosArremates.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosArremates.message = message.SUCCESS_UPDATED_ITEM.message
                    resultDadosArremates.arremates = dadosArremates

                    return resultDadosArremates
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

module.exports = {
    setInserirNovoArremate,
    setAtualizarArremate,
    setEditarExcluirArremates,
    setEditarRenovarArremates,
    getBuscarArremates,
    getListarArremates
}

