
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()

//子路由1
let home = new Router()
home.get('/hh', async (ctx,next) => {
    ctx.body = ctx.query
}).get('/todo', async (ctx) => {
    ctx.body = 'Home todo'
})


//子路由2
let page = new Router()
page.get('/hh', async (ctx) => {
    ctx.body = 'Page hh'
}).get('/todo', async (ctx) => {
    ctx.body = 'Page todo'
})

//父路由,装载所有子路由
let router = new Router()
router.use('/home',home.routes(),home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

//加载路由中间件
app
    .use(router.routes())
    .use(router.allowedMethods())
app.listen(3000, () => {

})