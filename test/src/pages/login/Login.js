import React from 'react';
import { connect } from 'react-redux'
import actions from '../../store/task/actionTypes'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 5
    }
  }
  render() {
    let { loginCount } = this.props
    let {
      count,
    } = this.state
    let arr = [1, 2, 3]
    let header = this.renderHeader(arr)
    return (
      <div className="m-login">
        <div>
          {count}
          {header}
          {loginCount}<button onClick={this.handleBtn.bind(this)}>按钮</button>
        </div>        
			</div>
    );
  }
}

//生命周期
Object.assign(Login.prototype, {
  renderHeader(data) {
    let arr = []
    for (let i = 0; i < data.length; i++) {
      arr.push(<div key={i}>{data[i]}</div>)
    } 
    return arr
  },
  componentDidMount() {

  }
})

//事件
Object.assign(Login.prototype, {
  handleBtn() {
    let {loginCount} = this.props
    loginCount = loginCount + 2
    this.props.TASK_CHANGAE_STATE(['count'], loginCount)
  }
})

//受控组件
Object.assign(Login.prototype, {

})

const mapStateToProps = (state) => {
  return {
    loginCount: state.getIn(['task', 'count']) 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    TASK_CHANGAE_STATE: (key, value) => {
      dispatch({ type: actions.TASK_CHANGAE_STATE, key, value });
    }    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
