## 1. Koa开发环境搭建
`npm init -y`

`npm i --save koa`

```
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
    ctx.body = 'hello koa2'
})

app.listen(3000, () => {
    console.log('[demo] start-quick is starting at port 3000')
})
```
运行 `node index.js`

## 2. GET请求的接收
```
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

```

## 3. POST请求接收
```
app.use(async(ctx)=>{
    //当请求时GET请求时，显示表单让用户填写
    if(ctx.url==='/' && ctx.method === 'GET'){
        let html =`
            <h1>Koa2 request post demo</h1>
            <form method="POST"  action="/">
                <p>userName</p>
                <input name="userName" /> <br/>
                <p>age</p>
                <input name="age" /> <br/>
                <p>webSite</p>
                <input name='webSite' /><br/>
                <button type="submit">submit</button>
            </form>
        `;
        ctx.body =html;
    //当请求时POST请求时
    }else if(ctx.url==='/' && ctx.method === 'POST'){
        ctx.body='接收到请求';
    }else{
        //其它请求显示404页面
        ctx.body='<h1>404!</h1>';
    }
})
```
`解析Node原生POST参数`
```
function parsePostData(ctx){
    return new Promise((resolve,reject)=>{
        try{
            let postdata="";
            ctx.req.on('data',(data)=>{
                postdata += data
            })
            ctx.req.addListener("end",function(){
              
                resolve(postdata);
            })
        }catch(error){
            reject(error);
        }
    });
}

```

`POST字符串解析JSON对象`
```
function parseQueryStr(queryStr){
    let queryData={};
    let queryStrList = queryStr.split('&');
    console.log(queryStrList);
    for( let [index,queryStr] of queryStrList.entries() ){
        let itemList = queryStr.split('=');
        console.log(itemList);
        queryData[itemList[0]] = decodeURIComponent(itemList[1]);
    } 
    return queryData
}
```


## 4. POST请求参数处理 koa-bodyparser中间件
`npm i --save koa-bodyparser`

`app.use(bodyParser())`

## 5. Koa原生路由实现
见 `koa-parent-router.js`

## 6. Koa router中间件(层级以及参数)
`npm i --save koa-router`

见 `koa-router.js`

## 7. Koa使用cookie
```
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
```

## 8. ejs模板
`npm i --save koa-views`

`npm i --save ejs`

新建文件夹`view`, 新建文件`index.ejs`
```
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
</head>
<body>
    <h1><%= title %></h1>
    <p>EJS Welcome to <%= title %></p> 
</body>
</html>
```
根目录新建`koa-ejs`
```
const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

//加载模板引擎
app.use(views(path.join(__dirname, './view'), {
    extension:'ejs'
}))

app.use(async (ctx) => {
    let title = 'hello koa2'
    await ctx.render('index', {
        title
    })
})

app.listen(3000, () => {
    console.log('222')
})
```


## 9. koa-static静态资源中间件
`npm i --save static`

代码见`koa-static.js`