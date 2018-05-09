var koa = require('koa');
var app = new koa();
var router = require('koa-router')();
const cors = require('koa2-cors');
const bridge = require( '@lvchengbin/koa-bridge' );

app.use(cors({
    origin: function (ctx) {
        console.log(ctx)
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

router.post( '/detail', async ctx => {
    console.log(ctx);
    ctx.body = 111
} );

router.get( '/getUser', async ctx => {
    console.log(ctx)
    return bridge( ctx,{
        dest : 'http://192.168.0.37:8999/api/users/list'
    } );
} );
app.use(router.routes())
    .use(router.allowedMethods());

app.listen(8000);
