import React, {lazy, Suspense } from 'react';
import Login from '../pages/login/Login.js'
const List = lazy(() => import('../pages/list/List.js'))
const Register = lazy(() => import('../pages/login/Register.js'))
const ForgotPassword = lazy(() => import('../pages/login/ForgotPassword.js'))
const ResetPassword = lazy(() => import('../pages/login/ResetPassword.js'))
const FileUpload = lazy(() => import('../pages/management/FileUpload.js'))
const Banner = lazy(() => import('../pages/management/Banner.js'))
const Article = lazy(() => import('../pages/management/Article.js'))
const Copy = lazy(() => import('../pages/management/Copy.js'))
const CopyTest = lazy(() => import('../pages/management/CopyTest.js'))
const Antd = lazy(() => import('../pages/management/Antd.js'))
const Home = lazy(() => import('../pages/home/Home.js'))

//单页面路由
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
    path: '/home',
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
    path: '/list',
    exact: true,
    component: () => (
      <Suspense fallback={'loading...'}>
        <List />
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
  },
  {
    path: '/forgot_password',
    exact: true,
    component: () => (
      <Suspense fallback={'loading...'}>
        <ForgotPassword />
      </Suspense>
    )
  }, 
  {
    path: '/reset_password/:token',
    exact: true,
    component: () => (
      <Suspense fallback={'loading...'}>
        <ResetPassword />
      </Suspense>
    )
  },    
];

//后台管理
const routerManagement = [
  {
    text: '文件上传',
    path: '/management/file_upload',
    exact: true,
    component: () => (
      <Suspense fallback={'loading...'}>
        <FileUpload />
      </Suspense>
    )
  },
  {
    text: '轮播图',
    path: '/management/banner',
    exact: true,
    component: () => (
      <Suspense fallback={'loading...'}>
        <Banner />
      </Suspense>
    )
  },
  {
    text: '文章',
    path: '/management/article',
    exact: true,
    component: () => (
      <Suspense fallback={'loading...'}>
        <Article />
      </Suspense>
    )
  },    
  {
    text: '周考技能',
    path: '/management/copy',
    exact: true,
    component: () => (
      <Suspense fallback={'loading...'}>
        <Copy />
      </Suspense>
    )
  },   
  {
    text: '周考技能测试',
    path: '/management/copy_test',
    exact: true,
    component: () => (
      <Suspense fallback={'loading...'}>
        <CopyTest />
      </Suspense>
    )
  }, 
  {
    text: 'antd组件',
    path: '/management/antd',
    exact: true,
    component: () => (
      <Suspense fallback={'loading...'}>
        <Antd />
      </Suspense>
    )
  },     
]

export default {
  routerSingle,
  routerManagement,
}