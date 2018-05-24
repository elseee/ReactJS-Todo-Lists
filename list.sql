create table list (
 id integer primary key auto_increment,
 taak varchar(50) NOT NULL,
 done BIT
);

create table users (
 id integer primary key auto_increment,
 user varchar(50) NOT NULL,
 password varchar(50) NOT NULL
);