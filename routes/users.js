const router = require('koa-router')()
const user = require('../controllers/userController')

router.prefix('/user')

router.post('/login', user.login)
module.exports = router
