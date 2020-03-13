export default {
  path: '/client',
  component: () => import('pages/client/Index.vue'),
  children: [
    {
      path: '',
      name: 'client',
      component: () => import('pages/client/All.vue')
    },
    {
      path: ':id/position',
      name: 'client-position',
      component: () => import('pages/client/Position.vue')
    },
    {
      path: ':id/branch',
      name: 'client-branch',
      component: () => import('pages/client/Branch.vue')
    }
  ],
  meta: {
    logType: 'registered',
    accessType: 'recruiter'
  }
}
