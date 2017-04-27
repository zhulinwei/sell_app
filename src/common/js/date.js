export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    // 如果是yyyy的话，substr截取4个单位长度，如果是yy的话，substr截取2个单位长度
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {// 正则表达式
    'M+': date.getMonth() + 1, // 月份比较特殊，需要在计算值上+1
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1 ? str : padLeftZero(str)));
    }
  }
  return fmt;
}

function padLeftZero (str) {
  // 补零，如1，应该补成01
  return ('00' + str).substr(str.length);// 先补上00，如001，再substr1个单位，即可得到01
}
