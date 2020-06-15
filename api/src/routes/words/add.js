const wordsData = require('../../db/words')

module.exports = async (ctx) => {
  const {
    name,
    pron = '',
    accent = '',
    romaji = '',
    spell = '',
    category = '',
    label = '',
    excerpt = ''
  } = ctx.request.body || {}

  if ((name || '').trim() === '') {
    ctx.body = { code: 600, msg: '请输入单词' }
    return
  }

  const date = new Date()
  const word = await wordsData.addOne({
    name,
    pron,
    accent,
    romaji,
    spell,
    category,
    label,
    excerpt
  })

  if (word) {
    ctx.body = { code: 200, msg: '添加成功' }
  } else {
    ctx.body = { code: 700, msg: '添加失败' }
  }
}
