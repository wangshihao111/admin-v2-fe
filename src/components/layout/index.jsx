import React from 'react';
import TopNav from 'components/top-nav/top-nav.jsx';
import SideNav from 'components/side-nav/side-nav.jsx';
import './theme.css';

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div id="wrapper">
        <TopNav></TopNav>
        <SideNav></SideNav>
        {this.props.children}
      </div>
    )
  }
}

export default Layout
