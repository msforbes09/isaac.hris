export default {
  path: '/sign-in',
  component: () => import('pages/auth/Index.vue'),
  children: [
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('pages/auth/SignIn.vue')
    },
    {
      path: '/forgot-password',
      name: 'password-forgot',
      component: () => import('pages/auth/Forgot.vue')
    },
    {
      path: '/reset-password/:email/:token',
      name: 'password-reset',
      component: () => import('pages/auth/Reset.vue')
    },
    {
      path: '/reset-success',
      name: 'success-reset',
      component: () => import('pages/message/Success.vue')
    }
  ],
  meta: {
    logType: 'visitors'
  }
}
