
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',   // 数据库地址
    user: 'root',    // 数据库用户
    password: '111',  // 数据库密码
    database: 'myblog'  // 选中数据库
}

);
module.exports={
    async query(sql, value) {
    return new Promise((reslove, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, value,function (error, results) {
                    connection.release();
                    if (error) {
                        reject(error)
                    } else {
                        reslove(results)
                    }
                });
            }

        });

    })
}
}
