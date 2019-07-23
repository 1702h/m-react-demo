import React from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import * as clipboard from "clipboard-polyfill"
import {Table, Button} from 'antd'
import Api from '../../api/index.js'
import * as keyCode from '../../api/keyCode.js'
import './index.css'

class FileUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      current: 1,
      total: 0,
    }
  }
  render() {
    let {
      list,
      current,
      total,
    } = this.state
    let columns = this.renderColumns()
    return (
      <div className="m-content">
        <div>
          <input type="file" value="" onChange={this.handleUpload.bind(this)}/>
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
    );
  }
}

Object.assign(FileUpload.prototype, {
  renderColumns () {
    return [
      {
        title: '图片',
        dataIndex: 'path',
        render: (text, record, index) => {
          return <img src={text} className="m-upload-img"></img>
        }
      },       
      {
        title: '路径',
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
      }      
    ]
  },
  componentDidMount() {
    this.getUploadList()
  }
})


//事件
Object.assign(FileUpload.prototype, {
  handleUpload(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    const params = `/upload`
    axios({
        method: 'post',
        data: data, 
        url: params,
        timeout: 1000 * 60 * 60 * 8
      })
      .then((res) => {
        console.log(res)      
        this.getUploadList()     
      })
      .catch((err) => {
        console.log(err)          
      })
  },
  getUploadList() {
    Api.getUploadList(`?page=1&size=10`).then((res) => {
      console.log(res)
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
    clipboard.writeText(record.path);
  },
  handlePage(current) {
    Api.getUploadList(`?page=${current}&size=10`).then((res) => {
      console.log(res)
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

export default withRouter(FileUpload)
