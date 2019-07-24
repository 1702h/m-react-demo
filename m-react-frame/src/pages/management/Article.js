import React from 'react';
import { withRouter } from 'react-router-dom'
import { Button, Input, message, Modal } from 'antd';
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
      headerImagePath: '',
      htmlJson: {
        a: 1
      },
    }
  }
  render() {
    let {
      addHeaderImageModal,
      headerImagePath,
      htmlJson,
    } = this.state
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
                onChange={this.handleTextArea.bind(this, 'htmlJson')} />
            </div>   
            <div className="m-login-row">
              <Button onClick={this.handleAddArticle.bind(this)}>添加文章</Button>
              <Button onClick={this.handleSave.bind(this)}>更新文章</Button>
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
    let {htmlJson, headerImagePath} = this.state
    htmlJson.headerImagePath = headerImagePath
    this.setState({
      htmlJson
    })
    this.handleHideModal()
  },
  handleSave() {
    try {
      let {htmlJson} = this.state
      if (typeof htmlJson === 'string') {
        let obj = JSON.parse(htmlJson)
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
