import React from 'react';
import { withRouter } from 'react-router-dom'
import Swiper from 'swiper'
import Api from '../../api'
import * as keyCode from '../../api/keyCode.js'
import 'swiper/dist/css/swiper.min.css'
import './index.css'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }
  render() {
    let swiperItemArr = this.renderSwiperItemArr()
    return (
      <div className="m-home">
        <div className="swiper-container">
            <div className="swiper-wrapper">
              {swiperItemArr}
            </div>
            <div className="swiper-pagination"></div>
        </div>
			</div>
    );
  }
}

Object.assign(Home.prototype, {
  renderSwiperItemArr() {
    let {list} = this.state
    let arr = []
    for (let i = 0; i < list.length; i++) {
      arr.push(
        <div key={list[i].uid} className="swiper-slide" style={{backgroundImage: `url(${list[i].path})`}}></div>
      )
    }
    return arr
  },
  componentDidMount() {
    this.getBanner()
  },
  componentDidUpdate() {
    var mySwiper = new Swiper('.swiper-container', {
      autoplay: {
        delay: 5000,//1秒切换一次
      },      
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }
})

Object.assign(Home.prototype, {
  getBanner() {
    Api.getBannerList().then((res) => {
      if (res.code === keyCode.SUCCESS) {
        this.setState({
          list: res.data.list
        })
      }
    }) 
  }
})

//受控组件
Object.assign(Home.prototype, {
  handleInput(field, e) {
    this.setState({
      [field]: e.target.value
    })
  }
})

export default withRouter(Home)
