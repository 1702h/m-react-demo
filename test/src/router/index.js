import React from 'react'
import {Switch, Route} from 'react-router-dom'
import config from './config.js'

class Routers extends React.Component {
  render() {
    let router = this.renderSingleRoute()
    return (
      <Switch>
        {router}
      </Switch>
    );
  }
}

Object.assign(Routers.prototype, {
  renderSingleRoute() {
    return config.routerSingle.map((item) => {
      return <Route key={item.path} exact={item.exact}  path={item.path} component={item.component} />
    });
  } 
})

export default Routers