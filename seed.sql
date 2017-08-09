CREATE DATABASE obamazondb;

USE obamazondb;


create table products (
    item_id int not null auto_increment,
    product_name varchar(100) null,
    department_name varchar(100) null,
    price decimal(10, 2) null,
    stock_qty int null,
    primary key (item_id)
);


insert into products (product_name, department_name, price, stock_qty)
values ("soybean", "food", 2, 500);

insert into products (product_name, department_name, price, stock_qty)
values ("shakeweight", "workout", 19.99, 891);

insert into products (product_name, department_name, price, stock_qty)
values ("fidget spinner", "toy", 5.89, 90);

insert into products (product_name, department_name, price, stock_qty)
values ("pancake", "food", 5.25, 11);