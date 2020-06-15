// 用户表
const { poolQuery } = require('../util')

const findById = (id) => poolQuery(`
  SELECT * FROM words WHERE id='${id}'
`, 0)

const findAll = () => poolQuery(`
  SELECT * FROM words
`)

const findByKeyword = (keyword) => poolQuery(`
  SELECT * FROM words WHERE name LIKE '%${keyword}%' OR excerpt LIKE '%${keyword}%'
  OR pron LIKE '%${keyword}%' OR accent LIKE '%${keyword}%' OR romaji LIKE '%${keyword}%'
  OR spell LIKE '%${keyword}%' OR label LIKE '%${keyword}%'
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
  findByKeyword,
  addOne
}
