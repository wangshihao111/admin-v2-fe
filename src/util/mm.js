
class MUtil {
  request(param) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: param.type || 'get',
        url: (param.url || ''),
        dataType: param.dataType || 'json',
        data: param.data || null,
        success: (res) => {
          if (res.status === 0) {
            typeof resolve === 'function' && resolve(res.data, res.msg)
          } else if (res.status === 10) {
            // 未登录
            this.doLogin();
          } else {
            typeof reject === 'function' && reject(res.msg || res.data)
          }
        },
        error: err => {
          typeof reject === 'function' && reject(err.statusText)
          console.log(err);
        }
      })
    })
  }
  doLogin() {
    window.location.href = '/login?redirect' + encodeURIComponent(window.location.pathname)
  }
  // 获取url参数
  getUrlParam(name) {
    // xxx.com?param = 123&param1=2323
    let queryString = window.location.search.substr(1) || ''
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
    let result = queryString.match(reg) // result: [param=123, '', '123', '&']
    return result ? decodeURIComponent(result[2]) : null
  }
  // 错误提示
  errorTips(err) {
    alert(err || '好像哪里不对了~')
  }
  // 本地存储
  setStorage(key, val) {
    let dataType = typeof val
    if (dataType === 'object') {
      window.localStorage.setItem(key, JSON.stringify(val))
    }
    else if ( ['number', 'string', 'boolean'].indexOf(dataType) > -1 ) {
      window.localStorage.setItem(key, val)
    }
    else {
      alert('该类型不能用于LocalStorage')
    }
  }
  getStorage(key) {
    let data = window.localStorage.getItem(key);
    if (data) {
      return JSON.parse(data)
    } else {
      return ''
    }
  }
  removeStorage(key) {
    window.localStorage.removeItem(key)
  }
}

export default MUtil