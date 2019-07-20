import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    let { count } = this.props
    return (
      <div>
        登录{count}
        <button onClick={this.handleBtn.bind(this)}>按钮</button>
			</div>
    );
  }
}

Object.assign(Login.prototype, {
  handleBtn() {
    let {count} = this.props
    count = count + 1
    this.props.TASK_CHANGAE_STATE(['count'], count)
  }
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
