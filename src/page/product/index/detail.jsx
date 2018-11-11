import React from 'react'
import PageTitle from 'components/page-title/page-title.jsx'
import MUtil from 'util/mm.js'
import Product from 'service/product-service'
import CategorySelect from './category-select.jsx'
import './save.scss'

const _mm = new MUtil()
const _product = new Product()

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.pid,
      name: '',
      subtitle: '',
      categoryId: 0,
      parentCategoryId: 0,
      subImages: [],
      price: '',
      stock: '',
      detail: '',
      status: 1 // 商品状态1为在售
    }
  }
  componentDidMount() {
    this.loadProduct()
  }
  loadProduct() {
    // 有id时为编辑功能， 需要加载商品信息
    if (this.state.id) {
      _product.getProduct(this.state.id).then(res => {
        let images = res.subImages.split(',');
        res.subImages = images.map(imgUri => {
          return {
            uri: imgUri,
            url: res.imageHost + imgUri
          }
        });
        this.setState(res);
      }, err => {
        _mm.errorTips(err);
      })
    }
  }
  

  getSubImagesString() {
    return this.state.subImages.map(img => img.url).join(',');
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="添加商品"/>
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">商品名称</label>
            <div className="col-md-3">
            <p className="form-control">{this.state.name}</p>
            </div>
          </div>
          
          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-3">
              <p className="form-control">{this.state.subtitle}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">所属分类</label>
            <CategorySelect
              readOnly
              categoryId={this.state.categoryId}
              parentCategoryId={this.state.parentCategoryId}
              />
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品价格</label>
            <div className="input-group col-md-3">
              <input type="number"
                className="form-control"
                value={this.state.price}
                readOnly
                />
              <span className="input-group-addon">元</span>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品库存</label>
            <div className="input-group col-md-3 ">
              <input type="number"
                className="form-control"
                value={this.state.stock}
                readOnly
              />
              <span className="input-group-addon">件</span>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品图片</label>
            <div className="col-md-10">
              {
                this.state.subImages.length ? this.state.subImages.map((image, index) => {
                  return (
                    <div className="img-con"  key={index}>
                      <img src={image.url} />
                    </div>
                  )
                }) : (<div>暂无图片</div>)
              }
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10">
              <div dangerouslySetInnerHTML={{__html: this.state.detail}}>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductDetail