// objetivo: Arquivo responsavel pela interação entre o APP e o Model, que teremos todas as tratativas e regra de negocio para o crud de Usuarios
// data: 28-05-24 - inicio
// autor: Eduardo Goncalves de Oliveira
// versao: 1.0

// import do arquivo DAO para manipular dados do BD
const usuarioDAO = require('../model/DAO/usuarios')
const controller_enderecos = require('../model/DAO/enderecos')

// import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// post: função para inserir um novo admin no DBA
const setNovoUsuario = async(dadosUsuario, contentType) => {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosUsuarios = {}
            let validacaoEndereco = await controller_enderecos.selectByIdEndereco(dadosUsuario.endereco_id) 

            console.log(dadosUsuario);
             //Validação para verificar campos obrigatórios e conistência de dados
             if (dadosUsuario.nome == ''             || dadosUsuario.nome == undefined              || dadosUsuario.nome.length > 150       ||
                dadosUsuario.email == ''             || dadosUsuario.email == undefined             || dadosUsuario.email.length > 256       ||
                dadosUsuario.telefone == ''          || dadosUsuario.telefone == undefined          || dadosUsuario.telefone.length > 12    ||
                dadosUsuario.senha == ''             || dadosUsuario.senha == undefined             || dadosUsuario.senha.length > 32       ||
                 dadosUsuario.cpf == ''              || dadosUsuario.cpf == undefined || dadosUsuario.cpf.length > 11                       ||
                 dadosUsuario.foto_perfil == ''      || dadosUsuario.foto_perfil == undefined       || dadosUsuario.foto_perfil.length > 255 ||
                 dadosUsuario.endereco_id == ''      || dadosUsuario.endereco_id == undefined       || validacaoEndereco.status_code == false
            ){
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                //envia os dados para o DAO inserir no BD
                let novoUsuario = await usuarioDAO.insertUsuario(dadosUsuario)

                //validação para verificar se os dados foram inseridos pelo DAO no BD
                if (novoUsuario) {
                    
                    let id = await usuarioDAO.selectLastId()
                    
                    dadosUsuario.id = Number(id[0].id)
                    
                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosUsuarios.status = message.SUCCESS_CREATED_ITEM.status
                    resultDadosUsuarios.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    resultDadosUsuarios.message = message.SUCCESS_CREATED_ITEM.message
                    resultDadosUsuarios.usuario = dadosUsuario
                    return resultDadosUsuarios
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
const setAtualizarUsuario = async (dadosUsuario, contentType, id) => {
    try {
        
        let usuario = id
        let validacaoEndereco = await controller_enderecos.selectByIdEndereco(dadosUsuario.endereco_id) 
        
        if (String(contentType).toLowerCase() == 'application/json') {

            // cria a variável JSON
            let resultDadosAdmin = {}

            if (dadosUsuario.nome == ''             || dadosUsuario.nome == undefined              || dadosUsuario.nome.length > 150       ||
                dadosUsuario.email == ''             || dadosUsuario.email == undefined             || dadosUsuario.email.length > 256       ||
                dadosUsuario.telefone == ''          || dadosUsuario.telefone == undefined          || dadosUsuario.telefone.length > 12    ||
                 dadosUsuario.cpf == ''              || dadosUsuario.cpf == undefined || dadosUsuario.cpf.length > 11                       ||
                 dadosUsuario.foto_perfil == ''      || dadosUsuario.foto_perfil == undefined       || dadosUsuario.foto_perfil.length > 255 ||
                 dadosUsuario.endereco_id == ''      || dadosUsuario.endereco_id == undefined       || validacaoEndereco.status_code == false
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                
                //envia os dados para o DAO inserir no BD
                let usuarioAtualizado = await usuarioDAO.updateUsuario(dadosUsuario, usuario);

                //validação para verificar se os dados foram inseridos pelo DAO no BD 
                if (usuarioAtualizado) {

                    dadosUsuario.id = usuario

                    // cria o padrão de JSON para retorno dos dados criados no DB
                    resultDadosAdmin.status = message.SUCCESS_UPDATED_ITEM.status
                    resultDadosAdmin.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                    resultDadosAdmin.message = message.SUCCESS_UPDATED_ITEM.message
                    resultDadosAdmin.usuario = dadosUsuario

                    return resultDadosAdmin
                } else {
                    return message.ERROR_INTERNAL_SERVER_DBA // 500
                }

            }

        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
console.log(error);
        return message.ERROR_INTERNAL_SERVER // 500
    }
}

// delete/put: função para esconder um admin existente
// const setEditarExcluirUsuario = async (id) => {
//     try {
//         let usuario = id
//         let valUsuario  = await getBuscarAdmin(usuario)
//         let resultDadosUsuario

//         if (usuario == '' || usuario == undefined || isNaN(usuario)) {
//             return message.ERROR_INVALID_ID // 400
//         } else if(valUsuario.status == false){
//             return message.ERROR_NOT_FOUND // 404
//         }else {

//             //envia os dados para a model inserir no BD
//             resultDadosUsuario = await usuarioDAO.setEditarExcluirUsuario(usuario)
//             //Valida se o BD inseriu corretamente os dados
//             if (resultDadosUsuario)
//                 return message.SUCCESS_DELETED_ITEM // 200
//             else
//                 return message.ERROR_INTERNAL_SERVER_DBA // 500

//         }
        
//     } catch (error) {
//         message.ERROR_INTERNAL_SERVER // 500
//     }
// }

// put: função para achar um admin existente
const setEditarRenovarUsuario = async (id) => {
    try {
        let usuario = id
        let resultDadosUsuario

        if (usuario == '' || usuario == undefined || isNaN(usuario)) {
            return message.ERROR_INVALID_ID // 400
        }else {

            //envia os dados para a model inserir no BD
            resultDadosUsuario = await usuarioDAO.updateRecoverUsuario(usuario)
            //Valida se o BD inseriu corretamente os dados
            if (resultDadosUsuario)
                return message.SUCCESS_UPDATED_ITEM // 200
            else
                return message.ERROR_INTERNAL_SERVER_DBA // 500

        }
        
    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }
}

// get: função para listar todos os admins existentes no DBA
const getListarUsuarios = async () => {
    let usuarioJSON = {}
    let dadosUsuarios = await usuarioDAO.selectAllUsuarios()

    if (dadosUsuarios) {
        if (dadosUsuarios.length > 0) {
            usuarioJSON.usuarios = dadosUsuarios
            usuarioJSON.qt = dadosUsuarios.length
            usuarioJSON.status_code = 200
            return usuarioJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DBA
    }
}

// get: função para buscar um admin pelo ID
const getBuscarUsuario = async (id) => {
    // recebe o id da GegetBuscarClassificacao
    let idUsuario = id;
    let usuarioJSON = {}
    
    // validação para ID vazio, indefinido ou não numérico
    if (idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosUsuario = await usuarioDAO.selectByIdUsuario(idUsuario)

        if (dadosUsuario) {
            // validação para verificar se existem dados de retorno
            if (dadosUsuario.length > 0) {
                usuarioJSON.usuario = dadosUsuario
                usuarioJSON.status_code = 200
                return usuarioJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DBA ///500
        }
    }
}

// get: função para buscar um admin filtrando pelo nome
const getUsuarioByNome = async (nome) => {
    let usuarioJSON = {}
    let filtro = nome

    if (filtro == '' || filtro == undefined) {
        return message.ERROR_INVALID_PARAM //400
    } else {

        let dadosUsuario = await usuarioDAO.selectByNome(filtro)
        if (dadosUsuario) {
            if (dadosUsuario.length > 0) {
                usuarioJSON.usuario = dadosUsuario
                usuarioJSON.qt = dadosUsuario.length
                usuarioJSON.status_code = 200
                return usuarioJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DBA // 500
        }
    }
}

const setAtualizarUsuarioSenha = async(dadosUsuario, contentType, idUsuario) => {

    try {
        
        if(String(contentType).toLowerCase() == 'application/json'){

            let resultDadosUsuario = {}
        
            if( 
                idUsuario == ''          || idUsuario == undefined          ||
                dadosUsuario.nome == ''  || dadosUsuario.nome == undefined  || dadosUsuario.nome.length > 100  ||
                dadosUsuario.email == '' || dadosUsuario.email == undefined || dadosUsuario.email.length > 100 ||
                dadosUsuario.senha == '' || dadosUsuario.senha == undefined || dadosUsuario.senha.length > 50 
            ){
                
                return message.ERROR_REQUIRED_FIELDS // 400
                
            }else{
                
                let usuarioAtualizado = await usuarioDAO.updateUsuarioSenha(dadosUsuario, idUsuario)
                                        
                dadosUsuario.id = idUsuario

                if(usuarioAtualizado){
                    resultDadosUsuario.status = message.UPDATED_ITEM.status
                    resultDadosUsuario.status_code = message.UPDATED_ITEM.status_code
                    resultDadosUsuario.message = message.UPDATED_ITEM.message
                    resultDadosUsuario.usuario = dadosUsuario
                    return resultDadosUsuario
                }else {

                    return message.ERROR_INTERNAL_SERVER_DBA // 500

                }
                
            }
    
        }else{
            return message.ERROR_CONTENT_TYPE // 415
        }

    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }

}

const getValidarUsuario = async(email, senha, contentType) => {
    
    try {

        if(String(contentType).toLowerCase() == 'application/json'){
    
            let emailUsuario = email
            let senhaUsuario = senha
            let usuarioJSON = {}

            if(emailUsuario == '' || emailUsuario == undefined || senhaUsuario == '' || senhaUsuario == undefined){

                return message.ERROR_REQUIRED_FIELDS // 400

            } else {

                let dadosUsuario = await usuarioDAO.selectValidacaoUsuario(emailUsuario, senhaUsuario)

                console.log(dadosUsuario);
                if(dadosUsuario){

                    if(dadosUsuario.length > 0){         

                        let usuario = dadosUsuario

                        usuarioJSON.status = message.VALIDATED_ITEM.status       
                        usuarioJSON.status_code = message.VALIDATED_ITEM.status_code       
                        usuarioJSON.message = message.VALIDATED_ITEM.message       
                        usuarioJSON.usuario = usuario
                
                        return usuarioJSON
                    } else {
                        return message.ERROR_NOT_FOUND // 404
                    }

                } else {
                    return message.ERROR_INTERNAL_SERVER_DBA // 500
                }
            }
            
        }else{
            return message.ERROR_CONTENT_TYPE // 415
        }

    } catch (error) {
        message.ERROR_INTERNAL_SERVER // 500
    }

}


module.exports = {
    getValidarUsuario,
    setNovoUsuario,
    setAtualizarUsuarioSenha,
    setAtualizarUsuario,
    //setEditarExcluiUsuario,
    setEditarRenovarUsuario,
    getListarUsuarios,
    getBuscarUsuario,
    getUsuarioByNome
}