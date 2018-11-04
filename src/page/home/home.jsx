import React from 'react'
import PageTitle from 'components/page-title/page-title.jsx'

class Home extends React.Component {
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="首页">12155</PageTitle>
        <div className="row">
          <div className="col-md-12">
            body
          </div>
        </div>
        <button className="btn btn-default">按钮</button>
      </div>
    )
  }
}

export default Home