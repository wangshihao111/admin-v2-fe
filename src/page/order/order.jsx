import React, {Component } from 'react'
import { Link } from  'react-router-dom'

import MUtil from 'util/mm.js'
import OrderService from 'service/order-service.js'

import PageTitle from 'components/page-title/page-title.jsx'
import Search from './list-search.jsx'
import TableList from 'util/table-list/table-list.jsx'
import Pagination from 'util/pagination/pagination.jsx'
const _mm = new MUtil();
const _order = new OrderService();

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
      listType: 'list', // list or search,
      orderNumber: ''
    }
  }
  componentDidMount() {
    this.loadOrderList();
  }
  loadOrderList() {
    let listParam = {};
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    if (this.state.listType === 'search') {
      listParam.orderNo = this.state.orderNumber;
    }
    _order.getOrderList(listParam).then(res => {
      this.setState(res)
    }, err => {
      _mm.errorTips(err);
    })
  }
  onSearch(orderNumber) {
    let listType = orderNumber === '' ? 'list' : 'search';
    this.setState({
      listType,
      pageNum: 1,
      orderNumber: orderNumber,
    }, () => {
      this.loadOrderList();
    })
  }
  onPageNumChange(num) {
    this.setState({
      pageNum: num
    }, () => {
      this.loadOrderList()
    });
  }
  render() {
    let tableHeader = ['订单号', '收件人', '订单状态', '订单总价', '创建时间', '操作' ];
    return (
      <div id="page-wrapper">
        <PageTitle title="订单列表"></PageTitle>
          <Search onSearch={(orderNumber) => {this.onSearch(orderNumber)}} />
        <TableList tableHead={tableHeader}>
          {
            this.state.list.map((order, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Link to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
                  </td>
                  <td>{order.receiverName}</td>
                  <td>{order.statusDesc}</td>
                  <td>{order.payment}</td>
                  <td>{order.createTime}</td>
                  <td>
                    <Link to={`/order/detail/${order.orderNo}`}>详情</Link>
                  </td>
                </tr>
              )
            })
          }
        </TableList>
        <Pagination current={this.state.pageNum}
            total={this.state.total}
            onChange={num => this.onPageNumChange(num)}/>
      </div>
    )
  }
}

export default Order