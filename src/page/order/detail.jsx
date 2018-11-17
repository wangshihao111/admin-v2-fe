import React from 'react'
import PageTitle from 'components/page-title/page-title.jsx'
import MUtil from 'util/mm.js'
import orderService from 'service/order-service'
import TableList from 'util/table-list/table-list.jsx'
import './detail.scss'

const _mm = new MUtil()
const _order = new orderService()

class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNumber: this.props.match.params.orderNumber,
      orderInfo: {}
    }
  }
  componentDidMount() {
    this.loadOrderDetail()
  }
  loadOrderDetail() {
    // 有id时为编辑功能， 需要加载商品信息
    _order.getOrderDetail(this.state.orderNumber).then(res => {
      this.setState({
        orderInfo: res
      });
    }, err => {
      _mm.errorTips(err);
    });
  }
  onSendGoods(e) {
    if (window.confirm('是否该订单已经发货？')) {
      _order.sendGoods(this.state.orderNumber).then(res => {
        _mm.successTips('发货成功');
        this.loadOrderDetail()
      }, err => {
        _mm.errorTips(err)
      })
    }
  }
  render() {
    let receiverInfo = this.state.orderInfo.shippingVo || {};
    let productList = this.state.orderInfo.orderItemVoList || [];
    let tableHeader = [
      {name: '商品图片', width: '10%'},
      {name: '商品信息', width: '45%'},
      {name: '单价', width: '15%'},
      {name: '数量', width: '15%'},
      {name: '合计', width: '15%'},
    ]
    return (
      <div id="page-wrapper">
        <PageTitle title="订单详情"/>
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">订单号</label>
            <div className="col-md-10">
            <p className="form-control-static">{this.state.orderInfo.orderInfo}</p>
            </div>
          </div>
          
          <div className="form-group">
            <label className="col-md-2 control-label">创建时间</label>
            <div className="col-md-10">
              <p className="form-control-static">{this.state.orderInfo.createTime}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">收件人</label>
            <div className="col-md-10">
              <p className="form-control-static">
                {receiverInfo.receiverName}，
                {receiverInfo.receiverProvince} 
                {receiverInfo.receiverReceiveCity} 
                {receiverInfo.receiverAddress} 
                {receiverInfo.receiverMobile || receiverInfo.receiverPhone}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">订单状态</label>
            <div className="col-md-10">
              <p className="form-control-static">
                {this.state.orderInfo.statusDesc}
                {
                  this.state.orderInfo.status === 20 ? 
                    <button onClick={e => this.onSendGoods(e)} className="btn btn-default btn-sm">立即发货</button> : null
                }
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">支付方式</label>
            <div className="col-md-10">
              <p className="form-control-static">
                {this.state.orderInfo.paymentTypeDesc}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">订单金额</label>
            <div className="col-md-10">
              <p className="form-control-static">
                ￥{this.state.orderInfo.payment}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品列表</label>
            <div className="col-md-10">
              <TableList tableHead={tableHeader}>
                {
                  productList.map((product, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <img className="p-img" src={`${this.state.orderInfo.imageHost}/${product.productImage}`} alt={product.productName}/>
                        </td>
                        <td>{product.productName}</td>
                        <td>￥{product.currentUintPrice}</td>
                        <td>{product.quantity}</td>
                        <td>{product.totalPrice}</td>
                      </tr>
                    )
                  })
                }
              </TableList>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default OrderDetail