import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import config from "./config.js"
import './index.css'

//路由组件
class Routers extends React.Component {
  render() {
    let routerSingle = this.renderSingleRoute()
    let routerManagement = this.renderManagement()
    return (
      <Switch>
        {routerSingle}
        {routerManagement}
      </Switch>
    );
  }
}

Object.assign(Routers.prototype, {
  renderSingleRoute() {
    return config.routerSingle.map((item) => {
      return <Route key={item.path} exact={item.exact} path={item.path} component={item.component} />
    });
  },
  renderManagement() {
    return (
      <Route>
        <div>
          <div>header</div>
          <div className="m-management">
            <div className="m-sidebar">
              {
                config.routerManagement.map((item) => {
                  return <NavLink key={item.path} to={item.path} className="m-management-link" activeClassName="active">{item.text}</NavLink>
                })
              }            
            </div>
            <div className="m-content-wrap">
              {
                config.routerManagement.map((item) => {
                  return <Route key={item.path} exact={item.exact} path={item.path} component={item.component}></Route>
                })
              }
            </div>
          </div>
        </div>
      </Route>
    )
  }
})

export default Routers