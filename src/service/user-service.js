import Mutil from 'util/mm.js'

const _mm = new Mutil();

class User {
  login(loginInfo) {
    return _mm.request({
      type: 'post',
      url: '/manage/user/login.do',
      data: {
        username: loginInfo.username,
        password: loginInfo.password
      }
    })
  }
  logout() {
    return _mm.request({
      type: 'post',
      url: '/user/logout.do',
    })
  }
  // 登录表单验证
  validateLogin(loginInfo) {
    let username = loginInfo.username.replace(/\s/g, ''),
        password = loginInfo.password.replace(/\s/g, '')
    if (typeof username !== 'string' || username.length === 0) {
      return {status: false, msg: '用户名不能为空'}
    }
    if (typeof password !== 'string' || password.length === 0) {
      return {status: false, msg: '密码不能为空'}
    }
    return {status: true, msg: '验证通过'}
  }

  getUserList(pageNum) {
    return _mm.request({
      type: 'post',
      url: '/manage/user/list.do',
      data: {
        pageNum: pageNum
      }
    })
  }
}

export default User