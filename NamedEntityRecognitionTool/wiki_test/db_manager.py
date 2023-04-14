import sqlite3
import uuid


# db function for adding a new username and password.
# input: username (str), password (str)
# using sql code in general.
# we create a uuid as the key.
# when sucessfully added, will print the query, and close connection
def userInformationAdd(userName: str, passWord: str):
    userUuid = uuid.uuid1()
    connection = sqlite3.connect('userinfo.db')
    cursor = connection.cursor()
    quary  = '''
    INSERT INTO userinfo
    VALUES ('{}', '{}', '{}');'''.format(userUuid, userName, passWord)
    print(quary)
    cursor.execute(quary)
    connection.commit()
    connection.close()


# db function for checking a username with its password (the usual login process).
# input: username (str), password (str)
# using sql code in general
# when sucessfully checked, will print the uuid key, and close connection
# if password incorrect or username not exist, will print out none.
def userLoginCheck(userName: str, passWord: str):
    connection = sqlite3.connect('userinfo.db')
    cursor = connection.cursor()
    quary  = '''
    SELECT uuid
    FROM userinfo c
    where '{}' = c.username and '{}' = c.password;'''.format(userName, passWord)
    out = cursor.execute(quary).fetchone()
    print(out)
    connection.close()
    return out


# db function for deleting a username and password.
# input: username (str), password (str)
# using sql code in general.
# when sucessfully deleted, will print the query, and close connection
# else, no deletion is made.
def userInformationDelete(userName: str, passWord: str):
    connection = sqlite3.connect('userinfo.db')
    cursor = connection.cursor()
    query  = '''
    DELETE FROM userinfo
    WHERE '{}' = username and '{}' = password;'''.format(userName, passWord)
    print(query)
    cursor.execute(query)
    connection.commit()
    connection.close()


# we can use the code below for testing
# userInformationAdd("username_test","123456")
# userLoginCheck("username_test","123456")
# userInformationDelete("ds", "djsihi")