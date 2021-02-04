const db = require('./db')
module.exports = {
    saveUsers(user) {
        return db.query(`insert into t_user set ? `, user)
    },
    getUser(username, password) {
        return db.query(
            "SELECT * FROM t_user where username=? and password=?",
            [username, password]
        );
    },
    
}