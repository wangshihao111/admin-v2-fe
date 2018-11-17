import React from 'react'
import Simditor from 'simditor'
import 'simditor/styles/simditor.scss'
import './index.scss'

class RichEditor extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.loadEditor();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.defaultDetail == nextProps.defaultDetail) {
      return;
    } else {
      this.editor.setValue(nextProps.defaultDetail);
    }
  }
  loadEditor() {
    let el = this.refs['textarea'];
    this.editor = new Simditor({
      textarea: $(el),
      placeholder: this.props.placeholder || '请输入内容',
      upload: {
        url: '/manage/product/richtext_img_upload.do',
        defaultImage: '',
        fileKey: 'upload_file'
      }
    });
    this.bindEditorEvent();
  }
  // 初始化文本编辑器
  bindEditorEvent() {
    this.editor.on('valuechanged', e => {
      this.props.onValueChange(this.editor.getValue())
    })
  }
  render() {
    return (
      <div className="rich-editor ">
        <textarea ref="textarea"></textarea>
      </div>
    )
  }
}

export default RichEditor