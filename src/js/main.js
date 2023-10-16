// 搜索模块
// let searchEl = document.getElementById('search')
// searchEl.addEventListener('keydown', searchFn)
// console.log('----> searchEl', searchEl)
// function searchFn(e) {
//   if (e.key === 'Enter') {
//     let text = searchEl.value
//     text = text.trim()
//     if (text) location.href = 'https://www.bing.com/search?q=' + text
//   }
// }

// 时间模块
// function addZeroInDate(num) {
//   let str = num.toString()
//   str.length === 1 && (str = '0' + str)
//   return str
// }
// let timeEl = document.getElementById('time')
// setInterval(() => {
//   let date = new Date()
//   let hour = date.getHours()
//   let min = date.getMinutes()
//   let sec = date.getSeconds()
//   timeEl.innerText = `${addZeroInDate(hour)}:${addZeroInDate(min)}:${addZeroInDate(sec)}`
// }, 100)
