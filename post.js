const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser') //中间件
app.use(bodyParser())

app.use(async (ctx) => {
    //请求方式:GET,显示表单让用户填写
    // if (ctx.url === '/' && ctx.method === 'GET') {
    //     let html = `
    //         <h1>Koa2 request post demo</h1>
    //         <form action="/" method="POST">
    //             <p>userName</p>
    //             <input name="userName"/> <br/>
    //             <p>age</p>
    //             <input name="age"/> <br/>
    //             <p>webSite</p>
    //             <input name="webSite"/> <br/>
    //             <button type="submit">submit</button>
    //         </form>
    //     `
    //     ctx.body = html
    //     //请求方式:POST
    // } else if (ctx.url === '/' && ctx.method === 'POST') {
    //     //直接用ctx.request.body进行获取POST请求参数,中间件自动给我们做了解析
    //     let postData = ctx.request.body
    //     ctx.body = postData
    //     // let postData = await parsePostData(ctx)
    //     // ctx.body = postData //输出:userName=HH&age=44&webSite=555
    // } else {
    //     ctx.body = '<h1>404</h1>'
    // }

    //写入cookie
    if (ctx.url === '/index') {
        ctx.cookies.set(
            'userName', 'hh2', {
            domain: '127.0.0.1', //写cookie所在的域名
            path: '/index',//写cookie所在的路径
            maxAge: 1000 * 60 * 60 * 24,//cookie有效时长
            expires: new Date('2018-12-31'),//cookie失效时间
            httpOnly: false,//是否只用于http请求中获取
            overwrite: true //是否允许重写
        })
        ctx.body = 'cookies is ok'
    } else {
        if (ctx.cookies.get('userName')) {
            ctx.body = ctx.cookies.get('userName')
        } else {
            ctx.body = 'Cookie is none'
        }
    }
})

//解析Node原生POST参数
async function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postdata = ''
            //ctx.req.on来接收事件
            ctx.req.on('data', (data) => {
                postdata += data
            })
            ctx.req.addListener('end', () => {
                let parseData = parseQueryStr(postdata)
                resolve(parseData)
            })
        } catch (error) {
            reject(error)
        }
    })
}

function parseQueryStr(queryStr) {
    let queryData = {}
    let queryStrList = queryStr.split('&')
    console.log(queryStrList)
    for (let [index, queryStr] of queryStrList.entries()) {
        let itemList = queryStr.split('=')
        console.log(itemList)
        queryData[itemList[0]] = decodeURIComponent(itemList[1])
    }
    return queryData
}

app.listen(3000, () => {
    console.log('[demo] server is starting at port 3000')
})