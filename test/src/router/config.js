import React, {lazy, Suspense } from 'react';
import Login from '../pages/login/Login.js'
const Register = lazy(() => import('../pages/login/Register.js'))

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
    path: '/register',
    exact: true,
    component: () => (
      <Suspense fallback={'loading...'}>
        <Register />
      </Suspense>
    )
  }  
];

const routerManagement = [
  {
    path: '/management/file_upload',
    exact: true,
    text: '文件上传',
    component: () => (
      <Suspense fallback={'loading...'}>
        <Login />
      </Suspense>
    )
  },
  {
    path: '/management/banner',
    exact: true,
    text: 'Banner管理',
    component: () => (
      <Suspense fallback={'loading...'}>
        <Login />
      </Suspense>
    )
  }
];

export default {
  routerSingle,
  routerManagement,
}