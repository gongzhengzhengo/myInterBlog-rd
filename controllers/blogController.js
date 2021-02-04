const blogmodels = require('../models/blog')
module.exports = {
    async welcome(ctx) {
        try {
            let results = await blogmodels.getBlogs();
            if (results.length > 0) {
                ctx.body = {
                    state: "success",
                    blogs: results,
                };
            } else {
                ctx.body = {
                    state: "fail",
                };
            }
        } catch (err) {
            ctx.status = 500;
            console.log(err);
        }
    },
    async getblogDetail(ctx) {
        // console.log(111);

        const blogId = ctx.query.blogId;
        console.log(blogId);
        const results = await blogmodels.getBlogsById(blogId)
        console.log(results);
        if (results.length > 0) {
            let { blog_id, title, content, post_time } = results[0]
            blogDtl = { blog_id, title, content, post_time }

            blogDtl.comments = []
            for (let i = 0; i < results.length; i++) {
                let obj = results[i];
                blogDtl.comments.push({
                    comm_id: obj.comm_id,
                    comm_content: obj.comm_content,
                    comm_post_time: obj.comm_post_time,
                    username: obj.username
                });
            }
            ctx.body = {
                state: "success",
                blogDetails: results,
            };


        }
    },
    async pushBlog(ctx) {
        console.log('111');

        let { title, content, user_id } = ctx.request.body;
        let results = await blogmodels.saveBlogs({ title, content, user_id });
        console.log(results);

        if (results.insertId > 0) {
            ctx.body = {
                state: "success",
            };
        } else {
            ctx.body = {
                state: "fail",
            };
        }


    }, async deleBlog(ctx) {
        // console.log('1111');

        var blog_id = ctx.request.body.blogId;
        // console.log(blog_id);

        try {
            let results = await blogmodels.deleBlog(blog_id);
            // console.log(results);
            
            if (results.changedRows) {
                ctx.body = {
                    state: "success",
                };
            } else {
                ctx.body = {
                    state: "fail",
                };
            }
        } catch (err) {
            ctx.status = 500;
            console.log(err);
        }

    }, async getConlist(ctx) {
        try {
            let results = await blogmodels.getBlogs();
            if (results.length > 0) {
                ctx.body = {
                    state: "success",
                    blogs: results,
                };
            } else {
                ctx.body = {
                    state: "fail",
                };
            }
        } catch (err) {
            ctx.status = 500;
            console.log(err);
        }


    },
    async pushcomment(ctx) {
        var pshcomment = ctx.request.body;
        const blogId = ctx.params.blog_id;
        var userId = ctx.session.loginId;
        pshcomment.blog_id = blogId;
        pshcomment.user_id = userId;
        var results = await blogmodels.savecomment(pshcomment)
        console.log(results);
        if (results.insertId) {
            ctx.redirect('/blogdetail/' + blogId)
        } else {
            ctx.render('error', {
                msg: '发送文章失败'
            })
        }

    },

}
