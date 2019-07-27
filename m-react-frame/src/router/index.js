import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Header from '../pages/management/Header.js'
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
    let sidebar = this.renderSidebar()
    return (
      <Route>
        <div>
          <Header/>
          <div className="m-management">
            <div className="m-sidebar">
              {sidebar}            
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
  },
  renderSidebar() {
    let arr = []
    for(let i = 0; i < config.routerManagement.length; i++) {
      if (!config.routerManagement[i].isHideLink) {
        arr.push(
          <NavLink 
            key={config.routerManagement[i].path} 
            to={config.routerManagement[i].path} 
            className="m-management-link" 
            activeClassName="active">{config.routerManagement[i].text}</NavLink>
        )
      }
    }
    return arr
  }
})

export default Routers