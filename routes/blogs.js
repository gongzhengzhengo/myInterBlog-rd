const router = require('koa-router')()
const { verifyToken } = require("../auth");
const blog = require('../controllers/blogController')
router.prefix('/blog')

router.get('/list', blog.welcome)
router.get('/detail', blog.getblogDetail)

router.post('/post',blog.pushBlog)

router.get('/conlist',verifyToken,blog.getConlist)

router.post('/delete',verifyToken,blog.deleBlog)
module.exports = router
