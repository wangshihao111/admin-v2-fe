import React from 'react';
import { Link } from 'react-router-dom'
import Mutil from 'util/mm.js'
import User from 'service/user-service.js'

const _mm = new Mutil();
const _user = new User()

class TopNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: _mm.getStorage('userInfo').username || '',
    }
    this.onLogout = this.onLogout.bind(this)
  }
  onLogout() {
    _user.logout().then(res => {
      _mm.removeStorage('userInfo')
      window.location.href = '/login'
    }, err => {
      _mm.errorTips(err)
    })
  }
  render() {
    return (
      <div className="navbar navbar-default top-navbar">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/"><b>HAPPYMALL</b></Link>
        </div>
        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
            <a className="dropdown-toggle" href="javascript:;">
              <i className="fa fa-user fa-fw"></i>
              {
                this.state.username ? <span>欢迎, {this.state.username}</span> : 
                <span>请登录</span>
              }
              <i className="fa fa-caret-down"></i>
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li>
                <a onClick={this.onLogout}>
                  <i className="fa fa-sign-out fa-fw"></i>
                  <span>退出登录</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}

export default TopNav
