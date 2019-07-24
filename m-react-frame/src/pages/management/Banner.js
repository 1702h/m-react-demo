import React from 'react';
import { withRouter } from 'react-router-dom'
import { Button, Input, message, Modal, Table} from 'antd';
import { Scrollbars } from 'react-custom-scrollbars'
import { jsEncrypt } from '../../utils/index.js'
import Api from '../../api/index.js'
import * as keyCode from '../../api/keyCode.js'
import './index.css'

class Banner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      path: '',
      remarks: '',
      addBannerVisible: false,
      list: [],
    }
  }
  render() {
    let { count } = this.props
    let {
      path,
      remarks,
      addBannerVisible,
      list,
    } = this.state
    let columns = this.renderColumns()
    return (
      <div className="m-content">
        <Scrollbars>
          <div className="m-content-inner">
            <div className="m-upload-input-wrap">
              <Button onClick={this.handleShowAddBannerModal.bind(this)}>添加</Button>
            </div>
          </div>

          <Table 
            columns={columns} 
            dataSource={list} 
            rowKey="uid"
            pagination={false}></Table>          

          <Modal
            title="添加"
            visible={addBannerVisible}
            onOk={this.handleAddBanner.bind(this)}
            onCancel={this.handleHideModal.bind(this)}
          >
            <div className="m-row">
              <Input 
                type="text" 
                value={path}
                placeholder="请输入图片地址"
                onChange={this.handleInput.bind(this, 'path')}></Input>
            </div>
            <div className="m-row">
              <Input 
                type="text" 
                value={remarks}
                placeholder="请输入备注信息"
                onChange={this.handleInput.bind(this, 'remarks')}></Input>
            </div>            
          </Modal>          
        </Scrollbars>        
			</div>
    );
  }
}

//生命周期
Object.assign(Banner.prototype, {
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
        title: '备注信息',
        dataIndex: 'remarks',
        key: 'remarks',
      },  
      {
        title: '操作',
        render: (text, record, index) => {
          return <div>
            <Button onClick={this.handleDelete.bind(this, record)} >删除</Button>
          </div>
        }
      }                
    ]
  },  
  componentDidMount() {
    this.getList()
  }
})

//事件
Object.assign(Banner.prototype, {
  handleShowAddBannerModal() {
    this.setState({
      addBannerVisible: true,
      path: '',
      remarks: '',
    })
  },
  handleHideModal() {
    this.setState({
      addBannerVisible: false
    })
  },
  handleAddBanner() {
    let {path, remarks} = this.state
    let data = {
      path,
      remarks,
    }
    
    Api.addBanner(data).then((res) => {
      if (res.code === keyCode.SUCCESS) {
        console.log(res)
        message.info(res.message)
        this.handleHideModal()
        this.getList()
      }
    }).catch((e) => {
      this.handleHideModal()
    })
  },
  getList() {
    Api.getBannerList().then((res) => {
      if (res.code === keyCode.SUCCESS) {
        this.setState({
          list: res.data.list
        })
      }
    })
  },
  handleDelete(record) {
    let data = {
      uid: record.uid
    }
    Api.deleteBanner(data).then((res) => {
      if (res.code === keyCode.SUCCESS) {
        this.getList()
      }
    })
  }
})

//受控组件
Object.assign(Banner.prototype, {
  handleInput(field, e) {
    this.setState({
      [field]: e.target.value
    })
  }
})

export default withRouter(Banner)
