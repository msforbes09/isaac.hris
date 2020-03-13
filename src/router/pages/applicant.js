export default {
  path: '/applicant',
  component: () => import('pages/applicant/Index.vue'),
  children: [
    {
      path: '',
      name: 'applicant',
      component: () => import('pages/applicant/All.vue')
    },
    {
      path: 'create',
      name: 'applicant-create',
      component: () => import('pages/applicant/Create.vue')
    },
    {
      path: 'edit/:id',
      name: 'applicant-edit',
      component: () => import('pages/applicant/Edit.vue')
    },
    {
      path: 'profile/:id',
      name: 'profile',
      component: () => import('pages/applicant/Profile.vue')
    },
    {
      path: 'family/:id',
      name: 'family',
      component: () => import('pages/applicant/Family.vue')
    },
    {
      path: 'education/:id',
      name: 'education',
      component: () => import('pages/applicant/Education.vue')
    },
    {
      path: 'employment/:id',
      name: 'employment',
      component: () => import('pages/applicant/Employment.vue')
    },
    {
      path: 'application/:id',
      name: 'application',
      component: () => import('pages/applicant/Application.vue')
    }
  ],
  meta: {
    logType: 'registered',
    accessType: 'recruiter'
  }
}
