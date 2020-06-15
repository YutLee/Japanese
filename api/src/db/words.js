// 用户表
const { poolQuery } = require('../util')

const findById = (id) => poolQuery(`
  SELECT * FROM words WHERE id='${id}'
`, 0)

const findAll = () => poolQuery(`
  SELECT * FROM words
`)

const addOne = ({
  name,
  excerpt = '',
  pron = '',
  accent = '',
  romaji = '',
  spell = '',
  label = ''
}) => poolQuery(`
  INSERT INTO words (name, excerpt, pron, accent, romaji, spell, label)
  VALUES ('${name}', '${excerpt}', '${pron}', '${accent}', '${romaji}', '${spell}', '${label}')
`)

module.exports = {
  findById,
  findAll,
  addOne
}
