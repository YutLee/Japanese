const mysql = require('mysql')
const { db } = require('./config')

// 序列化参数，创建 URL 编码文本字符串。
const serialize = (params) => {
  let query = ''
  Object.keys(params).forEach(entry => {
    if(params[entry] !== null && params[entry] !== undefined && params[entry] !== '') {
      query += `${!query ? '' : '&'}${entry}=${params[entry]}`
    }
  })

  return query
}

const pool = mysql.createPool(db);
const poolQuery = (sql, idx) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, (error, results) => {
      error && reject(error)
      resolve(idx >= 0 ? results && results[idx] : results)
    })
  })
}

const string10to64 = (number) => {
  const chars = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ-~'.split('')
  const radix = chars.length
  const arr = []
  let qutient = +number

  do {
    mod = qutient % radix
    qutient = (qutient - mod) / radix
    arr.unshift(chars[mod])
  } while (qutient)

  return arr.join('')
}

const string64to10 = (numberCode) => {
  const chars = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ-~'
  const radix = chars.length
  let number = String(numberCode)
  const len = number.length
  let originNumber = 0
  let i = 0

  while (i < len) {
    originNumber += Math.pow(radix, i++) * chars.indexOf(number.charAt(len - i) || 0)
  }

  return originNumber
}

module.exports = {
  serialize,
  poolQuery,
  string10to64,
  string64to10
}
