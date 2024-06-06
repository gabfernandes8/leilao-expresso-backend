// Objetivo: Criar a interação do banco de dados MySql para fazer o CRUD de Enderecos
// Data: 04-06-24
// Autor: Eduardo Goncalves de Oliveira
// Versao: 1.0

// import da biblioteca do Prisma Client
const { PrismaClient } = require('@prisma/client')

// istanciando o objeto prisma com as caracterisyicas do prisma client
const prisma = new PrismaClient()

// listar todos os usuarios existentes na tabela
const selectAllEnderecos = async function() {

    try {

        // sql script para listar todos os usuarios existentes
        let sql = 'SELECT * FROM tbl_enderecos ORDER BY id DESC'

        // $queryRawUnsafe(sql) --- encaminha apenas a variável
        // $queryRaw('SELECT * FROM tbl_filme') --- encaminha o script

        let rsEnderecos = await prisma.$queryRawUnsafe(sql)

        // tratamento de dados para retornar dados ou false
        if (rsEnderecos.length > 0)
            return rsEnderecos
        else
            return false
    } catch (error) {
        return false
    }
}

// listar um usuario por id
const selectByIdEndereco = async function(id) {

    try {

        // sql script para listar os usuarios por id
        let sql = `SELECT * FROM tbl_enderecos WHERE id =${id}`

        // $queryRawUnsafe(sql) --- encaminha apenas a variável
        // $queryRaw('SELECT * FROM tbl_filme') --- encaminha o script

        let rsEnderecos = await prisma.$queryRawUnsafe(sql)

        return rsEnderecos
    } catch (error) {
        return false
    }
}

// delete/put: método put apenas trocando o status, para "esconder" um endereço filtrando pelo ID
const updateDeleteEndereco = async(id) => {
    try {
        let sql = `update tbl_enderecos set status = false where id = ${id}`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável
        let rsEnderecos = await prisma.$executeRawUnsafe(sql)
        
        return rsEnderecos

    } catch (error) {
        return false
    }
}

// put: método put apenas trocando o status, para ativar um endereco antes escondido
const updateRecoverEndereco = async(id) => {
    try {
        let sql = `update tbl_enderecos set status = true where id = ${id}`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável
        let rsEnderecos = await prisma.$executeRawUnsafe(sql)
        
        return rsEnderecos

    } catch (error) {
        return false
    }
}

const insertEndereco = async function(dadosEndereco) {

    // script sql para inserir no banco de dados
    try {

        let sql;

        if (dadosEndereco.complemento == null) {
            sql = `INSERT INTO tbl_enderecos (
                cep,
                logradouro,
                numero_casa,
                complemento,
                bairro,
                cidade,
                status
                ) values (
                    '${dadosEndereco.cep}', 
                    '${dadosEndereco.logradouro}',
                    '${dadosEndereco.numero_casa}', 
                    null,                    
                    '${dadosEndereco.bairro}', 
                    '${dadosEndereco.cidade}',
                    '${dadosEndereco.status}'
            )`;
        } else {

            sql = `INSERT INTO tbl_enderecos (
                cep,
                logradouro,
                numero_casa,
                complemento,
                bairro,
                cidade,
                status
                ) values (
                    '${dadosEndereco.cep}', 
                    '${dadosEndereco.logradouro}',
                    '${dadosEndereco.numero_casa}',
                    '${dadosEndereco.complemento}',                     
                    '${dadosEndereco.bairro}', 
                    '${dadosEndereco.cidade}',
                    '${dadosEndereco.status}'
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
const updateEndereco = async function(id, dadoAtualizado) {
    let sql
    try {
        if (dadoAtualizado.complemento != '' &&
            dadoAtualizado.complemento != null &&
            dadoAtualizado.complemento != undefined) {
            sql = `update tbl_enderecos set 
            cep = "${dadoAtualizado.cep}",
            logradouro = "${dadoAtualizado.logradouro}",
            numero_casa = '${dadoAtualizado.numero_casa}',
            complemento = '${dadoAtualizado.complemento}',
            bairro = '${dadoAtualizado.bairro}',
            cidade = '${dadoAtualizado.cidade}',
            status = '${dadosFilme.status}'
            where
            id = ${id}`
        } else {
            sql = `update tbl_enderecos set 
            cep = "${dadoAtualizado.cep}",
            logradouro = "${dadoAtualizado.logradouro}",
            numero_casa = '${dadoAtualizado.numero_casa}',
            senha = '${dadoAtualizado.senha}',
            cpf = '${dadoAtualizado.cpf}',
            complemento = '${dadoAtualizado.complemento}',
            bairro = '${dadoAtualizado.bairro}',
            status = '${dadosFilme.status}'
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

module.exports = {
    insertEndereco,
    updateEndereco,
    updateDeleteEndereco,
    updateRecoverEndereco,
    selectAllEnderecos,
    selectByIdEndereco
}