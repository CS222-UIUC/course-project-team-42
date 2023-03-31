import sqlite3

connection = sqlite3.connect('userinfo.db')

cursor = connection.cursor()
cursor.execute('''CREATE TABLE `userinfo` (
	`uuid` VARCHAR(40),
	`username` VARCHAR(40),
	`password` VARCHAR(40),
	PRIMARY KEY (`uuid`)
);''')

connection.close()