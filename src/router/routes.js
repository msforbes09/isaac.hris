import auth from './pages/auth'
import user from './pages/user'
import access from './pages/access'
import keyword from './pages/keyword'
import client from './pages/client'
import applicant from './pages/applicant'

const routes = [
  auth,
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('pages/Registered.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/static/Home.vue')
      },
      user,
      keyword,
      applicant,
      client,
      access
    ],
    meta: {
      logType: 'registered'
    }
  }
]

// Always leave this as last one

if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    name: '404',
    component: () => import('pages/message/404.vue')
  })
}

export default routes
