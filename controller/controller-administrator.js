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

            }


        }

    } catch (error) {
        
    }
}