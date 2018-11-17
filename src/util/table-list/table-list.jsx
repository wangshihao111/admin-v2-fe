import React from 'react'

class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstLoading: true
    }
  }
  componentWillReceiveProps() {
    // 列表只有在第一次挂在时 isfirstloading为true， 更新时置位false
    this.setState({
      isFirstLoading: false
    });
  }
  render() {
    let tableHead = this.props.tableHead;
    let listBody = this.props.children;
    let listInfo = (
      <tr>
        <td colSpan={tableHead.length} className="text-center">
          {this.state.isFirstLoading ? '正在加载...' : '没有找到相应结果'}
        </td>
      </tr>
    )
    let tableBody = listBody.length ? listBody : listInfo;
    return (
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                {
                  tableHead.map((head, index) => {
                    if (typeof head === 'object') {
                      return <th width={head.width} key={index}>{head.name}</th>
                    } else {
                      return <th key={index}>{head}</th>
                    }
                  })
                }
              </tr>
            </thead>
            <tbody>
              {
                tableBody
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default TableList