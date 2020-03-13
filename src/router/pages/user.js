export default {
  path: '/user',
  component: () => import('pages/user/Index.vue'),
  children: [
    {
      path: '',
      name: 'user',
      component: () => import('pages/user/All.vue')
    }
  ]
}
