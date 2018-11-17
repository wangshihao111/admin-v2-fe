import Mutil from 'util/mm.js'

const _mm = new Mutil();

class Order {
  getOrderList(param) {
    let url = param.listType === 'search' ? '/manage/order/search.do' : "/manage/order/list.do";
    const data = {pageNum: param.pageNum};
    param.listType === 'search' && (data['orderNo'] = param.orderNo);
    return _mm.request({
      type: 'post',
      url,
      data,
    })
  }
  // 获取订单详情
  getOrderDetail(orderNumber) {
    return _mm.request({
      type: 'post',
      url: '/manage/order/detail.do',
      data: {
        orderNo: orderNumber
      },
    })
  }
  sendGoods(orderNumber) {
    return _mm.request({
      type: 'post',
      url: '/manage/order/sendGoods.do',
      data: {
        orderNo: orderNumber
      },
    })
  }
}

export default Order