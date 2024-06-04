/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD
*           de lotes
* Data: 04/06/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

//  post: inserir lote
const insertLote = async(dadosLote) => {
    try {
        let sql
    
        sql = `insert into tbl_lotes (data_fim, produto_id, usuario_id, status)values(
                '${dadosLote.data_fim}',
                ${dadosLote.produto_id},
                ${dadosLote.usuario_id},
                true
            )`

        // executa o sciptSQL no DB (devemos usar o comando execute e não o query)
        // o comando execute deve ser utilizado para INSERT, UPDATE, DELETE
        let result = await prisma.$executeRawUnsafe(sql)

        // validação para verificar se o insert funcionou no DB
        if(result){
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

// put: atualizar um lote existente filtrando pelo ID
const updateLote = async(dadosLote, id) => {
    try {
        let sql 

        sql = `update tbl_lotes set 
                                        data_fim = "${dadosLote.data_fim}",
                                        produto_id = ${dadosLote.produto_id},
                                        usuario_id = ${dadosLote.usuario_id}
                                        
                                        where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        // validação para verificar se o insert funcionou no DB
        if(result){
            return true
        } else {
            return false
        }
    
    } catch (error) {
        console.log(error);

        return false
    }
}

// delete/put: método put apenas trocando o status, para "esconder" um lote filtrando pelo ID
const updateDeleteLote = async(id) => {
    try {
        let sql = `update tbl_lotes set status = false where id = ${id}`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável
        let rsLote = await prisma.$executeRawUnsafe(sql)
        
        return rsLote

    } catch (error) {
        return false
    }
}

// put: método put apenas trocando o status, para aparecer um lote antes escondido
const updateRecoverLote = async(id) => {
    try {
        let sql = `update tbl_lotes set status = true where id = ${id}`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável
        let rsLote = await prisma.$executeRawUnsafe(sql)
        
        return rsLote

    } catch (error) {
        return false
    }
}

// get: listar todas os lotes
const selectAllLotes = async () => {

    try {
        let sql = `select tbl_lotes.id, tbl_lotes.data_fim, tbl_produto.nome as produto, tbl_usuarios.nome as cliente from tbl_lotes 
                    inner join tbl_produto on tbl_produto.id=tbl_lotes.produto_id
                    inner join tbl_usuarios on tbl_usuarios.id=tbl_lotes.usuario_id
                    where tbl_lotes.status=true
                    order by id desc`
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsLote
        let rsLote = await prisma.$queryRawUnsafe(sql)

        return rsLote

    } catch (error) {
        return false
    }
}

// get: buscar o lote existente filtrando pelo ID
const selectByIdLote = async (id) => {

    try {

        // realiza a busca do produto pelo id
        let sql = `select tbl_lotes.id, tbl_lotes.data_fim, tbl_produto.nome as produto, tbl_usuarios.nome as cliente from tbl_lotes 
                    inner join tbl_produto on tbl_produto.id=tbl_lotes.produto_id
                    inner join tbl_usuarios on tbl_usuarios.id=tbl_lotes.usuario_id
                    where tbl_lotes.id=${id} and tbl_lotes.status=true`

        // executa no DBA o script SQL
        let rsLote = await prisma.$queryRawUnsafe(sql)
        return rsLote

    } catch (error) {
        return false
    }
}

// get: buscar o lote existente filtrando pela data
const selectByDataFinal = async (dataFinal) => {
    
    try {
        let sql = `select tbl_lotes.id, tbl_lotes.data_fim, tbl_produto.nome as produto, tbl_usuarios.nome as cliente from tbl_lotes 
                    inner join tbl_produto on tbl_produto.id=tbl_lotes.produto_id
                    inner join tbl_usuarios on tbl_usuarios.id=tbl_lotes.usuario_id
                    where tbl_lotes.data_fim like "%${dataFinal}%" and tbl_lotes.status=true`
       
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsLote
        let rsLote = await prisma.$queryRawUnsafe(sql)
        return rsLote
        
    } catch (error) {
        return false
    }
}

// get: pegar o ultimo id
const selectLastId = async () => {
    try {

        let sql = 'select cast(last_insert_id() as DECIMAL) as id from tbl_lotes limit 1' 

        let rsLote = await prisma.$queryRawUnsafe(sql)

        return rsLote

    } catch (error) {
        return false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    }
}


module.exports={
    insertLote,
    updateDeleteLote,
    updateLote,
    updateRecoverLote,
    selectAllLotes,
    selectByIdLote,
    selectByDataFinal,
    selectLastId
}