// // Objetivo: Criar a interação do banco de dados MySql para fazer o CRUD de Filmes
// // Data: 30-01-24
// // Autor: Eduardo Goncalves
// // Versao: 1.0.1.24

// inserir um novo filme

// import da biblioteca do Prisma Client
const { PrismaClient } = require('@prisma/client')

// istanciando o objeto prisma com as caracterisyicas do prisma client
const prisma = new PrismaClient()

// listar todos os filmes existentes na tabela
const selectAllUsuarios = async function() {

    try {

        // sql script para listar todos os filmes existentes
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

// listar um filme por id
const selectByIdUsuario = async function(id) {

    try {

        // sql script para listar os filmes por id
        let sql = `SELECT * FROM tbl_usuarios WHERE id =${id}`

        // $queryRawUnsafe(sql) --- encaminha apenas a variável
        // $queryRaw('SELECT * FROM tbl_filme') --- encaminha o script

        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes
    } catch (error) {
        return false
    }
}

// const insertFilme = async function(dadosFilme) {

//     // script sql para inserir no banco de dados
//     try {

//         let sql;

//         if (dadosFilme.data_relancamento == null) {
//             sql = `INSERT INTO tbl_filme (
//                 nome,
//                 sinopse,
//                 data_lancamento,
//                 data_relancamento,
//                 duracao,
//                 foto_capa,
//                 valor_unitario
//                 ) values (
//                     '${dadosFilme.nome}', 
//                     '${dadosFilme.sinopse}',
//                     '${dadosFilme.data_lancamento}', 
//                      null,                    
//                     '${dadosFilme.duracao}', 
//                     '${dadosFilme.foto_capa}',
//                     '${dadosFilme.valor_unitario}'
//             )`;
//         } else {

//             sql = `INSERT INTO tbl_filme (
//         nome,
//         sinopse,
//         data_lancamento,
//         data_relancamento,
//         duracao,
//         foto_capa,
//         valor_unitario
//         ) values (
//             '${dadosFilme.nome}', 
//             '${dadosFilme.sinopse}',
//             '${dadosFilme.data_lancamento}', 
//             '${dadosFilme.data_relancamento}',
//             '${dadosFilme.duracao}', 
//             '${dadosFilme.foto_capa}',
//             '${dadosFilme.valor_unitario}'
//     )`;
//         }

//         console.log(funcoesParaUso.pegarIdBD())

//         // executa o cript sql no banco de dados OBS: DEVEMOS USAR O COMANDO {[( EXECUTE )]} E NÃO O QUERY
//         let result = await prisma.$executeRawUnsafe(sql)

//         // validação para verificar se o insert funcionou no banco de dados
//         if (result)
//             return true
//         else
//             return false


//     } catch (error) {
//         return false
//     }
// }

// // atualizar um filme filrando por id
// const updateFilme = async function(id, dadoAtualizado) {
//     let sql
//     try {
//         if (dadoAtualizado.data_relancamento != '' &&
//             dadoAtualizado.data_relancamento != null &&
//             dadoAtualizado.data_relancamento != undefined) {
//             sql = `update tbl_filme set 
//             nome = "${dadoAtualizado.nome}",
//             sinopse = "${dadoAtualizado.sinopse}",
//             duracao = '${dadoAtualizado.duracao}',
//             data_lancamento = '${dadoAtualizado.data_lancamento}',
//             data_relancamento = '${dadoAtualizado.data_relancamento}',
//             foto_capa = '${dadoAtualizado.foto_capa}',
//             valor_unitario = '${dadoAtualizado.valor_unitario}',
//             id_classificacao = '${dadosFilme.id_classificacao}'
//             where
//             id = ${id}`
//         } else {
//             sql = `update tbl_filme set 
//             nome = "${dadoAtualizado.nome}",
//             sinopse = "${dadoAtualizado.sinopse}",
//             duracao = '${dadoAtualizado.duracao}',
//             data_lancamento = '${dadoAtualizado.data_lancamento}',
//             foto_capa = '${dadoAtualizado.foto_capa}',
//             valor_unitario = '${dadoAtualizado.valor_unitario}',
//             id_classificacao = '${dadosFilme.id_classificacao}'
//             where
//             id = ${id}`
//         }
//         console.log(sql)
//         let result = await prisma.$executeRawUnsafe(sql)

//         if (result) {
//             return true
//         } else {
//             return false
//         }
//     } catch (error) {
//         return false
//     }
// }

// // deletar um filme filtrando por id
// const deleteFilme = async function(id) {

//     try {

//         // sql script para deletar os filmes por id
//         let sql = `DELETE FROM tbl_filme WHERE id=${id};`

//         // $queryRawUnsafe(sql) --- encaminha apenas a variável
//         // $queryRaw('SELECT * FROM tbl_filme') --- encaminha o script

//         let rsFilmes = await prisma.$queryRawUnsafe(sql)

//         return rsFilmes
//     } catch (error) {
//         return false
//     }
// }





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
    // insertFilme,
    // updateFilme,
    // deleteFilme,
    selectAllUsuarios,
    selectByIdUsuario
}


// // 1567 456   910