export default {
  path: '/keyword',
  component: () => import('pages/keyword/Index.vue'),
  children: [
    {
      path: '',
      name: 'keyword',
      component: () => import('pages/keyword/All.vue')
    }
  ],
  meta: {
    logType: 'registered',
    accessType: 'recruiter'
  }
}
