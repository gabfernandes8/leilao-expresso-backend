/***************************************************************************************
* Objetivo: criar a integração com o banco de dados MySQL para fazer o CRUD
*           de produtos
* Data: 04/06/2024
* Autor: Gabriela Fernandes
* Versão: 1.0
***************************************************************************************/

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

//  post: inserir produto
const insertProduto = async(dadosProduto) => {
    try {
        let sql
    
        sql = `insert into tbl_produto (nome, descricao, valor_fixo, foto_produto, categoria_id, status)values(
                '${dadosProduto.nome}',
                '${dadosProduto.descricao}',
                ${dadosProduto.valor_fixo},
                '${dadosProduto.foto_produto}',
                ${dadosProduto.categoria_id},
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

// put: atualizar um produto existente filtrando pelo ID
const updateProduto = async(dadosProduto, id) => {
    try {
        let sql 

        sql = `update tbl_produto set 
                                        nome = "${dadosProduto.nome}",
                                        descricao = "${dadosProduto.descricao}",
                                        valor_fixo = ${dadosProduto.valor_fixo},
                                        foto_produto = "${dadosProduto.foto_produto}",
                                        categoria_id = ${dadosProduto.categoria_id}
                                        
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

// delete/put: método put apenas trocando o status, para "esconder" um produto filtrando pelo ID
const updateDeleteProduto = async(id) => {
    try {
        let sql = `update tbl_produto set status = false where id = ${id}`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável
        let rsProduto = await prisma.$executeRawUnsafe(sql)
        
        return rsProduto

    } catch (error) {
        return false
    }
}

// put: método put apenas trocando o status, para aparecer um produto antes escondido
const updateRecoverProduto = async(id) => {
    try {
        let sql = `update tbl_produto set status = true where id = ${id}`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável
        let rsProduto = await prisma.$executeRawUnsafe(sql)
        
        return rsProduto

    } catch (error) {
        return false
    }
}

// get: listar todas os produtos
const selectAllProdutos = async () => {

    try {
        let sql = 'select id, nome, descricao, valor_fixo, categoria_id, foto_produto from tbl_produto where status = true order by id desc'
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsProduto
        let rsProduto = await prisma.$queryRawUnsafe(sql)

        return rsProduto

    } catch (error) {
        return false
    }
}

// get: buscar o produto existente filtrando pelo ID
const selectByIdProduto = async (id) => {

    try {

        // realiza a busca do produto pelo id
        let sql = `select * from tbl_produto where id=${id} and status=true`

        // executa no DBA o script SQL
        let rsProduto = await prisma.$queryRawUnsafe(sql)
        return rsProduto

    } catch (error) {
        return false
    }
}

// get: buscar o produto existente filtrando pelo nome
const selectByNome = async (nome) => {
    
    try {
        let sql = `select * from tbl_produto where nome like '%${nome}%' and status=true`
       
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsProduto
        let rsProduto = await prisma.$queryRawUnsafe(sql)
        return rsProduto
        
    } catch (error) {
        return false
    }
}

// get: buscar o produto existente filtrando pela categoria
const selectByCategoria = async (categoria) => {
    
    try {
        let sql = `select tbl_produto.id, tbl_produto.nome, tbl_produto.descricao, tbl_produto.valor_fixo, tbl_produto.foto_produto, tbl_categorias.nome as categoria from tbl_produto 
                    inner join tbl_categorias on tbl_produto.categoria_id=tbl_categorias.id 
                    where tbl_categorias.nome like '%${categoria}%' and tbl_produto.status=true`
       
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsProduto
        let rsProduto = await prisma.$queryRawUnsafe(sql)
        return rsProduto
        
    } catch (error) {
        return false
    }
}

// get: pegar o ultimo id
const selectLastId = async () => {
    try {

        let sql = 'select cast(last_insert_id() as DECIMAL) as id from tbl_produto limit 1' 

        let rsProduto = await prisma.$queryRawUnsafe(sql)

        return rsProduto

    } catch (error) {
        return false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    }
}


module.exports={
    insertProduto,
    updateDeleteProduto,
    updateProduto,
    updateRecoverProduto,
    selectAllProdutos,
    selectByIdProduto,
    selectByNome,
    selectByCategoria,
    selectLastId
}