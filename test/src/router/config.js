import React, {lazy, Suspense } from 'react';
import Login from '../pages/login/Login.js'
const Register = lazy(() => import('../pages/login/Register.js'))
const FileUpload = lazy(() => import('../pages/management/FileUpload.js'))
const Banner = lazy(() => import('../pages/management/Banner.js'))
const Home = lazy(() => import('../pages/home/Home.js'))

const routerSingle = [
  {
    path: '/',
    exact: true,
    component: () => (
      <Suspense fallback={'loading...'}>
        <Home />
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
        <FileUpload />
      </Suspense>
    )
  },
  {
    path: '/management/banner',
    exact: true,
    text: 'Banner管理',
    component: () => (
      <Suspense fallback={'loading...'}>
        <Banner />
      </Suspense>
    )
  }
];

export default {
  routerSingle,
  routerManagement,
}