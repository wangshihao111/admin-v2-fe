import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch, Link } from 'react-router-dom';

import ProductList from 'page/product/index/index.jsx';
import ProductSave from './index/save.jsx';
import ProductDetail from './index/detail.jsx'
import CatagoryList from 'page/product/category/category.jsx';
import CategoryAdd from './category/add.jsx'

class ProductRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/product/index" component={ProductList}></Route>
        <Route path="/product/save/:pid?" component={ProductSave}></Route>
        <Route path="/product/detail/:pid" component={ProductDetail}></Route>
        <Route path="/product-category/index/:cid" component={CatagoryList}></Route>
        <Route path="/product-category/index" component={CatagoryList}></Route>
        <Route path="/product-category/add" component={CategoryAdd}></Route>
        <Redirect exact from="/product" to="/product/index"/>
        <Redirect exact from="/product-category" to="/product-category/index"/>
      </Switch>
    )
  }
}

export default ProductRouter