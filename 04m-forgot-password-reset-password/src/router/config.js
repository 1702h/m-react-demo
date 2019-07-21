import React, {lazy, Suspense } from 'react';
import Login from '../pages/login/Login.js'
const List = lazy(() => import('../pages/list/List.js'))
const Register = lazy(() => import('../pages/login/Register.js'))
const ForgotPassword = lazy(() => import('../pages/login/ForgotPassword.js'))
const ResetPassword = lazy(() => import('../pages/login/ResetPassword.js'))

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

export default {
  routerSingle
}