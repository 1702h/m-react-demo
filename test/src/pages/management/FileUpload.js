import React from 'react';
import { withRouter } from 'react-router-dom'
import { Button, Input, message, Table } from 'antd';
import * as clipboard from "clipboard-polyfill"
import axios from 'axios'
import { Scrollbars } from 'react-custom-scrollbars'
import Api from '../../api'
import * as keyCode from '../../api/keyCode.js'
import './index.css'

const { TextArea } = Input;
class FileUpload extends React.Component {
  constructor(props) {
    super(props)
    this.data = {
      "param.code.name": "姓名",
      "param.code.nickname": "昵称",
    }
    this.state = {
      list: [],
      current:1,
      total: 0,
    }
  }
  render() {
    let {
      list,
      current,
      total,
    } = this.state
    let columns = [
      {
        title: '图片',
        dataIndex: 'path',
        key: 'path',
        render: (text, record, index) => {
          return <span><img src={text} className="m-upload-img"></img></span>
        }        
      },
      {
        title: '名称',
        dataIndex: 'originalname',
        key: 'originalname',
      },    
      {
        title: '操作',
        render: (text, record, index) => {
          return <div>
            <Button onClick={this.handleCopy.bind(this, record)} >复制链接</Button>
          </div>
        }
      },         
    ]
    return (
      <div className="m-content">
        <Scrollbars>
          <div className="m-content-inner">
            <div>
              <input type='file' onChange={this.handleUpload.bind(this)}></input>
            </div>
            <div>
              <Table
                columns={columns}
                dataSource={list} 
                rowKey="uid"
                pagination={ total > 10 ? {
                  total: total,
                  current: current,
                  pageSize: 10,
                  onChange: this.handlePage.bind(this)
                } : false}></Table>              
            </div>
          </div>
        </Scrollbars>
      </div>
    );
  }
}

Object.assign(FileUpload.prototype, {
  componentDidMount() {
    this.getList()
  }
})

Object.assign(FileUpload.prototype, {
  handleUpload(e) {
    const data = new FormData();
    data.append('image', e.target.files[0]);
    axios({
      url: '/upload',
      method: 'post',
      data: data
    }).then((res) => {
      console.log(res)
      this.getList()
    }).catch((e) => {
      console.log(e)
    })
  },
  getList() {
    Api.getUploadList(`?page=1&size=10`).then((res) => {
      if (res.code === keyCode.SUCCESS) {
        this.setState({
          list: res.data.list,
          current: 1,
          total: res.data.total
        })
      }
    })
  },
  handleCopy(record) {
    clipboard.writeText(record.path)
    message.info('复制成功')
  },
  handlePage(current) {
    Api.getUploadList(`?page=${current}&size=10`).then((res) => {
      if (res.code === keyCode.SUCCESS) {
        this.setState({
          list: res.data.list,
          current: current,
          total: res.data.total
        })
      }
    })    
  }
})

//受控组件
Object.assign(FileUpload.prototype, {
  handleInput(field, e) {
    this.setState({
      [field]: e.target.value
    })
  }
})

export default withRouter(FileUpload)
