# leilao-expresso-backend

## endpoints:
<br>
- Hospedado no Render

```
https://leilao-expresso-backend.onrender.com
```


<h3> admin </h3>

- listar todos 
```
/v1/leilao_expresso/admins
```
- filtrar pelo nome 
```
/v1/leilao_expresso/admins/filtro
```
- filtrando pelo ID
```
/v1/leilao_expresso/admin/:id
```
- inserir
```
/v1/leilao_expresso/admin
```
- editar o status para false para "exclui-lo"
```
/v1/leilao_expresso/admin/excluir/:id
```
- editar o status para false para ativa-lo
```
/v1/leilao_expresso/admin/ativar/:id
```
- editar
```
/v1/leilao_expresso/admin/:id
```
<br>

---

<br>

<h3> categoria </h3>

- listar todos 
```
/v1/leilao_expresso/categorias
```
- filtrar pelo nome 
```
/v1/leilao_expresso/categoria/filtro
```
- filtrando pelo ID
```
/v1/leilao_expresso/categoria/:id
```
- inserir
```
/v1/leilao_expresso/categoria
```
- editar o status para false para "exclui-lo"
```
/v1/leilao_expresso/categoria/excluir/:id
```
- editar o status para false para ativa-lo
```
/v1/leilao_expresso/categoria/ativar/:id
```
- editar
```
/v1/leilao_expresso/categoria/:id
```
<br>

---

<br>

<h3> produtos </h3>

- listar todos 
```
/v1/leilao_expresso/produtos
```
- filtrar pelo nome 
```
/v1/leilao_expresso/produto/filtro:nome
```
- filtrando pelo ID
```
/v1/leilao_expresso/produto/:id
```
- filtrando pela categoria
```
/v1/leilao_expresso/produto/filtro/:categoria
```
- inserir
```
/v1/leilao_expresso/produto
```
- editar o status para false para "exclui-lo"
```
/v1/leilao_expresso/produto/excluir/:id
```
- editar o status para false para ativa-lo
```
/v1/leilao_expresso/produto/ativar/:id
```
- editar
```
/v1/leilao_expresso/produto/:id
```
<br>

---

<br>

<h3> lotes </h3>

- listar todos 
```
/v1/leilao_expresso/lotes
```
- filtrar pelo valor 
```
/v1/leilao_expresso/lote/valor/filtro
```
- filtrar pela data de fim 
```
/v1/leilao_expresso/lote/filtro/:data
```
- filtrando pelo ID
```
/v1/leilao_expresso/lote/:id
```
- filtrando pela categoria
```
/v1/leilao_expresso/lote/categoria/filtro
```
- inserir
```
/v1/leilao_expresso/lote
```
- editar o status para false para "exclui-lo"
```
/v1/leilao_expresso/lote/excluir/:id
```
- editar o status para false para ativa-lo
```
/v1/leilao_expresso/lote/ativar/:id
```
- editar
```
/v1/leilao_expresso/lote/:id
```
<br>

---

<br>

<h3> usuários </h3>

- listar todos 
```
/v1/leilao_expresso/usuarios
```
- filtrando pelo ID
```
/v1/leilao_expresso/usuarios/:id
```
- inserir
```
/v1/leilao_expresso/usuarios
```
- editar o status para false para "exclui-lo"
```
/v1/leilao_expresso/usuarios/excluir/:id
```
- editar o status para false para ativa-lo
```
/v1/leilao_expresso/usuarios/ativar/:id
```
- editar
```
/v1/leilao_expresso/usuarios/:id
```
<br>

---

<br>

<h3> endereços </h3>

- listar todos 
```
/v1/leilao_expresso/enderecos
```
- filtrando pelo ID
```
/v1/leilao_expresso/enderecos/:id
```
- inserir
```
/v1/leilao_expresso/enderecos
```
- editar o status para false para "exclui-lo"
```
/v1/leilao_expresso/enderecos/excluir/:id
```
- editar o status para false para ativa-lo
```
/v1/leilao_expresso/enderecos/ativar/:id
```
- editar
```
/v1/leilao_expresso/usuarios/:id
```
<br>

---
