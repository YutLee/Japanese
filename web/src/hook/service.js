import { useEffect, useRef, useState, useCallback } from 'react'
import { isEqual } from 'lodash'

const init = {loading: false, error: null}
const useService = (service, params) => {
  const prevParams = useRef(null)
  const [callback, status] = useServiceCallback(service)

  useEffect(() => {
    if (!isEqual(prevParams.current, params)) {
      prevParams.current = params
      callback(params)
    }
  })

  return status
}

export const useServiceCallback = (service) => {
  const [ status, setStatus ] = useState(init)

  const callback = useCallback(
    params => {
      setStatus({...init, loading: true})
      service(params)
        .then(res => {
          setStatus({...init, ...res, loading: false})
        })
        .catch(error => {
          const { dispatch } = window.reducer

          if (!window.yosBuyerApp) {
            if (navigator.onLine === false) {
              dispatch({
                type: 'dialog',
                dialog: {
                  isOpen: true,
                  title: '似乎已断开与互联网的连接',
                  okText: '刷新',
                  cancelText: '',
                  onOk: () => {
                    dispatch({type: 'dialog', dialog: {}})
                    window.location.reload()
                  }
                }
              })
            } else if (Object.prototype.toString.call(error) === '[object Error]') {
              dispatch({
                type: 'dialog',
                dialog: {
                  isOpen: true,
                  title: '出错了，请稍后刷新页面重试',
                  okText: '刷新',
                  cancelText: '',
                  onOk: () => {
                    dispatch({type: 'dialog', dialog: {}})
                    window.location.reload()
                  }
                }
              })
            }
          }

          setStatus({...init, error, loading: false})
        })
    },
    [service]
  )

  return [callback, status]
}

export default useService
