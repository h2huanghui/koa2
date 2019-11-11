const Koa = require('koa')
const app = new Koa()

// app.use(async (ctx) => {
//     ctx.body = 'hello koa2'
// })

//get请求接收http://localhost:3000/?user=hh&age=18
app.use(async (ctx) => {
    let url = ctx.url
    //ctx.request是koa2中context经过封装的请求对象
    let request = ctx.request
    //法1:从request中获得
    let req_query = request.query //对象
    let req_querystring = request.querystring //JSON字符串

    //法2:从上下文中直接获取
    let ctx_query = ctx.query
    let ctx_querystring = ctx.querystring

    ctx.body = {
        url,
        req_query,
        req_querystring,
        ctx_query,
        ctx_querystring
    }
})

app.listen(3000, () => {
    console.log('[demo] start-quick is starting at port 3000')
})





