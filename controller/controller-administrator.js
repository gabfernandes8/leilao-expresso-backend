/***************************************************************************************
* Objetivo: arquivo responsável pela interação entre o app e a model, que teremos todas
* as tratativas e a regra de negócio para o CRUD de administradores
* Data: 28/05/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import do arquivo DAO para manipular dados do BD
const adminDAO = require('../model/DAO/administrator.js')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// post: função para inserir um novo admin no DBA
const setNovoAdmin = async(dadosAdmin, contentType) => {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosAdmin = {}

             //Validação para verificar campos obrigatórios e conistência de dados
             if (dadosAdmin.nome == ''             || dadosAdmin.nome == undefined              || dadosAdmin.nome.length > 150       ||
                dadosAdmin.email == ''             || dadosAdmin.email == undefined             || dadosAdmin.email.length > 50       ||
                dadosAdmin.telefone == ''          || dadosAdmin.telefone == undefined          || dadosAdmin.telefone.length > 12    ||
                dadosAdmin.senha == ''             || dadosAdmin.senha == undefined             || dadosAdmin.senha.length > 30       ||
                dadosAdmin.cpf == ''               || dadosAdmin.cpf == undefined               || dadosAdmin.cpf.length > 11
            ){
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                //envia os dados para o DAO inserir no BD
                let novoAdmin = await adminDAO.insertAdmin(dadosAdmin)
                
                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (novoAdmin) {
                    
                    let id = await adminDAO.selectLastId()
                    
                    dadosAdmin.id = Number(id[0].id)
                    
                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosAdmin.status = message.SUCCESS_CREATED_ITEM.status
                    resultDadosAdmin.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    resultDadosAdmin.message = message.SUCCESS_CREATED_ITEM.message
                    resultDadosAdmin.admin = dadosAdmin
                    return resultDadosAdmin
                } 
            }

        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER // 500
    }
}

// put: função para atualizar um admin existente
const setAtualizarAdmin = async (dadosAdmin, contentType, id) => {
    try {
        
        let admin = id
        
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosAdmin = {}

            if (dadosAdmin.nome == ''             || dadosAdmin.nome == undefined              || dadosAdmin.nome.length > 150       ||
                dadosAdmin.email == ''             || dadosAdmin.email == undefined             || dadosAdmin.email.length > 50       ||
                dadosAdmin.telefone == ''          || dadosAdmin.telefone == undefined          || dadosAdmin.telefone.length > 12    ||
                dadosAdmin.senha == ''             || dadosAdmin.senha == undefined             || dadosAdmin.senha.length > 30       ||
                dadosAdmin.cpf == ''               || dadosAdmin.cpf == undefined               || dadosAdmin.cpf.length > 11
            ){
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                
                //envia os dados para o DAO inserir no BD
                let adminAtt = await adminDAO.updateAdmin(dadosAdmin, admin);

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (adminAtt) {
                    dadosAdmin.id = admin

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosAdmin.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosAdmin.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosAdmin.message = message.SUCCESS_UPDATED_ITEM.message
                    resultDadosAdmin.admin = dadosAdmin

                    return resultDadosAdmin
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

// delete/put: função para esconder um admin existente
const setEditarExcluirAdmin = async (id) => {
    try {
        let admin = id
        let valAdmin  = await getBuscarAdmin(admin)
        let resultDadosAdmin

        if (admin == '' || admin == undefined || isNaN(admin)) {
            return message.ERROR_INVALID_ID // 400
        } else if(valAdmin.status == false){
            return message.ERROR_NOT_FOUND // 404
        }else {

            //envia os dados para a model inserir no BD
            resultDadosAdmin = await adminDAO.updateDeleteAdmin(admin)
            //Valida se o BD inseriu corretamente os dados
            if (resultDadosAdmin)
                return message.SUCCESS_DELETED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// put: função para achar um admin existente
const setEditarRenovarAdmin = async (id) => {
    try {
        let admin = id
        let resultDadosAdmin

        if (admin == '' || admin == undefined || isNaN(admin)) {
            return message.ERROR_INVALID_ID // 400
        }else {

            //envia os dados para a model inserir no BD
            resultDadosAdmin = await adminDAO.updateRecoverAdmin(admin)
            //Valida se o BD inseriu corretamente os dados
            if (resultDadosAdmin)
                return message.SUCCESS_UPDATED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// get: função para listar todos os admins existentes no DBA
const getListarAdmins = async () => {
    let adminJSON = {}
    let dadosAdmins = await adminDAO.selectAllAdmin()

    if (dadosAdmins) {
        if (dadosAdmins.length > 0) {
            adminJSON.admins = dadosAdmins
            adminJSON.qt = dadosAdmins.length
            adminJSON.status_code = 200
            return adminJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }
}

// get: função para buscar um admin pelo ID
const getBuscarAdmin = async (id) => {
    // recebe o id da GegetBuscarClassificacao
    let idAdmin = id;
    let adminJSON = {}
    
    // validação para ID vazio, indefinido ou não numérico
    if (idAdmin == '' || idAdmin == undefined || isNaN(idAdmin)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosAdmin = await adminDAO.selectByIdAdmin(idAdmin)

        if (dadosAdmin) {
            // validação para verificar se existem dados de retorno
            if (dadosAdmin.length > 0) {
                adminJSON.admin = dadosAdmin
                adminJSON.status_code = 200
                return adminJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// get: função para buscar um admin filtrando pelo nome
const getAdminByNome = async (nome) => {
    let adminJSON = {}
    let filtro = nome

    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        let dadosAdmin = await adminDAO.selectByNome(filtro)
        if (dadosAdmin) {
            if (dadosAdmin.length > 0) {
                adminJSON.admin = dadosAdmin
                adminJSON.qt = dadosAdmin.length
                adminJSON.status_code = 200
                return adminJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

module.exports={
    setNovoAdmin,
    setAtualizarAdmin,
    setEditarExcluirAdmin,
    setEditarRenovarAdmin,
    getListarAdmins,
    getBuscarAdmin,
    getAdminByNome
}