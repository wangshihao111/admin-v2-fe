import React from 'react'
import {Link} from 'react-router-dom'
import PageTitle from 'components/page-title/page-title.jsx';
import MUtil from 'util/mm.js'
import TableList from 'util/table-list/table-list.jsx'
import Product from 'service/product-service'

const _mm = new MUtil()
const _product = new Product()

class ProductCatagory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parentCategoryId: this.props.match.params.cid || 0,
      list: []
    }
  }
  componentDidMount() {
    this.loadCategoryList()
  }
  componentDidUpdate(prevProps, prevState) {
    let oldPath = prevProps.location.pathname,
      newPath = this.props.location.pathname,
      newId = this.props.match.params.cid || 0;
    if (oldPath !== newPath) {
      this.setState({
        parentCategoryId: newId
      }, () => {
        this.loadCategoryList()
      });
    }
  }
  loadCategoryList() {
    _product.getCategoryList(this.state.parentCategoryId).then(res => {
      this.setState({
        list: res
      });
    }, err => {
      this.setState({
        list: []
      })
      _mm.errorTips(err)
    });
  }
  onUpdateName(id, name) {
    let newName = window.prompt('请输入新的品类名称', name);
    if (newName) {
      _product.updateCategoryName({
        categoryId: id,
        categoryName: newName
      }).then(res => {
        _mm.successTips(res)
        this.loadCategoryList()
      }, err => _mm.errorTips(err));
    }
  }
  render() {
    let listBody = this.state.list.map((category, index) => {
      return (
        <tr key={index}>
          <td>{category.id}</td>
          <td>{category.name}</td>
          <td>
            <a className="operat" onClick={e => this.onUpdateName(category.id, category.name)}>修改名称</a>
            {
              category.parentId === 0 ? <Link to={`/product-category/index/${category.id}`}>查看子品类</Link> : null
            }
          </td>
        </tr>
      )
    });
    return (
      <div id="page-wrapper">
        <PageTitle title="品类列表">
          <div className="page-header-right">
              <Link className="btn btn-primary" to="/product-category/add">
                <i className="fa fa-plus"></i><span>新加品类</span>
              </Link>
          </div>
        </PageTitle>
        <div className="row">
          <div className="col-md-12">
            <p>父品类ID：{this.state.parentCategoryId} </p>
          </div>
        </div>
        <TableList tableHead={['品类ID', '品类名', '操作']}>
          {listBody}
        </TableList>
      </div>
    )
  }
}

export default ProductCatagory