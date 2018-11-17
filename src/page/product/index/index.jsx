import React from 'react'
import PageTitle from 'components/page-title/page-title.jsx';
import Pagination from 'util/pagination/pagination.jsx'
import MUtil from 'util/mm.js'
import Product from 'service/product-service'
import TableList from 'util/table-list/table-list.jsx'
import Search from './search.jsx'
import { Link } from 'react-router-dom'
import './index.scss'

const _mm = new MUtil()
const _product = new Product()

class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageNum: 1,
      listType: 'list',
    }
  }
  componentDidMount() {
    this.loadProductList()
  }
  loadProductList() {
    let listParam = {};
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    if (this.state.listType ==='search') {
      listParam.searchType = this.state.searchType;
      listParam.keyword = this.state.searchKeyword;
    }
    _product.getProductList(listParam).then(res => {
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
      this.loadProductList()
    });
  }
  onSetProductStatus(e, id, status) {
    let CurrentStatus = status === 1 ? 2 : 1;
    let confirmTips = status === 1 ? '确认下架该商品吗？' : '确定上架该商品吗？'
    if (window.confirm(confirmTips)) {
      _product.setProductStatus({
        productId: id,
        status: CurrentStatus,
      }).then(res => {
        _mm.successTips(res);
        this.loadProductList();
      }, err => _mm.errorTips(err));
    }
  }
  onSearch(type, value) {
    let listType = value === '' ? 'list' : 'search';
    this.setState({
      listType,
      pageNum: 1,
      searchType: type,
      searchKeyword: value
    }, () => {
      this.loadProductList();
    })
  }
  render() {
    let tableHeader = [
      {name: '商品ID', width: '10%'},
      {name: '商品信息', width: '10%'},
      {name: '价格', width: '10%'},
      {name: '状态', width: '10%'},
      {name: '操作', width: '10%'},
    ]
    return (
      <div id="page-wrapper">
        <PageTitle title="商品列表">
          <div className="page-header-right">
            <Link className="btn btn-primary" to="/product/save">
              <i className="fa fa-plus"></i><span>添加商品</span>
            </Link>
          </div>
        </PageTitle>
          <Search onSearch={(type, value) => {this.onSearch(type, value)}} />
        <TableList tableHead={tableHeader}>
          {
            this.state.list.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>
                    <p>{product.name}</p>
                    <p>{product.subtitle}</p>
                  </td>
                  <td>￥{product.price}</td>
                  <td>
                    <p>{product.status === 1 ? '在售' : '已下架'}</p>
                    <button className="btn btn-warning btn-xs" onClick={(e) => {this.onSetProductStatus(e,product.id, product.status)}}>{product.status === 1 ? '下架' : '上架'}</button>
                  </td>
                  <td>
                    <Link className="opera" to={`/product/detail/${product.id}`}>详情</Link>
                    <Link className="opera" to={`/product/save/${product.id}`}>编辑</Link>
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

export default ProductList