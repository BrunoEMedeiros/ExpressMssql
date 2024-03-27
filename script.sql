create database senai
use senai

create table Produtos(
    id INT PRIMARY KEY IDENTITY,
    descricao VARCHAR(50),
    preco DECIMAL(5,2)
)

select * from Produtos
insert into Produtos values('teste',20.50)
update Produtos set descricao = 'novo', preco = 1.50 where id = 1
delete from Produtos where id = 1