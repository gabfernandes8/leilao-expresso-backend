// objetivo: Arquivo responsavelpela interação entre o APP e o Model, que teremos todas as tratativas e regra de negocio para o crud de filmes
// data: 30-01-24
// autor: Eduardo Goncalves
// versao: 1.0.1.24

// import do arq DAO para manipular dados do banco de dados
const usuariosDAO = require('../model/DAO/usuarios')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// funcao para retornar todos os filmes do banco de dados
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


// funcao para buscar um filme do banco de dados pelo id
const getBuscarUsuario = async function(id) {

    // recebe o id do filme
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

// // funcao para inserir um novo filme do banco de dados
// const setInserirNovoFilme = async function(dadosFilme, contentType) {

//     try {


//         // recebe o tipo de conteudo Content-type da requisição ( a api deve receber dados application/json)
//         if (String(contentType).toLowerCase() == 'application/json') {

//             // cia a variavel json
//             let resultDadosFilme = {}

//             // validação de dados
//             if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome.length > 80 ||
//                 dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse.length > 65000 ||
//                 dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao.length > 10 ||
//                 dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento.length > 10 ||
//                 dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa.length > 200 ||
//                 dadosFilme.valor_unitario.length > 8) {

//                 return message.ERROR_REQUIRED_FIELDS
//             } else {

//                 // variavel para validar se poderemos chamar o dao para inserirf os dados 
//                 let dadosValidated = false

//                 // validação de digitação para a data de relancamento que não é campo obrigatorio
//                 if (dadosFilme.data_relancamento != null && dadosFilme.data_relancamento != undefined && dadosFilme.data_relancamento != "") {
//                     if (dadosFilme.data_relancamento.length != 10) {
//                         return message.ERROR_REQUIRED_FIELDS; // 400 - campos preenchidos incorretamente
//                     } else {
//                         dadosValidated = true // se a data estiver com exatamnete 10 char
//                     }
//                 } else {
//                     dadosValidated = true // se a data não existir nos dados
//                 }

//                 // validação para verificar se podemos encarregar os dados para o dao
//                 if (dadosValidated) {

//                     // encaminha dados para o dao inserir no banco de dados
//                     let novoFilme = await filmesDAO.insertFilme(dadosFilme)

//                     // validação dos dados sendo nseridos pelo dao no banco de dados
//                     if (novoFilme) {

//                         // cria o padrão json ´para o retoro dos dados criados
//                         resultDadosFilme.status = message.SUCESS_CREATED_ITEM.status
//                         resultDadosFilme.status_code = message.SUCESS_CREATED_ITEM.status_code
//                         resultDadosFilme.message = message.SUCESS_CREATED_ITEM.message
//                         resultDadosFilme.filme = dadosFilme

//                         return resultDadosFilme // 201 
//                     } else {
//                         return message.ERROR_INTERNAL_SERVER_DB // 500 erro na camada do DAO
//                     }
//                 }
//             }
//         } else {
//             return message.ERROR_CONTENT_TYPE
//         }
//     } catch (error) {
//         return message.ERROR_INTERNAL_SERVER
//     }
// }

// // funcao para atualizar um filme do banco de dados
// const setAtualizarFilme = async function(idFilme, dadoAtualizado, contentType) {
//     try {

//         // Validação de content-type (apenas aplication/json)
//         if (String(contentType).toLowerCase() == 'application/json') {
//             let dadosID = filmesDAO.selectByIdFilme()

//             if (idFilme == '' || idFilme == undefined || idFilme == isNaN(idFilme) || idFilme == null) {
//                 return message.ERROR_INVALID_ID
//             } else if (idFilme > dadosID.length) {
//                 return message.ERROR_NOT_FOUND
//             } else {
//                 // Cria o objeto JSON para devolver os dados criados na requisição
//                 let atualizarFilmeJSON = {}

//                 //Validação de campos obrigatórios ou com digitação inválida
//                 if (dadoAtualizado.nome == '' || dadoAtualizado.nome == undefined || dadoAtualizado.nome == null || dadoAtualizado.nome.length > 80 ||
//                     dadoAtualizado.sinopse == '' || dadoAtualizado.sinopse == undefined || dadoAtualizado.sinopse == null || dadoAtualizado.sinopse.length > 65000 ||
//                     dadoAtualizado.duracao == '' || dadoAtualizado.duracao == undefined || dadoAtualizado.duracao == null || dadoAtualizado.duracao.length > 8 ||
//                     dadoAtualizado.data_lancamento == '' || dadoAtualizado.data_lancamento == undefined || dadoAtualizado.data_lancamento == null || dadoAtualizado.data_lancamento.length != 10 ||
//                     dadoAtualizado.foto_capa == '' || dadoAtualizado.foto_capa == undefined || dadoAtualizado.foto_capa == null || dadoAtualizado.foto_capa.length > 200 ||
//                     dadoAtualizado.valor_unitario.length > 6
//                 ) {
//                     return message.ERROR_REQUIRED_FIELDS
//                 } else {
//                     let validateStatus = false

//                     // Outra validação com campos obrigatorios ou com digitação inválida
//                     if (dadoAtualizado.data_relancamento != null &&
//                         dadoAtualizado.data_relancamento != '' &&
//                         dadoAtualizado.data_relancamento != undefined) {

//                         if (dadoAtualizado.data_relancamento.length != 10) {
//                             return message.ERROR_REQUIRED_FIELDS //400
//                         } else {
//                             validateStatus = true
//                         }
//                     } else {

//                         validateStatus = true
//                     }

//                     // Validação para verificar se a variavel booleana é verdadeira
//                     if (validateStatus) {

//                         // Encaminha os dados do filme para o DAO inserir no DB
//                         let dadosFilme = await filmesDAO.updateFilme(idFilme, dadoAtualizado)

//                         // if(atualizarFilme){
//                         //     let idFilmes = await filmesDAO.IDFilme()
//                         //     console.log(idFilmes)
//                         //     dadoAtualizado.id = Number(idFilmes[0].id)
//                         // }

//                         // Validação para verificar se o DAO inseriu os dados do DB
//                         if (dadosFilme) {

//                             //Cria o JSON de retorno dos dados (201)
//                             atualizarFilmeJSON.filme = dadosFilme
//                             atualizarFilmeJSON.status = message.SUCCESS_UPDATED_ITEM.status
//                             atualizarFilmeJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
//                             atualizarFilmeJSON.message = message.SUCCESS_UPDATED_ITEM.message
//                             return atualizarFilmeJSON //201

//                         } else {
//                             return message.ERROR_INTERNAL_SERVER_DB //500
//                         }
//                     } else {
//                         validateStatus = false
//                     }
//                 }
//             }
//         } else {
//             return message.ERROR_CONTENT_TYPE //415
//         }
//     } catch (error) {
//         return message.ERROR_INTERNAL_SERVER //500 - erro na controller
//     }
// }

// // funcao para excluir um filme do banco de dados
// const setExcluirFilme = async function(id) {


//     // recebe o id do filme
//     let idFilme = id
//     let filmeJSON = {}

//     // validação para id vazio, indefinido ou nao numerico
//     if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
//         return message.ERROR_INVALID_ID
//     } else {

//         // chama a função do dao para retornar dados no bd
//         let deletePorID = await filmesDAO.deleteFilme(idFilme)

//         // verifica se dados no servidor de banco foram processados
//         if (deletePorID) {

//             // validação para veificar se existem dados a serem processados
//             if (deletePorID.length > 0) {
//                 // montando o json para retornar para o app
//                 filmeJSON.filmes = deletePorID
//                 filmeJSON.status_code = 500
//                 return message.ERROR_INTERNAL_SERVER
//             } else {
//                 return message.REQUEST_SUCCEEDED //400
//             }
//         } else {
//             return message.ERROR_INTERNAL_SERVER_DB //500
//         }
//     }


// }



module.exports = {
    // setAtualizarFilme,
    // setInserirNovoFilme,
    // setExcluirFilme,
    getBuscarUsuario,
    getListarUsuarios
}