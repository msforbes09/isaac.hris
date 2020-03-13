export default {
  path: '/access',
  component: () => import('pages/access/Index.vue'),
  children: [
    {
      path: '',
      name: 'access',
      component: () => import('pages/access/All.vue')
    }
  ]
}
