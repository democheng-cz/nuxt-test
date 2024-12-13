import { calcKeyByRSA } from './sign'

const baseUrl =
  (process.env.ENV || process.env.APP_ENV) === 'prod'
    ? 'https://ggtools.thinkerx.com'
    : 'https://beta.eggi.cn'
const SUCCESS_CODE = [1]
type Fn = (data?: any) => any
export default function query(
  path: string,
  method = 'post',
  data: any = {},
  callback?: Fn,
  callbackErr?: Fn
) {
  let url = `${baseUrl}/${path}`

  if (path && path.indexOf('http') === 0) {
    url = path
  }
  const headers = new Headers()
  const sign = calcKeyByRSA(data)

  // 有些接口需要其他类型的header
  console.log(data)
  const d = JSON.parse(JSON.stringify(data))
  Reflect.deleteProperty(d, 'setHeader')
  headers.append('sign', d)
  if (data.setHeaders) {
    Object.keys(data.setHeaders).forEach((hkey) => {
      headers.append(hkey, data.setHeaders[hkey])
    })
    delete data.setHeaders
    data = JSON.stringify(data)
  } else {
    // headers.append(
    //   'Content-Type',
    //   'application/x-www-form-urlencoded;charset=UTF-8'
    // )
  }
  // 如果请求的参数里面有需要转换的参数
  const params = data

  const fetchObj: any = {
    headers,
    method,
  }
  let body = ''
  if (method === 'get' || method === 'head') {
    body = Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join('&')
    // get和head方法不能有body
    url = `${url}?${body}`
  } else {
    fetchObj.body = JSON.stringify(params)
  }
  window
    .fetch(url, fetchObj)
    .then((res) => {
      try {
        let response
        if (fetchObj.responseType === 'blob') {
          response = res.blob()
        } else {
          response = res.json()
        }
        return response
      } catch (e) {
        console.log(e)
        return false
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .then((response) => {
      if (response && SUCCESS_CODE.includes(Number(response.status))) {
        callback && callback(response)
      } else if (fetchObj.responseType === 'blob') {
        callback && callback(response)
      } else {
        const msg = (response && response.msg) || '服务器异常，请稍后重试'
        callbackErr &&
          callbackErr(
            response || {
              msg,
            }
          )
      }
    })
}
