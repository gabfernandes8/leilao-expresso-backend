create schema db_leilao_expresso;

use db_leilao_expresso;

create table tbl_administrador (
id int primary key not null auto_increment,
nome varchar(150) not null,
email varchar(50) not null,
telefone varchar(12) not null,
senha varchar(30)  not null,
cpf varchar(11) not null,
status boolean not null
);

desc tbl_administrador;
insert into tbl_administrador (nome, email, telefone, senha, cpf, status) values 
('Gabriela Fernandes Cavalcanti', 'gabfernandes8@gmail.com', '11966197988', 'Hagrid123', '40846492837', true),
('Ryan Alves', 'ryanalves13@gmail.com', '11962187888', 'TaylorS123', '46283345875', true);
select * from tbl_administrador;

create table tbl_enderecos (
id int primary key not null auto_increment,
cep varchar(8) not null, 
logradouro varchar(100) not null, 
numero_casa varchar(10) not null, 
complemento varchar(45),
bairro varchar(45) not null,
cidade varchar(45) not null,
status boolean not null,
unique index(id),
unique key (id)
);

desc tbl_enderecos;
insert into tbl_enderecos (cep, logradouro, numero_casa, complemento, bairro, cidade, status) values 
('06320220', 'Rua Joâo Acácio de ALmeida', '446', null, 'Jardim das Belezas', 'Carapicuíba', true),
('06355130', 'Rua Mercês', '02', null, 'Parque Ideal', 'Carapicuiba', true);
select * from tbl_enderecos;

create table tbl_usuarios (
id int primary key not null auto_increment,
nome varchar(150) not null,
email varchar(50) not null,
telefone varchar(12) not null,
senha varchar(30)  not null,
cpf varchar(11) not null,
foto_perfil varchar(255),
endereco_id int not null,
status boolean not null,
unique index (id),
unique key (id),
foreign key (endereco_id) references tbl_enderecos(id)
);

desc tbl_usuarios;
insert into tbl_usuarios (nome, email, telefone, senha, cpf, foto_perfil, endereco_id, status) values 
('Mariana Alves', 'marialves@gmail.com', '11965197988', 'Seventeen127', '46283245875', null, '1', true),
('Julia Paiva', 'jupoliver@gmail.com', '11964197988', 'Paivitita123', '45283145875', null, '2', true);
select * from tbl_usuarios;

create table tbl_preferencias_clientes (
id int primary key not null auto_increment,
nome varchar(50) not null,
status boolean not null,
unique index (id),
unique key (id)
);

desc tbl_preferencias_clientes;
insert into tbl_preferencias_clientes (nome, status) values 
('Colar', true),
('Brinco', true);
select * from tbl_preferencias_clientes;

create table tbl_preferencias_usuarios (
id int primary key not null auto_increment,
usuario_id int not null,
preferencia_id int not null,
status boolean not null,
unique index (id),
unique key (id),
foreign key(usuario_id) references tbl_usuarios(id),
foreign key(preferencia_id) references tbl_preferencias_clientes(id)
);

desc tbl_preferencias_usuarios;
insert into tbl_preferencias_usuarios (usuario_id, preferencia_id, status) values 
('1', '1', true),
('2', '2', true);
select * from tbl_preferencias_usuarios;

create table tbl_categorias (
id int primary key not null auto_increment,
nome varchar(45) not null,
status boolean not null,
unique index (id),
unique key (id)
);

desc tbl_categorias;
insert into tbl_categorias (nome, status) values 
('Colar', true),
('Brinco', true);
select * from tbl_categorias;

create table tbl_produto (
id int primary key not null auto_increment,
nome text not null,
descricao text not null,
valor_fixo double not null,
foto_produto varchar(255) not null,
categoria_id int not null,
status boolean not null,
unique index (id),
unique key (id),
foreign key(categoria_id) references tbl_categorias(id)
);

desc tbl_produto;
insert into tbl_produto (nome, descricao, valor_fixo, foto_produto, categoria_id, status) values 
('Colar de Duas Voltas em Ouro Amarelo', 'A coleção Tiffany HardWear é elegantemente subversiva e captura o espírito das mulheres da cidade de Nova York. Uma audaciosa corrente de elos captura a essência urbana da cidade, criando uma declaração deslumbrante', 10.00, 'https://tiffany.vtexassets.com/arquivos/ids/171478-1200-1200/colar-tiffany-hardwear-de-duas-voltas-em-ouro-amarelo-60700923_1.jpg?v=638285955195970000', '1', true),
('Brincos Longos em Ouro Amarelo com Diamantes', 'As extremidades entrelaçadas do motivo característico de Tiffany Knot simbolizam o poder das conexões entre as pessoas. Equilibrando força e elegância, cada design de Tiffany Knot é uma façanha complexa de artesanato. Esses brincos de gota são feitos em Ouro amarelo e Diamantes pavé, e depois polidos à mão para um brilho intenso. Cada Diamante brilhante redondo - escolhido especificamente para atender aos altos padrões da Tiffany - é colocado à mão em ângulos precisos para maximizar o brilho. Use esses brincos sozinhos para um impacto máximo.', 20.00, 'https://tiffany.vtexassets.com/arquivos/ids/170325-1200-1200/brincos-tiffany-knot-longos-em-ouro-amarelo-com-diamantes-68887690_3.jpg?v=638285940985300000', '2', true);
select * from tbl_produto;

create table tbl_lotes (
id int primary key not null auto_increment,
data_fim datetime,
produto_id int not null,
usuario_id int not null,
status boolean not null,
unique index (id),
unique key (id),
foreign key(produto_id) references tbl_produto(id),
foreign key (usuario_id) references tbl_usuarios(id)
);

desc tbl_lotes;
insert into tbl_lotes (data_fim, produto_id, usuario_id, status) values 
('02-10-23', '1', '1', true),
('20-10-24', '2', '2', true);
select * from tbl_lotes;

create table tbl_vendas (
id int primary key not null auto_increment,
usuario_id int not null,
produto_id int not null, 
status boolean not null,
unique index (id),
unique key (id),
foreign key (usuario_id) references tbl_usuarios(id),
foreign key(produto_id) references tbl_produto(id)
);

desc tbl_vendas;
insert into tbl_vendas (usuario_id, produto_id, status) values 
('1', '1',  true),
('2', '2',  true);
select * from tbl_vendas;

create table tbl_lances (
id int primary key not null auto_increment,
valor varchar(45) not null,
usuario_id int not null, 
lote_id int not null,
status boolean not null,
unique index (id),
unique key (id),
foreign key (usuario_id) references tbl_usuarios(id),
foreign key (lote_id) references tbl_lotes(id)
);

desc tbl_lances;
insert into tbl_lances (valor, usuario_id, lote_id, status) values 
('10.60','1', '1',  true),
('8.90', '2', '2', true);
select * from tbl_lances;

create table tbl_arremates (
id int primary key not null auto_increment,
valor_final double not null,
venda_id int not null,
lance_id int not null,
status boolean not null,
unique index (id),
unique key (id),
foreign key (venda_id) references tbl_vendas(id),
foreign key (lance_id) references tbl_lances(id)
);

desc tbl_arremates;
insert into tbl_arremates (valor_final, venda_id, lance_id, status) values 
(1.65, '1', '1', true),
(2.50, '2', '2', true);
select * from tbl_arremates;





