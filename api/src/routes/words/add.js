const wordsData = require('../../db/words')

module.exports = async (ctx) => {
  const { name } = ctx.request.body || {}
  const date = new Date()
  const word = await wordsData.addOne({name})

  if (word) {
    ctx.body = { code: 200 }
  } else {
    ctx.body = { code: 600, msg: '添加失败' }
  }
}
