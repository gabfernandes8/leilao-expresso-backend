// objetivo: Arquivo responsavel pela interação entre o APP e o Model, que teremos todas as tratativas e regra de negocio para o crud de Usuarios
// data: 28-05-24 - inicio
// autor: Eduardo Goncalves de Oliveira
// versao: 1.0

// import do arq DAO para manipular dados do banco de dados
const usuariosDAO = require('../model/DAO/usuarios')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// funcao para retornar todos os usuarios do banco de dados
const getListarUsuarios = async function() {

    let usuariosJSON = {}

    // chama a função do dao para retornar dados no bd
    let dadosUsuarios = await usuariosDAO.selectAllUsuarios()

    // verifica se existem dados
    if (dadosUsuarios) {
        // montando o json para retornar para o app
        usuariosJSON.usuarios = dadosUsuarios
        usuariosJSON.quantidade = dadosUsuarios.length
        usuariosJSON.status_code = 200
        return usuariosJSON
    } else {
        return false
    }
}


// funcao para buscar um usuario específico do banco de dados pelo id
const getBuscarUsuario = async function(id) {

    // recebe o id do usuario
    let idUsuario = id
    let usuarioJSON = {}

    // validação para id vazio, indefinido ou nao numerico
    if (idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)) {
        return message.ERROR_INVALID_ID
    } else {

        // chama a função do dao para retornar dados no bd
        let dadosUsuariosPorID = await usuariosDAO.selectByIdUsuario(idUsuario)

        // verifica se dados no servidor de banco foram processados
        if (dadosUsuariosPorID) {

            // validaão para veificar se existem dados a serem processados
            if (dadosUsuariosPorID.length > 0) {
                // montando o json para retornar para o app
                usuarioJSON.usuarios = dadosUsuariosPorID
                usuarioJSON.status_code = 200
                return usuarioJSON //200
            } else {
                return message.ERROR_NOT_FOUND //400
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
}

// funcao para excluir um usuario do banco de dados
const setExcluirUsuario = async function(id) {

    // recebe o id do usuario
    let idUsuario = id
    let usuarioJSON = {}

    // validação para id vazio, indefinido ou nao numerico
    if (idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)) {
        return message.ERROR_INVALID_ID
    } else {

        // chama a função do dao para retornar dados no bd
        let deletePorID = await usuariosDAO.deleteUsuario(idUsuario)

        // verifica se dados no servidor de banco foram processados
        if (deletePorID) {

            // validação para veificar se existem dados a serem processados
            if (deletePorID.length > 0) {
                // montando o json para retornar para o app
                usuarioJSON.usuarios = deletePorID
                usuarioJSON.status_code = 500
                return message.ERROR_INTERNAL_SERVER
            } else {
                return message.REQUEST_SUCCEEDED //400
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
}

// funcao para inserir um novo usuario do banco de dados
const setInserirNovoUsuario = async function(dadosUsuario, contentType) {

    try {


        // recebe o tipo de conteudo Content-type da requisição ( a api deve receber dados application/json)
        if (String(contentType).toLowerCase() == 'application/json') {

            // cia a variavel json
            let resultDadosFilme = {}

            // validação de dados
            if (dadosUsuario.nome == '' || dadosUsuario.nome == undefined || dadosUsuario.nome.length > 150 ||
                dadosUsuario.email == '' || dadosUsuario.email == undefined || dadosUsuario.email.length > 50 ||
                dadosUsuario.telefone == '' || dadosUsuario.telefone == undefined || dadosUsuario.telefone.length > 12 ||
                dadosUsuario.senha == '' || dadosUsuario.senha == undefined || dadosUsuario.senha.length > 30 ||
                dadosUsuario.cpf == '' || dadosUsuario.cpf == undefined || dadosUsuario.cpf.length > 11 ||
                dadosUsuario.foto_perfil == '' || dadosUsuario.foto_perfil == undefined || dadosUsuario.foto_perfil.length > 255 ||
                dadosUsuario.endereco_id == '' || dadosUsuario.endereco_id == undefined ||
                dadosUsuario.status == '' || dadosUsuario.status == undefined || dadosUsuario.status.length > 1) {
                return message.ERROR_REQUIRED_FIELDS
            } else {

                // variavel para validar se poderemos chamar o dao para inserirf os dados 
                let dadosValidated = false

                // validação de digitação para a foto de perfil: que não é campo obrigatorio
                if (dadosUsuario.foto_perfil != null && dadosUsuario.foto_perfil != undefined && dadosUsuario.foto_perfil != "") {
                    if (dadosUsuario.foto_perfil.length > 255) {
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
                    let novoUsuario = await usuariosDAO.insertUsuario(dadosUsuario)

                    // validação dos dados sendo nseridos pelo dao no banco de dados
                    if (novoUsuario) {

                        // cria o padrão json ´para o retoro dos dados criados
                        resultDadosFilme.status = message.SUCESS_CREATED_ITEM.status
                        resultDadosFilme.status_code = message.SUCESS_CREATED_ITEM.status_code
                        resultDadosFilme.message = message.SUCESS_CREATED_ITEM.message
                        resultDadosFilme.filme = dadosUsuario

                        return resultDadosFilme // 201 
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB // 500 erro na camada do DAO
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}



// funcao para atualizar um filme do banco de dados
const setAtualizarUsuario = async function(idUsuario, dadoAtualizado, contentType) {
    try {

        // Validação de content-type (apenas aplication/json)
        if (String(contentType).toLowerCase() == 'application/json') {
            let dadosID = filmesDAO.selectByIdFilme()

            if (idUsuario == '' || idUsuario == undefined || idUsuario == isNaN(idUsuario) || idUsuario == null) {
                return message.ERROR_INVALID_ID
            } else if (idUsuario > dadosID.length) {
                return message.ERROR_NOT_FOUND
            } else {
                // Cria o objeto JSON para devolver os dados criados na requisição
                let atualizarUsuarioJSON = {}

                //Validação de campos obrigatórios ou com digitação inválida
                if (dadosUsuario.nome == '' || dadosUsuario.nome == undefined || dadosUsuario.nome.length > 150 ||
                    dadosUsuario.email == '' || dadosUsuario.email == undefined || dadosUsuario.email.length > 50 ||
                    dadosUsuario.telefone == '' || dadosUsuario.telefone == undefined || dadosUsuario.telefone.length > 12 ||
                    dadosUsuario.senha == '' || dadosUsuario.senha == undefined || dadosUsuario.senha.length > 30 ||
                    dadosUsuario.cpf == '' || dadosUsuario.cpf == undefined || dadosUsuario.cpf.length > 11 ||
                    dadosUsuario.foto_perfil == '' || dadosUsuario.foto_perfil == undefined || dadosUsuario.foto_perfil.length > 255 ||
                    dadosUsuario.endereco_id == '' || dadosUsuario.endereco_id == undefined ||
                    dadosUsuario.status == '' || dadosUsuario.status == undefined || dadosUsuario.status.length > 1) {
                    return message.ERROR_REQUIRED_FIELDS
                } else {
                    let validateStatus = false

                    // Outra validação com campos obrigatorios ou com digitação inválida
                    if (dadoAtualizado.foto_perfil != null &&
                        dadoAtualizado.foto_perfil != '' &&
                        dadoAtualizado.foto_perfil != undefined) {

                        if (dadoAtualizado.foto_perfil.length > 255) {
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
                        let dadosUsuario = await usuariosDAO.updateUsuario(idUsuario, dadoAtualizado)

                        // if(atualizarFilme){
                        //     let idFilmes = await filmesDAO.IDFilme()
                        //     console.log(idFilmes)
                        //     dadoAtualizado.id = Number(idFilmes[0].id)
                        // }

                        // Validação para verificar se o DAO inseriu os dados do DB
                        if (dadosUsuario) {

                            //Cria o JSON de retorno dos dados (201)
                            atualizarUsuarioJSON.usuario = dadosUsuario
                            atualizarUsuarioJSON.status = message.SUCCESS_UPDATED_ITEM.status
                            atualizarUsuarioJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                            atualizarUsuarioJSON.message = message.SUCCESS_UPDATED_ITEM.message
                            return atualizarUsuarioJSON //201

                        } else {
                            return message.ERROR_INTERNAL_SERVER_DB //500
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
        return message.ERROR_INTERNAL_SERVER //500 - erro na controller
    }
}




module.exports = {
    setAtualizarUsuario,
    setInserirNovoUsuario,
    setExcluirUsuario,
    getBuscarUsuario,
    getListarUsuarios
}