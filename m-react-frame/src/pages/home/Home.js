import React from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Button, Input, Select } from 'antd';
import Swiper from 'swiper'
import Api from '../../api/index.js'
import * as keyCode from '../../api/keyCode.js'
import 'swiper/dist/css/swiper.min.css'
import './index.css'

const { Option } = Select
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }
  render() {
    let {
      list
    } = this.state
    let banner = this.renderBanner()
    return (
      <div className="m-home">
        <div id="m-banner" className="swiper-container">
          <div className="swiper-wrapper">
            {banner}
          </div>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>          
        </div>
      </div>
    );
  }
}

//生命周期
Object.assign(Login.prototype, {
  renderBanner() {
    let {list} = this.state
    let arr = []
    for (let i = 0; i < list.length; i++) {
      arr.push(
        <div 
          key={list[i].uid}
          className="swiper-slide" 
          style={{backgroundImage: `url(${list[i].path})`}}>
          </div>
      )
    }
    return arr
  },
  componentDidMount() {
    this.getList()
  },
  componentDidUpdate() {
    this.initSwiper()
  }
})

//事件
Object.assign(Login.prototype, {
  initSwiper() {
    var mySwiper = new Swiper('#m-banner', {
      loop: true,
      autoplay: {
        delay: 3000
      },  
      pagination: {
        el: '.swiper-pagination',
      }, 
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },               
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
})

//受控组件
Object.assign(Login.prototype, {
})

const mapStateToProps = (state) => {
  return {
    count: state.getIn(['task', 'count'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    TASK_CHANGAE_STATE: (key, value) => {
      dispatch({ type: 'TASK_CHANGAE_STATE', key, value });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
