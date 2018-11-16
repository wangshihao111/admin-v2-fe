import React from 'react'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNumber: ''
    }
  }
  onValueChange(e) {
    let name = e.target.name;
    let value = e.target.value.trim();
    this.setState({
      [name] : value
    })
  }
  onSearch() {
    this.props.onSearch(this.state.orderNumber);
  }
  onKeyUp(e) {
    if (e.keyCode === 13) {
      this.props.onSearch(this.state.orderNumber);
    }
  }
  render() {
    return (
      <div className="row search-wrapper">
        <div className="col-md-12">
          <div className="form-inline">
            <div className="form-group">
              <select className="form-control">
                <option value="productId">按订单号查询</option>
              </select>
            </div>
            <div className="form-group">
              <input type="text"
                name="orderNumber"
                className="form-control"
                placeholder="订单号"
                onChange={e => this.onValueChange(e)}
                onKeyUp={e => this.onKeyUp(e)}
              />
            </div>
            <button className="btn btn-primary" onClick={e => this.onSearch()}>搜索</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Search