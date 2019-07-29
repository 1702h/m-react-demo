import React from 'react';
import { withRouter } from 'react-router-dom'
import { Button, Input, message, Modal, Checkbox } from 'antd';
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
      articleTitle: '',
      headerImagePath: '',
      htmlJson: {
      },
      articleTextArea: '',
      paragraph: '',
      isParagraphStrong: false,
      paragraphTitleLevelFirst: '',
      paragraphTitleLevelSecond: '',
      addHeaderImageModal: false,
      addParagraphModal:false,
      addParagraphTitleLevelFirstModal: false,
      addParagraphTitleLevelSecondModal: false,
    }
  }
  render() {
    let {
      articleId,
      fileName,
      articlePath,
      articleTitle,
      headerImagePath,
      articleTextArea,
      paragraph,
      isParagraphStrong,
      paragraphTitleLevelFirst,
      paragraphTitleLevelSecond,
      addHeaderImageModal,
      addParagraphModal,
      addParagraphTitleLevelFirstModal,
      addParagraphTitleLevelSecondModal,
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
              <Button className="m-toolbar-btn" onClick={this.handleShowAddHeaderImageModal.bind(this)}>标题和顶部图片</Button>
              <Button className="m-toolbar-btn" onClick={this.handleShowAddParagraphModal.bind(this)}>添加段落文本</Button>
              <Button className="m-toolbar-btn" onClick={this.handleShowAddParagraphTitleLevelFirstModal.bind(this)}>添加一级段落标题</Button>
              <Button className="m-toolbar-btn" onClick={this.handleShowAddParagraphTitleLevelSecondModal.bind(this)}>添加二级段落标题</Button>
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
          <div>
            <Modal
              title="修改标题和顶部图片"
              visible={addHeaderImageModal}
              onOk={this.handleAddHeaderImage.bind(this)}
              onCancel={this.handleHideModal.bind(this)}>
              <div className="m-row">
                <span className="m-input-label">
                  文章标题
                </span>
                <Input 
                  className="m-input"
                  type="text" 
                  value={articleTitle}
                  placeholder="请输入文章标题"
                  onChange={this.handleInput.bind(this, 'articleTitle')}></Input>
              </div>                
              <div className="m-row">
                <span className="m-input-label">
                  顶部图片链接
                </span>                
                <Input 
                  className="m-input"
                  type="text" 
                  value={headerImagePath}
                  placeholder="请输入顶部图片地址"
                  onChange={this.handleInput.bind(this, 'headerImagePath')}></Input>
              </div>          
            </Modal>  
            <Modal
              title="添加段落"
              visible={addParagraphModal}
              onOk={this.handleAddParagraph.bind(this)}
              onCancel={this.handleHideModal.bind(this)}>
              <div className="m-row">
                <span className="m-input-label">
                  文本是否加粗
                </span>
                <Checkbox 
                  className="m-checkbox"
                  checked={isParagraphStrong} 
                  onChange={this.handleCheckbox.bind(this, 'isParagraphStrong')}>加粗</Checkbox>
              </div>
              <div className="m-row">
                <span className="m-input-label">
                  段落文本
                </span>                
                <TextArea 
                  className="m-input"
                  type="text" 
                  rows={6}
                  value={paragraph}
                  placeholder="请输入段落文本"
                  onChange={this.handleInput.bind(this, 'paragraph')}></TextArea>
              </div>          
            </Modal> 
            <Modal
              title="添加一级段落标题"
              visible={addParagraphTitleLevelFirstModal}
              onOk={this.handleAddParagraphTitleLevelFirst.bind(this)}
              onCancel={this.handleHideModal.bind(this)}>
              <div className="m-row">
                <span className="m-input-label">
                  一级段落标题
                </span>                
                <Input 
                  className="m-input"
                  type="text" 
                  value={paragraphTitleLevelFirst}
                  placeholder="请输入一级段落标题"
                  onChange={this.handleInput.bind(this, 'paragraphTitleLevelFirst')}></Input>
              </div>          
            </Modal>  
            <Modal
              title="添加二级段落标题"
              visible={addParagraphTitleLevelSecondModal}
              onOk={this.handleAddParagraphTitleLevelSecond.bind(this)}
              onCancel={this.handleHideModal.bind(this)}>
              <div className="m-row">
                <span className="m-input-label">
                  二级段落标题
                </span>                
                <Input 
                  className="m-input"
                  type="text" 
                  value={paragraphTitleLevelSecond}
                  placeholder="请输入二级段落标题"
                  onChange={this.handleInput.bind(this, 'paragraphTitleLevelSecond')}></Input>
              </div>          
            </Modal>                         
          </div>         
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

//对话框相关
Object.assign(EditArticle.prototype, {
  handleShowAddHeaderImageModal() {
    let {htmlJson} = this.state
    this.setState({
      addHeaderImageModal: true,
      articleTitle: htmlJson.articleTitle,
      headerImagePath: htmlJson.headerImagePath,
    })
  },
  handleShowAddParagraphModal(){
    this.setState({
      addParagraphModal: true,
      paragraph: '',
      isParagraphStrong: false,
    })
  },
  handleShowAddParagraphTitleLevelFirstModal() {
    this.setState({
      addParagraphTitleLevelFirstModal: true,
      paragraphTitleLevelFirst: '',
    })
  },
  handleShowAddParagraphTitleLevelSecondModal() {
    this.setState({
      addParagraphTitleLevelSecondModal: true,
      paragraphTitleLevelSecond: '',
    })
  },
  handleHideModal() {
    this.setState({
      addHeaderImageModal: false,
      addParagraphModal: false,
      addParagraphTitleLevelFirstModal: false,
      addParagraphTitleLevelSecondModal: false,
    })
  },
})



//顶部图片、段落、段落一级标题、段落二级标题
Object.assign(EditArticle.prototype, {
  handleAddHeaderImage() {
    let {htmlJson, articleTitle, headerImagePath} = this.state
    htmlJson.headerImagePath = headerImagePath
    htmlJson.articleTitle = articleTitle
    this.setState({
      htmlJson,
    })
    this.formatTextAreaString(htmlJson)
    this.handleHideModal()
  },
  handleAddParagraph() {
    let {htmlJson, paragraph, isParagraphStrong } = this.state
    if (!htmlJson.list) {
      htmlJson.list = []
    }
    htmlJson.list.push({
      type: isParagraphStrong ? 'p-strong' : 'p',
      text: paragraph
    })    

    this.setState({
      htmlJson
    })
    this.formatTextAreaString(htmlJson)
    this.handleHideModal()
  },
  handleAddParagraphTitleLevelFirst() {
    let {htmlJson, paragraphTitleLevelFirst } = this.state
    if (!htmlJson.list) {
      htmlJson.list = []
    }
    htmlJson.list.push({
      type: 'title-level-1',
      text: paragraphTitleLevelFirst
    })    

    this.setState({
      htmlJson
    })
    this.formatTextAreaString(htmlJson)
    this.handleHideModal()
  },
  handleAddParagraphTitleLevelSecond() {
    let {htmlJson, paragraphTitleLevelSecond } = this.state
    if (!htmlJson.list) {
      htmlJson.list = []
    }
    htmlJson.list.push({
      type: 'title-level-2',
      text: paragraphTitleLevelSecond
    })    

    this.setState({
      htmlJson
    })
    this.formatTextAreaString(htmlJson)
    this.handleHideModal()
  }
})

//工具
Object.assign(EditArticle.prototype, {
  formatTextAreaString(htmlJson) {
    let articleTextArea = JSON.stringify(htmlJson, null, 2)
    this.setState({
      articleTextArea,
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
  handleCheckbox(field, e) {
    this.setState({
      [field]: e.target.checked
    })
  },
})

export default withRouter(EditArticle)
