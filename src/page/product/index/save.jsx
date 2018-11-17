import React from 'react'
import PageTitle from 'components/page-title/page-title.jsx'
import MUtil from 'util/mm.js'
import Product from 'service/product-service'
import CategorySelect from './category-select.jsx'
import FileUploader from 'util/file-uploader/file-uploader.jsx'
import RichEditor from 'util/rich-editor/rich-editor.jsx'
import './save.scss'

const _mm = new MUtil()
const _product = new Product()

class ProductSave extends React.Component {
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
        res.defaultDetail = res.detail;
        this.setState(res);
      }, err => {
        _mm.errorTips(err);
      })
    }
  }
  // 简单字段的改变， 名称、价格、描述、库存
  onValueChange(e) {
    let name = e.target.name;
    let value = e.target.value.trim()
    this.setState({
      [name]: value
    })
  }
  // 品类选择变化
  onCategoryChange(categoryId, parentId) {
    this.setState({
      categoryId: categoryId,
      parentCategoryId: parentId
    })
  }
  //图片上传成功
  onUploadSuccess(res) {
    let subImages = this.state.subImages;
    subImages.push(res)
    this.setState({
      subImages: subImages
    })
  }
  onUploadError(err) {
    _mm.errorTips(err)
  }
  // 删除图片
  onImageDelete(e) {
    let index = parseInt(e.target.getAttribute('index'));
    let subImages = this.state.subImages;
    subImages.splice(index, 1);
    this.setState({
      subImages: subImages
    });
  }
  // 文本编辑器改变
  onEditorChange(val) {
      this.setState({
      detail: val
    })
  }
  getSubImagesString() {
    return this.state.subImages.map(img => img.url).join(',');
  }
  onSubmit(e) {
    let product = {
      name: this.state.name,
      subtitle: this.state.subtitle,
      categoryId: parseInt(this.state.categoryId),
      subImages: this.getSubImagesString(),
      detail: this.state.detail,
      price: parseFloat(this.state.price),
      stock: parseInt(this.state.stock),
      status: this.state.status
    }
    if (this.state.id) {
      product.id = this.state.id;
    }
    let validateResult = _product.validateProduct(product)
    if (validateResult.status) {
      _product.saveProduct(product).then(res => {
        _mm.successTips(res);
        this.props.history.push('/product/index');
      }, err => _mm.errorTips(err));
    } else {
      _mm.errorTips(validateResult.msg)
    }
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title={this.state.id ? '编辑商品' : "添加商品"}/>
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">商品名称</label>
            <div className="col-md-3">
              <input type="text"
                className="form-control"
                placeholder="请输入商品名称"
                name="name"
                value={this.state.name}
                onChange={e => this.onValueChange(e)}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-3">
              <input type="text"
                className="form-control"
                placeholder="添加商品描述" 
                name="subtitle"
                value={this.state.subtitle}
                onChange={e => this.onValueChange(e)}
                />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">所属分类</label>
            <CategorySelect
              categoryId={this.state.categoryId}
              parentCategoryId={this.state.parentCategoryId}
              onCategoryChange={(categoryId, parentId) => {this.onCategoryChange(categoryId, parentId)}}
              />
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品价格</label>
            <div className="input-group col-md-3">
              <input type="number"
                className="form-control"
                placeholder="价格"
                name="price"
                value={this.state.price}
                onChange={e => this.onValueChange(e)}
                />
              <span className="input-group-addon">元</span>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品库存</label>
            <div className="input-group col-md-3 ">
              <input type="number"
                className="form-control"
                placeholder="商品库存"
                name="stock"
                value={this.state.stock}
                onChange={e => this.onValueChange(e)}
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
                      <i className="fa fa-close" index={index} onClick={e => {this.onImageDelete(e)}}></i>
                    </div>
                  )
                }) : (<div>请上传图片</div>)
              }
            </div>
            <div className="col-md-10 col-md-offset-2 file-upload-con">
              <FileUploader onSuccess={res => this.onUploadSuccess(res)}
                onError={err => this.onUploadError(err)}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10">
              <RichEditor 
                detail={this.state.detail}
                defaultDetail={this.state.defaultDetail}
                onValueChange={val => this.onEditorChange(val)}/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-offset-2 col-md-10">
              <button type="submit"
                className="btn btn-primary"
                onClick={e => this.onSubmit(e)}
              >提交</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductSave