(function (doc, win) {
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var isPc = false // !(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i).test(navigator.userAgent)
  var recalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return
    // iOS设备，分辨率超过6的按照6来
    // if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    //   if (clientWidth >= 375) {
    //     clientWidth = 375
    //   }
    // } else {
      if (clientWidth >= 750) {
        clientWidth = 750
      }
    // }
    docEl.style.fontSize = (isPc ? 12 : 24 * (clientWidth / 750)) + 'px'
  }
  // isPc && document.documentElement.classList.add('device-pc')
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
