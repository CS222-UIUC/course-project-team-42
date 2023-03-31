import sqlite3
import uuid


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


userLoginCheck("ds","djsihi");
userLoginCheck("dhsuh","djsihi");