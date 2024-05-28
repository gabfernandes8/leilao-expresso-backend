// // Objetivo: Criar a interação do banco de dados MySql para fazer o CRUD de Usuarios
// // Data: 28-05-24
// // Autor: Eduardo Goncalves de Oliveira
// // Versao: 1.0

// import da biblioteca do Prisma Client
const { PrismaClient } = require('@prisma/client')

// istanciando o objeto prisma com as caracterisyicas do prisma client
const prisma = new PrismaClient()

// listar todos os usuarios existentes na tabela
const selectAllUsuarios = async function() {

    try {

        // sql script para listar todos os usuarios existentes
        let sql = 'SELECT * FROM tbl_usuarios ORDER BY id DESC'

        // $queryRawUnsafe(sql) --- encaminha apenas a variável
        // $queryRaw('SELECT * FROM tbl_filme') --- encaminha o script

        let rsUsuarios = await prisma.$queryRawUnsafe(sql)

        // tratamento de dados para retornar dados ou false
        if (rsUsuarios.length > 0)
            return rsUsuarios
        else
            return false
    } catch (error) {
        return false
    }
}

// listar um usuario por id
const selectByIdUsuario = async function(id) {

    try {

        // sql script para listar os usuarios por id
        let sql = `SELECT * FROM tbl_usuarios WHERE id =${id}`

        // $queryRawUnsafe(sql) --- encaminha apenas a variável
        // $queryRaw('SELECT * FROM tbl_filme') --- encaminha o script

        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes
    } catch (error) {
        return false
    }
}


// deletar um usuario filtrando por id
const deleteUsuario = async function(id) {

    try {

        // sql script para deletar os usuarios por id
        let sql = `update tbl_usuarios set status = false WHERE id=${id};`

        // $queryRawUnsafe(sql) --- encaminha apenas a variável
        // $queryRaw('SELECT * FROM tbl_filme') --- encaminha o script
        // $executeRawUnsafe(sql) --- execura o script no banco e recebe o retorno dos dados

        let rsUsuarios = await prisma.$executeRawUnsafe(sql)

        return rsUsuarios
    } catch (error) {
        return false
    }
}

const insertUsuario = async function(dadosFilme) {

    // script sql para inserir no banco de dados
    try {

        let sql;

        if (dadosFilme.foto_perfil == null) {
            sql = `INSERT INTO tbl_usuario (
                nome,
                email,
                telefone,
                senha,
                cpf,
                foto_perfil,
                endereco_id,
                status
                ) values (
                    '${dadosFilme.nome}', 
                    '${dadosFilme.email}',
                    '${dadosFilme.telefone}', 
                    '${dadosFilme.senha}', 
                    '${dadosFilme.cpf}',
                    null,                    
                    '${dadosFilme.endereco_id}',
                    '${dadosFilme.status}'
                    

            )`;
        } else {

            sql = `INSERT INTO tbl_usuario (
                nome,
                email,
                telefone,
                senha,
                cpf,
                foto_perfil,
                endereco_id,
                status
                ) values (
                    '${dadosFilme.nome}', 
                    '${dadosFilme.email}',
                    '${dadosFilme.telefone}', 
                    '${dadosFilme.senha}', 
                    '${dadosFilme.cpf}',
                    '${dadosFilme.foto_perfil}', 
                    '${dadosFilme.endereco_id}',
                    '${dadosFilme.status}'
                    

            )`;
        }

        // executa o cript sql no banco de dados OBS: DEVEMOS USAR O COMANDO {[( EXECUTE )]} E NÃO O QUERY
        let result = await prisma.$executeRawUnsafe(sql)

        // validação para verificar se o insert funcionou no banco de dados
        if (result)
            return true
        else
            return false


    } catch (error) {
        return false
    }
}

// atualizar um filme filrando por id
const updateUsuario = async function(id, dadoAtualizado) {
    let sql
    try {
        if (dadoAtualizado.foto_perfil != '' &&
            dadoAtualizado.foto_perfil != null &&
            dadoAtualizado.foto_perfil != undefined) {
            sql = `update tbl_filme set 
            nome = "${dadoAtualizado.nome}",
            sinopse = "${dadoAtualizado.sinopse}",
            duracao = '${dadoAtualizado.duracao}',
            data_lancamento = '${dadoAtualizado.data_lancamento}',
            data_relancamento = '${dadoAtualizado.data_relancamento}',
            foto_capa = '${dadoAtualizado.foto_capa}',
            valor_unitario = '${dadoAtualizado.valor_unitario}',
            id_classificacao = '${dadosFilme.id_classificacao}'
            where
            id = ${id}`
        } else {
            sql = `update tbl_filme set 
            nome = "${dadoAtualizado.nome}",
            sinopse = "${dadoAtualizado.sinopse}",
            duracao = '${dadoAtualizado.duracao}',
            data_lancamento = '${dadoAtualizado.data_lancamento}',
            foto_capa = '${dadoAtualizado.foto_capa}',
            valor_unitario = '${dadoAtualizado.valor_unitario}',
            id_classificacao = '${dadosFilme.id_classificacao}'
            where
            id = ${id}`
        }
        console.log(sql)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}





// // const selectByNome = async(nome) => {

// //     try {
// //         let sql = `select * from tbl_filme where nome like '%${nome}%'`

// //         // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsFilmes
// //         let rsFilmes = await prisma.$queryRawUnsafe(sql)
// //         console.log('to aqui 3')

// //         return rsFilmes
// //     } catch (error) {
// //         return false
// //     }
// // }

// // const selectLastId = async() => {
// //     try {

// //         let sql = 'select cast(last_insert_id() as DECIMAL) as id from tbl_filme limit 1'

// //         let rsFilmes = await prisma.$queryRawUnsafe(sql)
// //         return rsFilmes

// //     } catch (error) {

// //         return false

// //     }
// // }

module.exports = {
    insertUsuario,
    // updateFilme,
    deleteUsuario,
    selectAllUsuarios,
    selectByIdUsuario
}


// // 1567 456   910