import React from 'react';
import { withRouter } from 'react-router-dom'
import { Button, Input, message, Modal, Table } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars'
import Api from '../../api/index.js'
import * as keyCode from '../../api/keyCode.js'
import './index.css'

const { TextArea } = Input;
class EditArticle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articleId: '',
      fileName: '',
      articlePath: '',
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
      articleId,
      fileName,
      articlePath,
      addHeaderImageModal,
      articleTitle,
      headerImagePath,
      articleTextArea,
    } = this.state
    return (
      <div className="m-content">
        <Scrollbars>
          <div className="m-content-inner">
            <div>
              <Button onClick={this.handleGoBack.bind(this)}>返回文章列表</Button>
            </div>
            <div className="m-edit-article-title">编辑文章</div>
            <div>
              <div>文章ID: {articleId}</div>
              <div>文件名: {fileName}</div>
              <div>文章链接: <a href={articlePath} target="_blank">{articlePath}</a></div>
            </div>
            
            <div className="m-login-row">
              <Button onClick={this.handleShowAddHeaderImageModal.bind(this)}>添加顶部图片</Button>
            </div>    
            <div className="m-article-textarea-wrap">
              <TextArea 
                rows={10} 
                value={articleTextArea}
                onChange={this.handleInput.bind(this, 'articleTextArea')}
                />
            </div>   
            <div className="m-login-row">
              <Button onClick={this.handleEditArticle.bind(this)}>保存</Button>
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

//生命周期
Object.assign(EditArticle.prototype, { 
  componentDidMount() {
    this.getArticleById()
  }
})

//事件
Object.assign(EditArticle.prototype, {
  handleGoBack() {
    this.props.history.push('/management/article')
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
  getArticleById() {
    let {match} = this.props
    let articleId = match.params.id
    this.setState({
      articleId
    })
    Api.getArticleDetail(`?id=${articleId}`).then((res) => {
      console.log(res)
      if (res.code === keyCode.SUCCESS) {
        let articleTextArea = JSON.stringify(res.data[0].content, null, 2)
        this.setState({
          fileName: res.data[0].file_name,
          articlePath: res.data[0].path,
          articleTextArea
        })
      }
    })
  },
  handleEditArticle() {
    let {articleId, fileName, articleTextArea} = this.state
    let htmlJson = JSON.parse(articleTextArea)
    let title = ''
    if (htmlJson.articleTitle) {
      title = htmlJson.articleTitle
    }
    let data = {
      articleId,
      title,
      fileName,
      htmlJson,
    }
    Api.editArticle(data).then((res) => {
      console.log(res)
    })
  }
})

//受控组件
Object.assign(EditArticle.prototype, {
  handleInput(field, e) {
    this.setState({
      [field]: e.target.value
    })
  },
})

export default withRouter(EditArticle)
