const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()

//静态路径(只运行访问static目录下的静态资源)
const staticPath = './static'

app.use(static(
    path.join(__dirname,staticPath)
))

app.use(async (ctx) => {
    ctx.body = 'hello world'
})

app.listen(3000, () => {
    console.log('。。。。')
})