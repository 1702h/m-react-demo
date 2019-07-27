import React from 'react';
import { withRouter } from 'react-router-dom'
import { Button, Input, message, Modal, Table } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars'
import Api from '../../api/index.js'
import * as keyCode from '../../api/keyCode.js'
import './index.css'

const { TextArea } = Input;
class Article extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addArticleModalVisible: false,
      addHeaderImageModal: false,
      articleTitle: '',
      headerImagePath: '',
      htmlJson: {
      },
      articleTextArea: '',
      list: [],
    }
  }
  render() {
    let {
      addArticleModalVisible,
      addHeaderImageModal,
      articleTitle,
      headerImagePath,
      htmlJson,
      articleTextArea,
      list,
    } = this.state
    let columns = this.renderColumns()
    return (
      <div className="m-content">
        <Scrollbars>
          <div className="m-content-inner">
            <div>创建自己的文章</div>
            
            <div className="m-login-row">
              <Button onClick={this.handleShowAddArticleModal.bind(this)}>添加文章</Button>
            </div>       
            <div>
              <Table 
                columns={columns} 
                dataSource={list} 
                rowKey="uid"
                scroll={{ x: 900 }}
                ></Table>                     
            </div> 
          </div>
          <Modal
            title="添加文章"
            visible={addArticleModalVisible}
            onOk={this.handleAddArticle.bind(this)}
            onCancel={this.handleHideModal.bind(this)}>
            <div className="m-row">
              <Input 
                type="text" 
                value={articleTitle}
                placeholder="请输入文章标题"
                onChange={this.handleInput.bind(this, 'articleTitle')}></Input>
            </div>         
          </Modal>          
          <Modal
            title="添加顶部图片"
            visible={addHeaderImageModal}
            onOk={this.handleAddHeaderImage.bind(this)}
            onCancel={this.handleHideModal.bind(this)}>
            <div className="m-row">
              <Input 
                type="text" 
                value={articleTitle}
                placeholder="请输入文章标题"
                onChange={this.handleInput.bind(this, 'articleTitle')}></Input>
            </div>                
            <div className="m-row">
              <Input 
                type="text" 
                value={headerImagePath}
                placeholder="请输入顶部图片地址"
                onChange={this.handleInput.bind(this, 'headerImagePath')}></Input>
            </div>          
          </Modal>           
        </Scrollbars>        
			</div>
    );
  }
}

//生命周期
Object.assign(Article.prototype, {
  renderColumns () {
    return [
      {
        title: 'ID',
        dataIndex: 'uid',
      },
      {
        title: '标题',
        dataIndex: 'title',
        width: 100,
      },       
      {
        title: '文章路径',
        dataIndex: 'path',
        key: 'path',
      },
      {
        title: '操作',
        fixed: 'right',   
        width: 150,
        render: (text, record, index) => {
          return <div>
            <Button onClick={this.handleEditArticle.bind(this, record)}>编辑文章</Button>
          </div>
        }
      }                     
    ]
  },   
  componentDidMount() {
    this.getArticleList()
  }
})

//事件
Object.assign(Article.prototype, {
  handleShowAddArticleModal() {
    this.setState({
      addArticleModalVisible: true,
      articleTitle: ''
    })
  },
  handleShowAddHeaderImageModal() {
    let {htmlJson} = this.state
    this.setState({
      addHeaderImageModal: true,
      headerImagePath: htmlJson.headerImagePath
    })
  },
  handleHideModal() {
    this.setState({
      addArticleModalVisible: false,
      addHeaderImageModal: false
    })
  },
  handleAddHeaderImage() {
    let {htmlJson, articleTitle, headerImagePath} = this.state
    htmlJson.headerImagePath = headerImagePath
    htmlJson.articleTitle = articleTitle
    this.setState({
      htmlJson
    })
    this.handleHideModal()
  },
  handleSave() {
    try {
      // let {articleTitle, htmlJson} = this.state
      // if (typeof htmlJson === 'string') {
      //   let obj = JSON.parse(htmlJson)
      //   obj.articleTitle = articleTitle
      //   this.setState({
      //     htmlJson: obj
      //   })
      // }
      let { articleTextArea } = this.state
      let articleObj = JSON.parse(articleTextArea)
      console.log(articleObj)
    } catch(err) {
      throw err
    }
  },
  handleAddArticle() {
    let {articleTitle} = this.state
    let htmlJson = {
      articleTitle
    }
    let data = {
      htmlJson
    }
    Api.addArticle(data).then((res) => {
      console.log(res)
      this.getArticleList()
      this.handleHideModal()
    })
  },
  getArticleList() {
    Api.getArticleList().then((res) => {
      if (res.code = keyCode.SUCCESS) {
        this.setState({
          list: res.data.list
        })
      }
    })
  },
  handleEditArticle(record) {
    this.props.history.push(`/management/edit_article/${record.uid}`)
  }
})

//受控组件
Object.assign(Article.prototype, {
  handleInput(field, e) {
    this.setState({
      [field]: e.target.value
    })
  },
})

export default withRouter(Article)
