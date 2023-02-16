npm install express body-parser dotenv
npm install typescript --save-dev
npm install --save mysql
npm install --save-dev @types/mysql
<!-- npx tsc --init -->

To Set Up MySQL

First need to install MySQL Server and setup password
then run /usr/local/mysql/bin/mysql -u root -p  
enter password
You should get 'Welcome to the MySQL monitor.'

CREATE USER 'user'@'localhost'  IDENTIFIED BY  'PWD';
GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'user'@'localhost' WITH GRANT OPTION;
/usr/local/mysql/bin/mysql -u user -p
enter: PWD

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456789';


Type: show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.01 sec)

Then: create database database_name; 
I chose database_name = satyam

Type: show databases;

+--------------------+

| Database           |

+--------------------+

| information_schema |

| mysql              |

| performance_schema |

| satyam             |

| sys                |

+--------------------+

5 rows in set (0.00 sec)

Type: use satyam;
Type: show tables;
Empty set (0.00 sec)

You can now create tables;

Sample query:

CREATE TABLE `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(64) DEFAULT '',
    `row_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `row_updated` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `id` (`id`),
    KEY name_index (name)
);

Type: show tables; desc users;

Download Sequel Ace/Table Plus for better UI.
Create a connection with connection type(TCP/IP), username and password.
Once connection is created, select database `satyam` in the app
Now you can access your users table and run query there.

