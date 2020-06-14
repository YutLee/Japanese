const userAgent = navigator.userAgent.toLowerCase()

export const clientEnv = {
  userAgent: userAgent,
  isWechat: (/MicroMessenger/i).test(userAgent),
  isIos: (/(iPhone|iPod|iPad);?/i).test(userAgent),
  isAndroid: (/android/i).test(userAgent),
  isSafari: (/Safari/i).test(userAgent),
  appScheme: 'lessomall://weixin.lessomall.com'
}

export const SEO = {
  keywords: '日语',
  description: '日语',
  title: '日语'
}

export const tryJson = (name, value, defaultValue) => {
  let json
  try {
    json = JSON[name](value) || defaultValue
  } catch (e) {
    json = defaultValue || null
  }
  return json
}

// 序列化参数，创建 URL 编码文本字符串。
export const serialize = (params, baseUrl = '') => {
  let query = ''
  Object.keys(params).forEach(entry => {
    let value = params[entry]

    if (value !== null && value !== undefined && value !== '') {
      // /[\u4e00-\u9fa5]/ encodeURIComponent(value) // 如果直接编码value，会导致英文逗号等也被编码
      query += `${!query ? '' : '&'}${entry}=${value}`
    }
  })

  return baseUrl + (/\?/.test(baseUrl) ? '&' : query ? '?' : '') + query
}

// URL 参数
export const getParams = (location) => {
  const { search } = location || window.location
  const params = search.replace(/^\?+/, '').split('&')
  let paramsObj = {}

  params.forEach(item => {
    const param = item.split('=')

    if(param[0] && param[1]) {
      paramsObj[param[0]] = param[1]
    }
  })

  return paramsObj
}

export const addClass = (...params) => (
  params.filter(item =>
    (Array.isArray(item) && item[0] && typeof item[1] === 'string' && (item[1] || '').trim() !== '') ||
    (typeof item === 'string' && (item || '').trim() !== '')
  )
    .map(item => (
      Array.isArray(item) ? (item[0] ? item[1] : item[2] || '') : (item || '').trim()
    ))
    .join(' ')
)

export const formatDate = (date, fmt) => {
  let format = fmt || 'yyyy.MM.dd hh:mm:ss'
  const now = new Date(parseInt(date))
  const o = {
    'y+': now.getFullYear(), // 年份
    'M+': now.getMonth() + 1, // 月份
    'd+': now.getDate(), // 日
    'h+': now.getHours(), // 小时
    'm+': now.getMinutes(), // 分
    's+': now.getSeconds(), // 秒
    'q+': Math.floor((now.getMonth() + 3) / 3), // 季度
    'S': now.getMilliseconds() // 毫秒
  }

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (now.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }

  return format
}
