///第一个参数为函数，第二个参数字，为延迟时间
//防抖动函数
export function debounce(func, delay) {
  //timer 延时器
  let timer = null
  return function (...args) {
    //在上一次的delay时间还没有结束时，会进行下一次的调用，且在下一次调用中，延时器被顶掉；直到某个delay结束之后，才调用setTimeOut中的内容
    // console.log(timer);
    //timer作为局部变量在下一次调用中没有被销毁的原因：因为function是一个闭包，对timer有引用，就不会取消
    if(timer) clearTimeout(timer)
    //setTimeOut即使没有延迟时间，也会等一会儿在执行
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

//时间戳格式化
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

//练习
// export function debounce(func, delay) {
//   let timer = null
//   return function (...args) {
//     if(timer) clearTimeout(timer)
//     timer = setTimeout(() => {
//       func.apply(this, args)
//     }, delay)
//   }
// }