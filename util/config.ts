import { calcKeyByRSA } from './sign'

const baseUrl =
  process.env.ENV === 'prod'
    ? 'https://ggtools.thinkerx.com'
    : 'https://beta.eggi.cn'
export const guiguiBaseUrl =
  (process.env.ENV || process.env.APP_ENV) === 'prod'
    ? 'https://ggtools.thinkerx.com'
    : 'https://test-api.eggrj.com'
export const sfeUrl =
  (process.env.ENV || process.env.APP_ENV) === 'prod'
    ? 'https://gui.eggrj.com'
    : 'https://guitest.eggrj.com'
export interface IData<T = any> {
  code: number
  data: T
  msg: string
  status: number
}
class Fetch {
  protected baseUrl: string
  protected guiguiBaseUrl: string
  constructor(baseUrl: string, guiguiBaseUrl: string) {
    this.baseUrl = baseUrl
    this.guiguiBaseUrl = guiguiBaseUrl
  }
  POST<T>(url: string, data: any): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const sign = calcKeyByRSA(data)
      const d = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json;charset=utf-8;',
          sign,
        },
        body: JSON.stringify(data),
      }
      this.handleOther(d.headers)
      let hasPy = url.startsWith('/py')
      let baseUrl = this.baseUrl
      if (hasPy) {
        url = url.replace('/py', '')
        baseUrl = this.guiguiBaseUrl
      }
      this.handleRequest(baseUrl + url, d, resolve, reject)
    })
  }
  GET<T>(url: string, params: any): Promise<T> {
    const paramsArr = Object.keys(params).map((k) => `${k}=${params[k]}`)
    let str = ''
    if (paramsArr.length) {
      str = `?${paramsArr.join('&')}`
    }
    let hasPy = url.startsWith('/py')
    let baseUrl = this.baseUrl
    if (hasPy) {
      url = url.replace('/py', '')
      baseUrl = this.guiguiBaseUrl
    }
    url = `${baseUrl}${url}${str}`

    const sign = calcKeyByRSA(params)
    return new Promise<T>((resolve, reject) => {
      const d = { method: 'GET', headers: { sign } }
      this.handleOther(d.headers)

      this.handleRequest(url, d, resolve, reject)
    })
  }
  POSTFROM<T>(url: string, data: any): Promise<T> {
    const fd = new FormData()
    Object.keys(data).forEach((k) => {
      fd.append(k, data[k])
    })
    const sign = calcKeyByRSA(data)
    return new Promise<T>((resolve, reject) => {
      const d = {
        method: 'POST',
        headers: {
          'Content-type': 'multipart/formdata',
          sign,
        },
        body: fd,
      }
      this.handleOther(d.headers)
      this.handleRequest(this.baseUrl + url, d, resolve, reject)
    })
  }
  protected async handleRequest(
    url: string,
    options: any,
    resolve: any,
    reject: any
  ) {
    try {
      const response = await fetch(url, options)
      resolve(response.json())
    } catch (err) {
      reject(err)
    }
  }
  protected handleOther(headers: any) {
    if (sessionStorage.getItem('token')) {
      headers['token'] = sessionStorage.getItem('token')
    }
  }
}

export const request = new Fetch(baseUrl, guiguiBaseUrl)
