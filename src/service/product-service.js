import Mutil from 'util/mm.js'

const _mm = new Mutil();

class Product {
  getProductList(param) {
    let url = param.listType === 'search' ? '/manage/product/search.do' : "/manage/product/list.do";
    const data = {pageNum: param.pageNum};
    param.listType === 'search' && (data[param.searchType] = param.keyword);
    return _mm.request({
      type: 'post',
      url,
      data,
    })
  }
  // 获取商品信息
  getProduct(id) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/detail.do',
      data: {
        productId: id || 0
      },
    })
  }
  setProductStatus(info) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/set_sale_status.do',
      data: info
    })
  }

  getCategoryList(parentId) {
    return _mm.request({
      type: 'post',
      url: '/manage/category/get_category.do',
      data: {
        categoryId: parentId || 0,
      }
    })
  }

  validateProduct(product) {
    let result = {
      status: true,
      msg: '验证通过'
    }
    if (typeof product.name !== 'string' || product.name.length === 0) {
      return {status: false, msg: '商品名不能为空'}
    }
    if (typeof product.subtitle !== 'string' || product.subtitle.length === 0) {
      return {status: false, msg: '描述不能为空'}
    }
    if (typeof product.categoryId !== 'number' || !(product.categoryId > 0)) {
      return {status: false, msg: '请输入正确商品品类'}
    }
    if (typeof product.price !== 'number' || !(product.price >= 0)) {
      return {status: false, msg: '价格不能小于0'}
    }
    if (typeof product.stock !== 'number' || !(product.stock > 0)) {
      return {status: false, msg: '请输入正确的库存数量'}
    }
    return result;
  }
  saveProduct(product) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/save.do',
      data: product
    });
  }
}

export default Product