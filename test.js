function getSomething() {
    return 'something'
}
//方法异步
async function testAsync() {
    return 'Hello async' //return直接返回async函数的值
}

const result = testAsync()
console.log(result) //Promise { 'Hello async' },返回的是Promise对象

//await一般在等待async方法执行完毕,await等待的只是一个表达式,这个表达式可以是Promise对象,也可以接受普通值
async function test() {
    const v1 = await getSomething() 
    const v2 = await testAsync()
    console.log(v1,v2)
}
test()

async function demo01() {
    return 123 //相当于Promise.resolve(123)
}

demo01().then(val => {
    console.log(val)
})

function takeLongTime() {
    return new Promise(resolve => {
        setTimeout(()=>resolve('long_time_value'),1000)
    })
}
async function test02() {
    const v = await takeLongTime()
    console.log(v)
}
test02()
