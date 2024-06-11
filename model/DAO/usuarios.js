// // Objetivo: Criar a interação do banco de dados MySql para fazer o CRUD de Usuarios
// // Data: 28-05-24
// // Autor: Eduardo Goncalves de Oliveira
// // Versao: 1.0

// import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

// instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

//  post: inserir adm
const insertUsuario = async(dadosUsuario) => {
    try {
        let sql
    
        sql = `insert into tbl_usuarios (nome, email, telefone, senha, cpf, foto_perfil, endereco_id, status)values(
                '${dadosUsuario.nome}',
                '${dadosUsuario.email}',
                '${dadosUsuario.telefone}',
                '${dadosUsuario.senha}',
                '${dadosUsuario.cpf}',
                '${dadosUsuario.foto_perfil}',
                ${dadosUsuario.endereco_id},
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

// put: atualizar um adm existente filtrando pelo ID
const updateUsuario = async(dadosUsuario, id) => {
    try {
        let sql 

        sql = `update tbl_usuarios set 
                                            nome = "${dadosUsuario.nome}",
                                            email = "${dadosUsuario.email}",
                                            telefone = "${dadosUsuario.telefone}",
                                            senha = "${dadosUsuario.senha}",
                                            cpf = "${dadosUsuario.cpf}"
                                            
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

// delete/put: método put apenas trocando o status, para "esconder" um admin filtrando pelo ID
// const updateDeleteAdmin = async(id) => {
//     try {
//         let sql = `update tbl_administrador set status = false where id = ${id}`

//         // executa o scriptSQL no BD e recebe o retorno dos dados na variável
//         let rsAdmin = await prisma.$executeRawUnsafe(sql)
        
//         return rsAdmin

//     } catch (error) {
//         return false
//     }
// }

// put: método put apenas trocando o status, para aparecer um admin antes escondido
const updateRecoverUsuario = async(id) => {
    try {
        let sql = `update tbl_usuarios set status = true where id = ${id}`

        // executa o scriptSQL no BD e recebe o retorno dos dados na variável
        let rsAdmin = await prisma.$executeRawUnsafe(sql)
        
        return rsAdmin

    } catch (error) {
        return false
    }
}

// get: listar todos os administradores
const selectAllUsuarios = async () => {

    try {
        let sql = 'select id, nome, email, senha, telefone, cpf from tbl_usuarios where status = true order by id desc;'
    
        // $queryrawUnsafe(‘encaminha apenas a variavel’)
        // $queryRaw(‘codigo digitado aqui’)
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAdmin
        let rsUsuario = await prisma.$queryRawUnsafe(sql)

        return rsUsuario

    } catch (error) {
        return false
    }
}

// get: buscar o administrador existente filtrando pelo ID
const selectByIdUsuario = async (id) => {

    try {

        // realiza a busca do ator pelo id
        let sql = `select * from tbl_usuarios where id=${id} and status=true`

        // executa no DBA o script SQL
        let rsUsuario = await prisma.$queryRawUnsafe(sql)
        return rsUsuario

    } catch (error) {
        return false
    }
}

// get: buscar o admin existente filtrando pelo nome
const selectByNome = async (nome) => {
    
    try {
        let sql = `select * from tbl_usuarios where nome like '%${nome}%' where status=true`
    
        // executa o scriptSQL no BD e recebe o retorno dos dados na variável rsAdmin
        let rsUsuario = await prisma.$queryRawUnsafe(sql)

        return rsUsuario
        
    } catch (error) {
        return false
    }
}

// get: pegar o ultimo id
const selectLastId = async () => {
    try {

        let sql = 'select cast(last_insert_id() as DECIMAL) as id from tbl_administrador limit 1' 

        let rsAdmin = await prisma.$queryRawUnsafe(sql)

        return rsAdmin

    } catch (error) {
        return false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    }
}


module.exports={
    insertUsuario,
    updateUsuario,
    //updateDeleteAdmin,
    updateRecoverUsuario,
    selectAllUsuarios,
    selectByIdUsuario,
    selectByNome,
    selectLastId
}


// // 1567 456   910