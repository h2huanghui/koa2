const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()

//父路由
// let router = new Router()

const router = new Router({
    prefix:'/hh' //前缀
})

router
    .get('/11', (ctx, next) => {
        ctx.body = 'hello'
    })
    .get('/todo', (ctx, next) => {
        ctx.body = 'todo page'
    }) //增加todo的页面

app
    .use(router.routes())
    .use(router.allowedMethods())
app.listen(3000, () => {

})