const Koa = require('koa')
const Router = require('koa-router')
const fetch = require('node-fetch')
const koaBody = require('koa-body')
const app = new Koa()
const router = new Router({
  prefix: '/api'
})


router.get('/search', require('./routes/words/search'))
router.get('/words', require('./routes/words/list'))
router.post('/words', require('./routes/words/add'))

app.use(koaBody())

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }

	// return next()
})

app.use(router.routes())
  .use(router.allowedMethods())

app.listen(process.env.PORT || 5001)
