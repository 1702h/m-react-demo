import React, { Fragment, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login.js'
import List from '../pages/List.js'


const router_single = [
  {
    path: '/',
    exact: true,
    component: () => (
      <Suspense fallback={'loading...'}>
        <Login />
      </Suspense>
    )
  },
  {
    path: '/login',
    exact: true,
    component: () => (
      <Suspense fallback={'loading...'}>
        <Login />
      </Suspense>
    )
  },
  {
    path: '/list',
    exact: true,
    component: () => (
      <Suspense fallback={'loading...'}>
        <List />
      </Suspense>
    )
  }  
];

//路由组件
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
    return router_single.map((item) => <Route key={item.path} exact={item.exact}  path={item.path} component={item.component} />);
  }  
})

export default Routers