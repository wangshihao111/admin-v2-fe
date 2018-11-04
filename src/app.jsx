import React from 'react'
import ReactDom from 'react-dom'
import { HashRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import Home from 'page/home/home.jsx'
import Layout from 'components/layout/index.jsx'

//import 'font-awesome/css/font-awesome.min.css'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/product" component={Home}/>
            <Route exact path="/product-category" component={Home}/>
          </Switch>
        </Layout>
      </Router>
    )
  }
}

ReactDom.render(
  <App/>,
  document.getElementById('app')
)