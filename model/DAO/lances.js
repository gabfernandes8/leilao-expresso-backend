/****************************************************************************************************************
 * Objetivo: Arquivo responsável por criar a interação com o banco de dados MySQL para fazer o CRUD de lances.
 * Autor: Mariana Alves.
 * Data: 04/06/2024.
 * Versão: 1.0
 ****************************************************************************************************************/

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllLances = async function() {
    try {
        let sql = 'SELECT * FROM tbl_lances ORDER BY id DESC'
        let rsLances = await prisma.$queryRawUnsafe(sql)

        if (rsLances.length > 0)
            return rsLances
        else
            return false
    } catch (error) {
        return false
    }
}

const selectByIdLances= async function(id) {
    try {
        let sql = 'SELECT * FROM tbl_lances WHERE id =${id}'
        let rsLances = await prisma.$queryRawUnsafe(sql)

        return rsLances
    } catch (error) {
        return false
    }
}

// delete/put: método put apenas trocando o status, para "esconder" um admin filtrando pelo ID
const updateDeleteLances = async(id) => {
    try {
        let sql = `update tbl_lances set status = false where id = ${id}`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável
        let rsLances = await prisma.$executeRawUnsafe(sql)
        
        return rsLances

    } catch (error) {
        return false
    }
}

// put: método put apenas trocando o status, para aparecer um admin antes escondido
const updateRecoverLances = async(id) => {
    try {
        let sql = `update tbl_lances set status = true where id = ${id}`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável
        let rsLances = await prisma.$executeRawUnsafe(sql)
        
        return rsLances

    } catch (error) {
        return false
    }
}

const insertLances = async function(dadosLances){
    try {
        let sql;
    
        sql = `insert into tbl_lances (valor, usuario_id, lote_id, status)values(
                '${dadosLances.valor}',
                '${dadosLances.usuario_id}',
                '${dadosLances.lote_id}'
               true
            )`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const updateLances = async function(dadosLances, id){
    try {
        let sql 

        sql = `update tbl_lances set 
        valor = "${dadosLances.valor}",
        usuario_id = "${dadosLances.usuario_id}",
        lote_id = "${dadosLances.lote_id}" 
        where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        } else {
            return false
        }
    
    } catch (error) {
        return false
    }
}

module.exports = {
    insertLances,
    updateLances,
    updateDeleteLances,
    updateRecoverLances,
    selectAllLances,
    selectByIdLances
}