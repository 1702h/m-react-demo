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
      addHeaderImageModal: false,
      articleTitle: '',
      headerImagePath: '',
      htmlJson: {
      },
      list: [],
    }
  }
  render() {
    let {
      addHeaderImageModal,
      articleTitle,
      headerImagePath,
      htmlJson,
      list,
    } = this.state
    let columns = this.renderColumns()
    return (
      <div className="m-content">
        <Scrollbars>
          <div className="m-content-inner">
            <div>创建自己的文章</div>
            <div className="m-login-row">
              <Button onClick={this.handleShowAddHeaderImageModal.bind(this)}>添加顶部图片</Button>
            </div>    
            <div className="m-article-textarea-wrap">
              <TextArea 
                rows={10} 
                value={JSON.stringify(htmlJson, null, 2)}
                />
            </div>   
            <div className="m-login-row">
              <Button onClick={this.handleAddArticle.bind(this)}>添加文章</Button>
              <Button onClick={this.handleSave.bind(this)}>更新文章</Button>
            </div>    
            <div>
              <Table 
              columns={columns} 
              dataSource={list} 
              rowKey="uid"></Table>                     
            </div> 
          </div>
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

Object.assign(Article.prototype, {
  renderColumns () {
    return [
      {
        title: '标题',
        dataIndex: 'title'
      },       
      {
        title: '文章路径',
        dataIndex: 'path',
        key: 'path',
      }              
    ]
  },   
  componentDidMount() {
    this.getArticleList()
  }
})

Object.assign(Article.prototype, {
  handleShowAddHeaderImageModal() {
    let {htmlJson} = this.state
    this.setState({
      addHeaderImageModal: true,
      headerImagePath: htmlJson.headerImagePath
    })
  },
  handleHideModal() {
    this.setState({
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
      let {articleTitle, htmlJson} = this.state
      if (typeof htmlJson === 'string') {
        let obj = JSON.parse(htmlJson)
        obj.articleTitle = articleTitle
        this.setState({
          htmlJson: obj
        })
      }
    } catch(err) {
      throw err
    }
  },
  handleAddArticle() {
    let {htmlJson} = this.state
    this.handleSave()
    let data = {
      htmlJson
    }
    Api.addArticle(data).then((res) => {
      console.log(res)
      this.getArticleList()
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
  }
})

//受控组件
Object.assign(Article.prototype, {
  handleInput(field, e) {
    this.setState({
      [field]: e.target.value
    })
  },
  handleTextArea(field, e) {
    this.setState({
      [field]: e.target.value
    })
  }
})

export default withRouter(Article)
