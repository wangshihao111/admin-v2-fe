import React from 'react'
import User from 'service/user-service.js'
import Mutil from 'util/mm.js'
import './login.scss'

const _mm = new Mutil();
const _user = new User()

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      redirect: _mm.getUrlParam('redirect') || '/'
    }
  }
  componentWillMount() {
    document.title = '登录 - MMALL ADMIN'
  }
  onInputChange(e) {
    let value = e.target.value
    let input = e.target.name
    this.setState({
      [input]: value
    })
  }
  onKeyUp(e) {
    if (e.keyCode === 13) {
      this.onSubmit()
    }
  }
  onSubmit(e) {
    let loginInfo = {
      username: this.state.username,
      password: this.state.password
    }
    let checkResult = _user.validateLogin(loginInfo)
    if (checkResult.status === true) {
      _user.login(loginInfo).then(res => {
        _mm.setStorage('userInfo', res)
        this.props.history.push(this.state.redirect)
      }, err => {
        _mm.errorTips(err)
      })
    }
    else {
      _mm.errorTips(checkResult.msg)
    }
  }
  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading">欢迎登录 -- HAPPYMALL</div>
          <div className="panel-body">
            <form>
              <div className="form-group">
                <input type="text"
                       name="username"
                       className="form-control"
                       placeholder="请输入用户名"
                       onChange={e => this.onInputChange(e)}
                       onKeyUp={e => this.onKeyUp(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">密码</label>
                <input type="password"
                    className="form-control"
                    name="password"
                    placeholder="密码"
                    onChange={e => this.onInputChange(e)}
                    onKeyUp={e => this.onKeyUp(e)}
                />
              </div>
              <button type="button"
                className="btn btn-primary btn-lg btn-block"
                onClick={e => this.onSubmit(e)}
              >登录</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login