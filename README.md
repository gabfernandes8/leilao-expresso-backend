# leilao-expresso-backend

## endpoints:
<br>

#### Hospedagem

<div>
  <img src="https://img.shields.io/badge/Render-0D1117?style=flat-square&logo=render&logoColor=46E3B7" alt="render">
  <img src="https://img.shields.io/badge/Microsoft_Azure-0D1117?style=flat-square&logo=microsoft-azure&logoColor=blue" alt="azure">
</div>
  
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
/v1/leilao_expresso/valor/lote
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

<br>

<h3> vendas </h3>

- listar todos 
```
/v1/leilao_expresso/vendas
```
- filtrando pelo ID
```
/v1/leilao_expresso/vendas/:id
```
- inserir
```
/v1/leilao_expresso/vendas
```
- editar o status para false para "exclui-lo"
```
/v1/leilao_expresso/vendas/excluir/:id
```
- editar o status para false para ativa-lo
```
/v1/leilao_expresso/vendas/ativar/:id
```
- editar
```
/v1/leilao_expresso/vendas/:id
```
<br>

---

<br>

<h3> lances </h3>

- listar todos 
```
/v1/leilao_expresso/lances
```
- filtrando pelo ID
```
/v1/leilao_expresso/lances/:id
```
- inserir
```
/v1/leilao_expresso/lances
```
- editar o status para false para "exclui-lo"
```
/v1/leilao_expresso/lances/excluir/:id
```
- editar o status para false para ativa-lo
```
/v1/leilao_expresso/lances/ativar/:id
```
- editar
```
/v1/leilao_expresso/lances/:id
```
<br>

---

<br>

<h3> arremates </h3>

- listar todos 
```
/v1/leilao_expresso/arremates
```
- filtrando pelo ID
```
/v1/leilao_expresso/arremates/:id
```
- inserir
```
/v1/leilao_expresso/arremates
```
- editar o status para false para "exclui-lo"
```
/v1/leilao_expresso/arremates/excluir/:id
```
- editar o status para false para ativa-lo
```
/v1/leilao_expresso/arremates/ativar/:id
```
- editar
```
/v1/leilao_expresso/arremates/:id
```
<br>

---