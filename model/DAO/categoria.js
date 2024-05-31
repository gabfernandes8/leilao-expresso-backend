/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD de
*           categorias de produtos
* Data: 28/05/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

//  post: inserir categoria
const insertCategoria = async(dadosCategoria) => {
    try {
        let sql
    
        sql = `insert into tbl_categorias (nome, status)values(
                '${dadosCategoria.nome}',
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

// put: atualizar uma categoria existente filtrando pelo ID
const updateCategoria = async(dadosCategoria, id) => {
    try {
        let sql 

        sql = `update tbl_categorias set 
                                            nome = "${dadosCategoria.nome}",
                                            
                                            where id = ${id}`

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

// delete/put: método put apenas trocando o status, para "esconder" uma categoria filtrando pelo ID
const updateDeleteCategoria = async(id) => {
    try {
        let sql = `update tbl_categorias set status = false where id = ${id}`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável
        let rsCategoria = await prisma.$executeRawUnsafe(sql)
        
        return rsCategoria

    } catch (error) {
        return false
    }
}

// put: método put apenas trocando o status, para aparecer uma categoria antes escondido
const updateRecoverCategoria = async(id) => {
    try {
        let sql = `update tbl_categorias set status = true where id = ${id}`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável
        let rsCategoria = await prisma.$executeRawUnsafe(sql)
        
        return rsCategoria

    } catch (error) {
        return false
    }
}

// get: listar todas as categorias
const selectAllCategorias = async () => {

    try {
        let sql = 'select id, nome from tbl_categorias where status = true order by id desc;'
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsCategoria
        let rsCategoria = await prisma.$queryRawUnsafe(sql)

        return rsCategoria

    } catch (error) {
        return false
    }
}

// get: buscar a categoria existente filtrando pelo ID
const selectByIdCategoria = async (id) => {

    try {

        // realiza a busca do ator pelo id
        let sql = `select * from tbl_categorias where id=${id} and status=true`

        // executa no DBA o script SQL
        let rsCategoria = await prisma.$queryRawUnsafe(sql)
        return rsCategoria

    } catch (error) {
        return false
    }
}

// get: buscar a categoria existente filtrando pelo nome
const selectByNome = async (nome) => {
    
    try {
        let sql = `select * from tbl_categorias where nome like '%${nome}%' where status=true`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsCategoria
        let rsCategoria = await prisma.$queryRawUnsafe(sql)
        return rsCategoria
        
    } catch (error) {
        return false
    }
}

// get: pegar o ultimo id
const selectLastId = async () => {
    try {

        let sql = 'select cast(last_insert_id() as DECIMAL) as id from tbl_categorias limit 1' 

        let rsCategoria = await prisma.$queryRawUnsafe(sql)

        return rsCategoria

    } catch (error) {
        return false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    }
}


module.exports={
    insertCategoria,
    updateDeleteCategoria,
    updateCategoria,
    updateRecoverCategoria,
    selectAllCategorias,
    selectByIdCategoria,
    selectByNome,
    selectLastId
}