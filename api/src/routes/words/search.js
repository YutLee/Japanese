const wordsData = require('../../db/words')
const { string10to64 } = require('../../util')

module.exports = async (ctx) => {
  const { keyword } = ctx.query

  if ((keyword || '').trim() === '') {
    ctx.body = { code: 600, msg: '请输入关键字搜索' }
    return
  }

  const words = await wordsData.findByKeyword(decodeURIComponent(keyword))

  if (words) {
    ctx.body = { code: 200, words: words.map(item => {
      return {
        ...item,
        id: string10to64(item.id)
      }
    }) }
  } else {
    ctx.body = { code: 500, msg: '异常' }
  }
}
