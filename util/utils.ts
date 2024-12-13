// 切割参数
export function getParams(str: string, edSeperator = '&', seperator = '=') {
  let result = {} as { [key: string]: any }
  str.split(edSeperator).forEach((item) => {
    let kv = item.split(seperator)
    result[kv[0]] = kv[1]
  })
  return result
}
