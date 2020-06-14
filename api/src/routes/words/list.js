const wordsData = require('../../db/words')
const { string10to64 } = require('../../util')

module.exports = async (ctx) => {
  const words = await wordsData.findAll()

  if (words) {
    ctx.body = { code: 200, words: words.map(item => {
      return {
        ...item,
        id: string10to64(item.id)
      }
    }) }
  } else {
    ctx.body = { code: 600, msg: '获取单词列表失败' }
  }
}
