// MENSAGENS DE ERRO

const ERROR_INVALID_ID = { status: false, status_code: 400, message: 'O ID encaminhado na requisição não é válido!' }

const ERROR_NOT_FOUND = { status: false, status_code: 404, message: 'Nenhum item encontrado na requisição!' }

const ERROR_INTERNAL_SERVER_DB = { status: false, status_code: 500, message: 'Ocorreram erros internos no servidor de banco de dados, por favor contate o adm do sistema!' }

const ERROR_REQUIRED_FIELDS = { status: false, status_code: 400, message: 'Existem campos obrigatórios que não foram preenchidos corretamente!' }

const ERROR_CONTENT_TYPE = { status: false, status_code: 415, message: 'O tipo de mídia Content-type da solicitação não é suportado, accetable format: application/json' }

const ERROR_INTERNAL_SERVER = { status: false, status_code: 500, message: 'Ocorreram erros internos na camada de negócios no servidor da API, por favor contate o adm do sistema!' }

// MENSAGENS DE SUCESSO 

const SUCCESS_UPDATED_ITEM = { status: true, status_code: 200, message: 'Item atualizado com sucesso!' }

const SUCESS_CREATED_ITEM = { status: true, status_code: 201, message: 'Item criado com sucesso!' }

const REQUEST_SUCCEEDED = { status: true, status_code: 200, message: 'A solicitação foi bem-sucedida!' }

module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_REQUIRED_FIELDS,
    SUCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE,
    SUCCESS_UPDATED_ITEM,
    ERROR_INTERNAL_SERVER,
    REQUEST_SUCCEEDED
}