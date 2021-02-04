const db = require('./db')
module.exports = {
  getBlogs() {
    return db.query('SELECT * FROM t_blog where is_delete = 0 ')
  },
  getBlogsById(blog_id) {
    return db.query(`SELECT blog.*, comm.comm_id, comm.content as comm_content, comm.post_time as comm_post_time, usr.username
      FROM t_blog blog  LEFT JOIN t_comment comm 
      ON comm.blog_id=blog.blog_id 
      LEFT JOIN t_user usr ON comm.user_id=usr.user_id
      WHERE blog.blog_id=?`, [blog_id])
  },
  saveBlogs(blog) {
    return db.query(`insert into t_blog set ? `, blog)
  },
  savecomment(comment) {

    return db.query(`insert into t_comment set ? `, comment)
  }, deleBlog(blog) {

    return db.query(`UPDATE t_blog SET is_delete = 1 WHERE blog_id=? `, blog)
  },

}