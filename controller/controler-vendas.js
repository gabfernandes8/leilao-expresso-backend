/******************************************************************************************************
 * Objetivo: Arquivo responsável pela interacão entre o App e a Model, que teremos 
 todas as tratativas e regras de negócio para o CRUD de vendas.
 * DATA: 23/04/2024
 * Autor: Mariana Alves.
 * Versão: 1.0
******************************************************************************************************/

const vendasDAO = require('../model/DAO/venda.js')
const message = require('../modulo/config.js')

const getListarVendas = async function() {
    let vendasJSON = {}
    let dadosVendas = await
    vendasDAO.selectAllVendas()

    if (dadosVendas) {
      vendasJSON.vendas = dadosVendas
       vendasJSON.quantidade = dadosVendas.length
       vendasJSON.status_code = 200
        return vendasJSON
    } else {
        return false
    }
}

const getBuscarVendas= async function(id) {
    let idVenda = id
    let vendasJSON = {}

    if (idVenda== '' || idVenda == undefined || isNaN(idVenda)) {
        return message.ERROR_INVALID_ID
    } else {

    let dadosVendasPorId = await
    vendasDAO.selectByIdVenda(idVenda)

    if (dadosVendasPorId) {
            if (dadosVendasPorId.length > 0) {
               vendasJSON.usuarios = dadosVendasPorId
               vendasJSON.status_code = 200
                return vendasJSON  //200
            } else {
                return message.ERROR_NOT_FOUND //400
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
}

const setEditarExcluirVendas = async function(id) {
    try {
        let vendas = id
        let valVendas = await getBuscarVendas(vendas)
        let resultDadosVendas

        if (vendas == '' || vendas == undefined || isNaN(vendas)) {
            return message.ERROR_INVALID_ID // 400
        } else if(valVendas.status == false){
            return message.ERROR_NOT_FOUND // 404
        }else {
            //envia os dados para a model inserir no BD
            resultDadosVendas = await vendasDAO.updateDeleteVendas(vendas)
            //envia os dados para a model inserir no BD
            resultDadosVendas = await vendasDAO.updateVendas(vendas)

            if (resultDadosVendas)
                return message.SUCCESS_DELETED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500
        
    }
} catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

const setEditarRenovarVendas = async (id) => {
    try {
        let vendas = id
        let resultDadosVenda

        if (vendas == '' || vendas == undefined || isNaN(vendas)) {
            return message.ERROR_INVALID_ID // 400
        }else {

            //envia os dados para a model inserir no BD
            resultDadosVenda = await vendasDAO.updateRecoverVendas(vendas)
            //Valida se o BD inseriu corretamente os dados
            if (resultDadosVenda)
                return message.SUCCESS_UPDATED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

const setInserirNovaVendas = async function(dadosVendas) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            let resultDadosVendas = {}

             if (dadosVendas.usuario_id == ''         || dadosVendas.usuario_id == undefined              || dadosVendas.usuario_id.length > 150       ||
                dadosVendas.produto_id == ''          || dadosVendas.produto_id == undefined              || dadosVendas.produto_id.length > 50          
            ){
                return message.ERROR_REQUIRED_FIELDS 
            } else {
                let novaVenda = await vendasDAO.insertVendas(dadosVendas)
            
                if (novaVenda) {
                    
                    let id = await vendasDAO.selectByIdVendas()
                    
                    resultDadosVendas.id = Number(id[0].id)
                    resultDadosVendas.status = message.SUCCESS_CREATED_ITEM.status
                    resultDadosVendas.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    resultDadosVendas.message = message.SUCCESS_CREATED_ITEM.message
                    resultDadosVendas.vendas = dadosVendas
                    return resultDadosVendas
                } 
            }

        } else {
            return message.ERROR_CONTENT_TYPE 
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER 
    }
}
const setAtualizarVendas = async function(dadosVendas, id) {
    try {
        let  venda = id
        
        if (String(contentType).toLowerCase() == 'application/json') {

            let resultDadosVendas = {}

            if (dadosVendas.usuario_id == ''       || dadosVendas.usuario_id == undefined              || dadosVendas.usuario_id.length > 150       ||
                dadosVendas.produto_id == ''       || dadosVendas.produto_id == undefined              || dadosVendas.produto_id.length > 50             
            ){
                return message.ERROR_REQUIRED_FIELDS 
            } else {
               
                let vendasAtualizada = await vendasDAO.updateVendas(dadosVendas, venda);

                if (vendasAtualizada) {
                    dadosVendas.id = venda
                    resultDadosVendas.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosVendas.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosVendas.message = message.SUCCESS_UPDATED_ITEM.message
                    resultDadosVendas.vendas = dadosVendas

                    return resultDadosVendas
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB // 500
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
    setInserirNovaVendas,
    setAtualizarVendas,
    setEditarExcluirVendas,
    setEditarRenovarVendas,
    getBuscarVendas,
    getListarVendas
}