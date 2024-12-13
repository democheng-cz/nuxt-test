import jsrsasign from 'jsrsasign'

const priK = `-----BEGIN PRIVATE KEY-----
    MIICeQIBADANBgkqhkiG9w0BAQEFAASCAmMwggJfAgEAAoGBAK5eOnCsq8RGu0EV
    /2Ojott5txP7FKf2Bvo/f4rjZm8G8rgtMqFoXwxl4wpvvo3M1m8yUp2P+O2P5fro
    zpQwXcmah16W0PHQUv1qpYutxFZoNrhjsO5X8t9ROUyRhggmF19dFDH/Cuc46K5b
    FfgFqmdH84nwo5k24xWIP20r9xIZAgMBAAECgYEAmyv78d2YFlmjtq4u0qsC+TH9
    /OgKX9aQKw9rH1xzAgc65TBDyGQrgcsCG32KJILPqbEs2E8RhcfzMDER9cp9Cr2Q
    5CW492Fc4SNrRESEaOw0Qg9N79KAtIAL/qXuxaQg0FMpuddvG55na4m7LKgw6+Gv
    ChJgaakKSrDukcje2qECQQDhEW4cacy7QWDGuPs4M+QvNEdJ4yEU2KzyNDBZQbPB
    CRUZdsVIFoxhtcZsfmjNzEJS7cP37r3AhnJweNY0CaEtAkEAxlUFGxGJlwMdpOoQ
    TnpTcPywxFVDZavOn2Jh6BecsYJBtrAXxjL+/5pz59sDsKPleYAHVSVHb5E2/Blq
    PiEQHQJBAKPjN1UFTYmFf9z00ioIzz34SXjqJSqy5KyxiAtWpngIDw8tx1ZI5Qw5
    ezWBjvtco2cTr8GYXSAWRrrTotbdtDkCQQDCtnOFyKjxFkEDSDxsH5JN6fdNOXwq
    lAsN1VPTvWK7rur/BVDB6A0LOkKyjQXJZI8EwtnwEOJaORHnXLg+eM1NAkEAvhZE
    hBRKMXAF1FzJLjKgJw/ibc+nle0Bz6qX4/bd2BlzyZyIEC/hLKZwBOv8ZMZJTJAH
    zrsdbU5HAqvhp0JpKA==
    -----END PRIVATE KEY-----`
export function calcKeyByRSA(newStr: any) {
  console.log(newStr)

  const newStrtemp: string = JSON.stringify(newStr)
  // newStr = calcRsaKey(newStrtemp)
  console.log(newStr)

  // 将密钥转码
  const rsa = jsrsasign.KEYUTIL.getKey(priK)
  const sig = new jsrsasign.KJUR.crypto.Signature({ alg: 'SHA256withRSA' })
  // 初始化
  sig.init(rsa)
  // 传入待加密字符串
  sig.updateString(newStrtemp)
  // 生成密文
  let sign = jsrsasign.hextob64(sig.sign())
  console.log(sign)

  // 对加密后内容进行URI编码
  sign = encodeURIComponent(sign)
  //把参数与密文拼接好，返回
  const params = sign
  return params
}
export function calcRsaKey(obj: any) {
  let str = ''
  const arr = Object.keys(obj)
  // 按键名从小到大排序，验签传参需排序
  const sortArr = arr.sort((a, b) => a.localeCompare(b))
  for (let i = 0; i < sortArr.length; i++) {
    str += `&${sortArr[i]}=${obj[sortArr[i]]}`
  }
  str = str.slice(1)
  return str
}

export function randomString(len: number) {
  len = len || 32
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

export function todayDate() {
  const date = new Date() //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = date.getFullYear() + '年'
  const M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '_'
  const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ''
  const h =
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  const m =
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ''
  ;+''
  const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return M + D
}
