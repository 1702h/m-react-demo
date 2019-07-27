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
      addHeaderImageModal: false,
      articleTitle: '',
      headerImagePath: '',
      htmlJson: {
      },
      articleTextArea: '',
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
            
            <div className="m-article-toolbar">
              <Button onClick={this.handleShowAddHeaderImageModal.bind(this)}>标题和顶部图片</Button>
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
            title="修改标题和顶部图片"
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
          articleTextArea,
          htmlJson: res.data[0].content
        })
      }
    })
  },
  handleEditArticle() {
    let {articleId, fileName, articleTextArea} = this.state
    let htmlJson
    try {
      htmlJson = JSON.parse(articleTextArea)
    } catch (err) {
      console.log(err)
      message.info('文本框里输入的json格式不对！')
      return
    }
    
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
      if (res.code === keyCode.SUCCESS) {
        this.setState({
          htmlJson
        })
        message.info('编辑成功')
      }
    })
  }
})

//对话框
Object.assign(EditArticle.prototype, {
  handleShowAddHeaderImageModal() {
    let {htmlJson} = this.state
    this.setState({
      addHeaderImageModal: true,
      articleTitle: htmlJson.articleTitle,
      headerImagePath: htmlJson.headerImagePath,
    })
  },
  handleHideModal() {
    this.setState({
      addHeaderImageModal: false
    })
  },
})

//顶部图片
Object.assign(EditArticle.prototype, {
  handleAddHeaderImage() {
    let {htmlJson, articleTitle, headerImagePath} = this.state
    htmlJson.headerImagePath = headerImagePath
    htmlJson.articleTitle = articleTitle
    let articleTextArea = JSON.stringify(htmlJson, null, 2)
    this.setState({
      htmlJson,
      articleTextArea,
    })
    this.handleHideModal()
  },
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
