import React from 'react'
import FileUpload from './react-file-upload.jsx'

class FileUploader extends React.Component {
  render(){
    const options = {
      baseUrl: '/manage/product/upload.do',
      fileFieldName: 'upload_file',
      dataType: 'json',
      chooseAndUpload: true,
      uploadSuccess: (res) => {
        this.props.onSuccess(res.data)
      },
      uploadError: err => {
        this.props.onError(err.message || '上传图片失败')
      }
    }
    return (
      <FileUpload options={options}>
        <button ref="chooseAndUpload" className="btn btn-default btn-sm">选择图片</button>
      </FileUpload>
    )
  }
}

export default FileUploader