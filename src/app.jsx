import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import Home from 'page/home/home.jsx'
import Login from 'page/login/login.jsx'
import Layout from 'components/layout/index.jsx'
import ErrorPage from 'page/error/error.jsx'
import UserList from 'page/user/user.jsx'
import ProductRouter from 'page/product/router.jsx'
// <Route path="/product-category" component={Home} />

class App extends React.Component {
  
  render() {
    let LayoutRouter = (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/product" component={ProductRouter} />
          <Route path="/product-category" component={ProductRouter} />
          <Route path="/user/index" component={UserList} />
          <Redirect exact from="/user" to="/user/index" />
          <Route component={ErrorPage} />
        </Switch>
      </Layout>
    )
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/" render={(props) => (LayoutRouter)}/>
        </Switch>
      </Router>
    )
  }
}

ReactDom.render(
  <App/>,
  document.getElementById('app')
)