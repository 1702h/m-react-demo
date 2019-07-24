import React from 'react';
import { withRouter } from 'react-router-dom'
import { Button, Input, message } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars'
import Api from '../../api/index.js'
import * as keyCode from '../../api/keyCode.js'
import './index.css'

class Article extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    let { count } = this.props
    let {
      username,
      password,
      email,
    } = this.state
    return (
      <div className="m-content">
        <Scrollbars>
          <div className="m-content-inner">
            <div>创建自己的文章</div>
            <div className="m-login-row">
              <Button onClick={this.handleArticle.bind(this)}>创建</Button>
            </div>            
          </div>
        </Scrollbars>        
			</div>
    );
  }
}

Object.assign(Article.prototype, {
  handleArticle() {

  }
})

//受控组件
Object.assign(Article.prototype, {
  handleInput(field, e) {
    this.setState({
      [field]: e.target.value
    })
  }
})

export default withRouter(Article)
