import React from 'react'
import PageTitle from 'components/page-title/page-title.jsx';
import Pagination from 'util/pagination/pagination.jsx'
import MUtil from 'util/mm.js'
import UserService from 'service/user-service'
import TableList from 'util/table-list/table-list.jsx'

const _mm = new MUtil()
const _user = new UserService()

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageNum: 1,
      firstLoading: true
    }
  }
  componentDidMount() {
    this.loadUserList()
  }
  loadUserList() {
    _user.getUserList(this.state.pageNum).then(res => {
      this.setState(res)
    }, err => {
      this.setState({
        list: []
      });
      _mm.errorTips(err)
    });
  }
  onPageNumChange(num) {
    this.setState({
      pageNum: num
    }, () => {
      this.loadUserList()
    });
  }
  render() {
    let listBody = this.state.list.map((user, index) => {
      return (
        <tr key={index}>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{new Date(user.createTime).toLocaleString()}</td>
        </tr>
      )
    });
    return (
      <div id="page-wrapper">
        <PageTitle title="用户"/>
        <TableList tableHead={['ID', '用户名', '邮箱', '电话', '注册时间']}>
          {listBody}
        </TableList>
        <Pagination current={this.state.pageNum}
            total={this.state.total}
            onChange={num => this.onPageNumChange(num)}/>
      </div>
    )
  }
}

export default User