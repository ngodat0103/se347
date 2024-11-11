create role "dev" with password 'dev' ;
create database "user-management" with owner  "dev";
grant connect to "dev";
alter role "dev" with login ;