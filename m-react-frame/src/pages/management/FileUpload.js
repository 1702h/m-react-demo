import React from 'react';
import { withRouter } from 'react-router-dom'
import { Button, Input, message } from 'antd'
import axios from 'axios'
import { jsEncrypt } from '../../utils/index.js'
import Api from '../../api/index.js'
import * as keyCode from '../../api/keyCode.js'
import './index.css'

class FileUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: '',
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
        <div>
          文件上传
        </div>
        <input type="file" value="" onChange={this.handleUpload.bind(this)}/>
        <div className="m-login-row">
          <Button onClick={this.handleRegister.bind(this)}>文件上传</Button>
        </div>
			</div>
    );
  }
}

Object.assign(FileUpload.prototype, {
  handleRegister() {
    let {username, password, email} = this.state
    console.log(username,password)
    let data = {
      username,
      password: jsEncrypt(password),
      email
    }
    
    Api.register(data).then((res) => {
      if (res.code === keyCode.SUCCESS) {
        console.log(res)
        message.info(res.message)
      }
    }).catch((e) => {
    })
  },
  handleUpload(e) {
    console.log(e)
    //e.target.files[0]

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
      })
      .catch((err) => {
        console.log(err)          
      }) 


    // var files = !!this.files ? this.files : [];
    // if (!files.length || !window.FileReader) {
    //     console.log("浏览器不支持HTML5");
    //     return false;   
    // };
    // // 创建一个FormData对象,用来组装一组用 XMLHttpRequest发送请求的键/值对
    // var fd = new FormData();
    // // 把 input 标签获取的文件加入 FromData 中
    // fd.append('file', files[0]);

    // // Ajax
    // var request = new XMLHttpRequest();
    // request.open("POST", "http://localhost:5000/upload");
    // request.send(fd);
    // request.onreadystatechange = function(){
    //     if(request.readyState === 4 & request.status === 200){
    //         console.log("上传成功");
    //         var response = JSON.parse(request.responseText);
    //         console.log(response);
    //     }
    // }  
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
