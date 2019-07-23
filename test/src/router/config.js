import React, {lazy, Suspense } from 'react';
import Login from '../pages/login/Login.js'

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
  }
];

export default {
  routerSingle
}