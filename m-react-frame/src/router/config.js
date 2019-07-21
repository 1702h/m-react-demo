import React, {lazy, Suspense } from 'react';
import Login from '../pages/login/Login.js'
const List = lazy(() => import('../pages/list/List.js'))

const routerSingle = [
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

export default {
  routerSingle
}