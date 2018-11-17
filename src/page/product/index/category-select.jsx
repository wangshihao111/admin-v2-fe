import React from 'react'
import './category-select.scss'
import MUtil from 'util/mm.js'
import Product from 'service/product-service'

const _mm = new MUtil()
const _product = new Product()

class CategorySelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstCategoryList: [],
      firstCategoryId: 0,
      secondCategoryList: [],
      secondCategoryId: 0
    }
  }
  componentDidMount() {
    this.loadFirstCategory()
  }
  componentWillReceiveProps(nextProps) {
    let categoryIdChange = this.props.categoryId !== nextProps.categoryId;
    let parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
    if (!categoryIdChange && !parentCategoryIdChange) {
      return;
    }
    if (nextProps.parentCategoryId === 0) {
      this.setState({
        firstCategoryId: nextProps.categoryId,
        secondCategoryId: 0
      })
    } else {
      this.setState({
        firstCategoryId: nextProps.parentCategoryId,
        secondCategoryId: nextProps.categoryId
      }, () => {
        parentCategoryIdChange && this.loadSecondCategory()
      })
    }
  }
  loadFirstCategory() {
    _product.getCategoryList().then(res => {
      this.setState({
        firstCategoryList: res
      })
    }, err => {
      _mm.errorTips(err);
    })
  }
  loadSecondCategory() {
    _product.getCategoryList(this.state.firstCategoryId).then(res => {
      this.setState({
        secondCategoryList: res
      })
    }, err => {
      _mm.errorTips(err);
    })
  }
  // 一级分类选择后触发
  onFirstCategoryChange(e) {
    if (this.props.readOnly) {
      return;
    }
    let newVal = e.target.value || 0;
    this.setState({
      firstCategoryId: newVal,
      secondCategoryId: 0,
      secondCategoryList: []
    }, () => {
      this.loadSecondCategory(),
      this.onPropsCategoryChange();
    })
  }
  onSecondCategoryChange(e) {
    if (this.props.readOnly) {
      return;
    }
    let newVal = e.target.value || 0;
    this.setState({
      secondCategoryId: newVal
    }, () => {
      this.onPropsCategoryChange();
    })
  }
  // 状态提升
  onPropsCategoryChange() {
    let hasProp = typeof this.props.onCategoryChange === 'function';
    if (hasProp && this.state.secondCategoryId) {
      this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
    } else if (hasProp && this.state.firstCategoryId) {
      this.props.onCategoryChange(this.state.firstCategoryId, 0);
    }
  }
  render() {
    return (
      <div>
        <div className="col-md-10">
          <select className="form-control cate-select"
            value={this.state.firstCategoryId}
            readOnly={this.props.readOnly}
            onChange={e => this.onFirstCategoryChange(e)}>
            <option value="">请选择一级分类</option>
            {
              this.state.firstCategoryList.map((cate, index) => {
                return <option key={index} value={cate.id}>{cate.name}</option>
              })
            }
          </select>
          { this.state.secondCategoryList.length ? 
            <select className="form-control cate-select"
              value={this.state.secondCategoryId}
              readOnly={this.props.readOnly}
              onChange={e => this.onSecondCategoryChange(e)}>
              <option value="">请选择二级分类</option>
              {
                this.state.secondCategoryList.map((cate, index) => {
                  return <option key={index} value={cate.id}>{cate.name}</option>
                })
              }
            </select> : null
          }
        </div>
      </div>
    )
  }
}

export default CategorySelect