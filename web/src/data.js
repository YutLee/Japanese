// import {
//   serialize
// } from './utils'
// import md5 from 'md5'

export const fetch = async (url = '', options = {}) => {
  const newUrl = /\?/.test(url) ? `${url}${/(&|\?)$/.test(url) ? '' : '&'}_t=${Date.now()}` : `${url}?_t=${Date.now()}`
  const headers = {'Content-Type': 'application/json'}

  return await window.fetch(newUrl, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers,
    ...options
  }).then(res => res.json())
}

/**
 * 搜索单词
 */
export const getWordsByKeyword = ({ keyword }) => (
  fetch('/api/search?keyword=' + keyword)
)

/**
 * 获取单词列表
 */
export const getWords = () => (
  fetch('/api/words')
)

/**
 * 添加单词
 */
export const addWord = (params) => (
  fetch('/api/words', {
    method: 'post',
    body: JSON.stringify(params)
  })
)
