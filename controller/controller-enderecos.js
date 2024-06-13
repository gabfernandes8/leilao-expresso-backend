// objetivo: Arquivo responsavel pela interação entre o APP e o Model, que teremos todas as tratativas e regra de negocio para o crud de Enderecos
// data: 04-06-24 - inicio
// autor: Eduardo Goncalves de Oliveira
// versao: 1.0

// import do arq DAO para manipular dados do banco de dados
const enderecosDAO = require('../model/DAO/enderecos')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// funcao para retornar todos os usuarios do banco de dados
const getListarEnderecos = async function() {

    let enderecosJSON = {}

    // chama a função do dao para retornar dados no bd
    let dadosEnderecos = await enderecosDAO.selectAllEnderecos()

    // verifica se existem dados
    if (dadosEnderecos) {
        // montando o json para retornar para o app
        enderecosJSON.enderecos = dadosEnderecos
        enderecosJSON.quantidade = dadosEnderecos.length
        enderecosJSON.status_code = 200
        return enderecosJSON
    } else {
        return false
    }
}

// funcao para buscar um usuario específico do banco de dados pelo id
const getBuscarEndereco = async function(id) {

    // recebe o id do usuario
    let idEndereco = id
    let enderecoJSON = {}

    // validação para id vazio, indefinido ou nao numerico
    if (idEndereco == '' || idEndereco == undefined || isNaN(idEndereco)) {
        return message.ERROR_INVALID_ID
    } else {

        // chama a função do dao para retornar dados no bd
        let dadosEnderecosPorID = await enderecosDAO.selectByIdEndereco(idEndereco)

        // verifica se dados no servidor de banco foram processados
        if (dadosEnderecosPorID) {

            // validaão para veificar se existem dados a serem processados
            if (dadosEnderecosPorID.length > 0) {
                // montando o json para retornar para o app
                enderecoJSON.usuarios = dadosEnderecosPorID
                enderecoJSON.status_code = 200
                return enderecoJSON //200
            } else {
                return message.ERROR_NOT_FOUND //400
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
}

// delete/put: função para esconder um endereco existente
const setEditarExcluirEndereco = async (id) => {
    try {
        let endereco = id
        let valEndereco  = await getBuscarEndereco(endereco)
        let resultDadosEndereco

        if (endereco == '' || endereco == undefined || isNaN(endereco)) {
            return message.ERROR_INVALID_ID // 400
        } else if(valEndereco.status == false){
            return message.ERROR_NOT_FOUND // 404
        }else {

            //envia os dados para a model inserir no BD
            resultDadosEndereco = await enderecosDAO.updateDeleteEndereco(endereco)
            //Valida se o BD inseriu corretamente os dados
            if (resultDadosEndereco)
                return message.SUCCESS_DELETED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// put: função para ativar um endereco existente
const setEditarRenovarEndereco = async (id) => {
    try {
        let endereco = id
        let resultDadosEndereco

        if (endereco == '' || endereco == undefined || isNaN(endereco)) {
            return message.ERROR_INVALID_ID // 400
        }else {

            //envia os dados para a model inserir no BD
            resultDadosEndereco = await enderecosDAO.updateRecoverEndereco(endereco)
            //Valida se o BD inseriu corretamente os dados
            if (resultDadosEndereco)
                return message.SUCCESS_UPDATED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// funcao para inserir um novo usuario do banco de dados
const setInserirNovoEndereco = async function(dadosEndereco, contentType) {

    try {

        // recebe o tipo de conteudo Content-type da requisição ( a api deve receber dados application/json)
        if (String(contentType).toLowerCase() == 'application/json') {

            // cia a variavel json
            let resultDadosEndereco = {}

            // validação de dados
            if (dadosEndereco.cep == '' || dadosEndereco.cep == undefined || dadosEndereco.cep.length > 8 ||
                dadosEndereco.logradouro == '' || dadosEndereco.logradouro == undefined || dadosEndereco.logradouro.length > 100 ||
                dadosEndereco.numero_casa == '' || dadosEndereco.numero_casa == undefined || dadosEndereco.numero_casa.length > 10 ||
                dadosEndereco.bairro == '' || dadosEndereco.bairro == undefined || dadosEndereco.bairro.length > 45 ||
                dadosEndereco.cidade == '' || dadosEndereco.cidade == undefined || dadosEndereco.cidade.length > 45
            ){
                return message.ERROR_REQUIRED_FIELDS
            } else {

                // variavel para validar se poderemos chamar o dao para inserirf os dados 
                let dadosValidated = false

                // validação de digitação para a foto de perfil: que não é campo obrigatorio
                if (dadosEndereco.complemento != null && dadosEndereco.complemento != undefined && dadosEndereco.complemento != "") {
                    if (dadosEndereco.complemento.length > 45) {
                        return message.ERROR_REQUIRED_FIELDS; // 400 - campos preenchidos incorretamente
                    } else {
                        dadosValidated = true // se a foto estiver dentro do escopo de char definidos
                    }
                } else {
                    dadosValidated = true // se a data não existir nos dados
                }

                // validação para verificar se podemos encarregar os dados para o dao
                if (dadosValidated) {

                    // encaminha dados para o dao inserir no banco de dados
                    let novoEndereco = await enderecosDAO.insertEndereco(dadosEndereco)

                    // validação dos dados sendo nseridos pelo dao no banco de dados
                    if (novoEndereco) {

                       let id = await enderecosDAO.selectLastId()

                        dadosEndereco.id = Number(id[0].id)

                        // cria o padrão json ´para o retoro dos dados criados
                        resultDadosEndereco.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        resultDadosEndereco.message = message.SUCCESS_CREATED_ITEM.message
                        resultDadosEndereco.enderecos = dadosEndereco

                        

                        return resultDadosEndereco // 201 
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DBA // 500 erro na camada do DAO
                    }
                }
            }
        } else {
            console.log(error);
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

// funcao para atualizar um filme do banco de dados
const setAtualizarEndereco = async function(dadosEndereco, idEndereco, contentType) {
    try {

        let endereco = idEndereco

        // Validação de content-type (apenas aplication/json)
        if (String(contentType).toLowerCase() == 'application/json') {
            let dadosID = enderecosDAO.selectByIdEndereco()

            if (endereco == '' || endereco == undefined || endereco == isNaN(endereco) || endereco == null) {
                return message.ERROR_INVALID_ID
            } else if (endereco > dadosID.length) {
                return message.ERROR_NOT_FOUND
            } else {
                // Cria o objeto JSON para devolver os dados criados na requisição
                let atualizarEnderecoJSON = {}

                //Validação de campos obrigatórios ou com digitação inválida
                if (dadosEndereco.cep == '' || dadosEndereco.cep == undefined || dadosEndereco.cep.length > 8 ||
                    dadosEndereco.logradouro == '' || dadosEndereco.logradouro == undefined || dadosEndereco.logradouro.length > 100 ||
                    dadosEndereco.numero_casa == '' || dadosEndereco.numero_casa == undefined || dadosEndereco.numero_casa.length > 10 ||
                    dadosEndereco.bairro == '' || dadosEndereco.bairro == undefined || dadosEndereco.bairro.length > 45 ||
                    dadosEndereco.cidade == '' || dadosEndereco.cidade == undefined || dadosEndereco.cidade.length > 45) {
                    return message.ERROR_REQUIRED_FIELDS
                } else {
                    let validateStatus = false

                    // Outra validação com campos obrigatorios ou com digitação inválida
                    if (dadoAtualizado.complemento != null &&
                        dadoAtualizado.complemento != '' &&
                        dadoAtualizado.complemento != undefined) {

                        if (dadoAtualizado.complemento.length > 45) {
                            return message.ERROR_REQUIRED_FIELDS //400
                        } else {
                            validateStatus = true
                        }
                    } else {

                        validateStatus = true
                    }

                    // Validação para verificar se a variavel booleana é verdadeira
                    if (validateStatus) {

                        // Encaminha os dados do filme para o DAO inserir no DB
                        let dadosEndereco = await enderecosDAO.updateEndereco(dadosEndereco, endereco)

                        // if(atualizarFilme){
                        //     let idFilmes = await filmesDAO.IDFilme()
                        //     console.log(idFilmes)
                        //     dadoAtualizado.id = Number(idFilmes[0].id)
                        // }

                        // Validação para verificar se o DAO inseriu os dados do DB
                        if (dadosEndereco) {

                            dadosEndereco.id = endereco
                            //Cria o JSON de retorno dos dados (201)
                            atualizarEnderecoJSON.endereco = dadosEndereco
                            atualizarEnderecoJSON.status = message.SUCCESS_UPDATED_ITEM.status
                            atualizarEnderecoJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                            atualizarEnderecoJSON.message = message.SUCCESS_UPDATED_ITEM.message
                            return atualizarEnderecoJSON //201

                        } else {
                            return message.ERROR_INTERNAL_SERVER_DBA //500
                        }
                    } else {
                        validateStatus = false
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER //500 - erro na controller
    }
}

module.exports = {
    setAtualizarEndereco,
    setInserirNovoEndereco,
    getBuscarEndereco,
    setEditarExcluirEndereco,
    setEditarRenovarEndereco,
    getListarEnderecos
}