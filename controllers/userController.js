const usermodels = require('../models/user');
const {createToken} = require('../auth')
module.exports = {
    login: async function (ctx, next) {
        // 1. 接数据
        let { username, password } = ctx.request.body;
        // 2. 验证
    
        // 3. 连数据库
        let results = await usermodels.getUser(username, password);
        console.log(results);
        
        // 4. 根据数据库操作的结果，返回相应的信息
        if (results.length > 0) {
          // 登录成功
          // 生成token
          let payload = {
            
            username,
          };
          var token = createToken(payload);
          ctx.body = {
            state: "success",
            token,
            user: results[0]
          };
        } else {
          ctx.body = {
            state: "fail"
          }
        }
      },
    async regist(ctx) {
        var user = ctx.request.body;
        var results = await usermodels.saveUsers(user)
        console.log(results);
        if (results.insertId) {
            ctx.redirect('/login')
        } else {
            await ctx.render('error', {
                msg: '注册失败'
            })
        }
    },
    
    

}