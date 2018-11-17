import React from 'react'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: 'productId',
      searchKeyword: ''
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
    this.props.onSearch(this.state.searchType, this.state.searchKeyword);
  }
  onKeyUp(e) {
    if (e.keyCode === 13) {
      this.props.onSearch(this.state.searchType, this.state.searchKeyword);
    }
  }
  render() {
    return (
      <div className="row search-wrapper">
        <div className="col-md-12">
          <div className="form-inline">
            <div className="form-group">
              <select name="searchType" className="form-control" onChange={e => this.onValueChange(e)}>
                <option value="productId">按商品ID查询</option>
                <option value="productName">按商品名称查询</option>
              </select>
            </div>
            <div className="form-group">
              <input type="text"
                name="searchKeyword"
                className="form-control"
                placeholder="关键词"
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