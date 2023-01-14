import { LocalStorage, SessionStorage } from 'quasar'

const isAuthenticated = async (to, from) => {
  const isAuthenticated = LocalStorage.getItem('token') || SessionStorage.getItem('token')
  if (!isAuthenticated && to.name !== 'login') {
    return { name: 'login' }
  }
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'homepage', component: () => import('pages/IndexPage.vue') },
      { path: 'tutorial',  name: 'tutorial', component: () => import('pages/TutoPage.vue') },
      { path: 'tutorial/:id',  name: 'tuto-params', component: () => import('pages/TutoPage.vue') },
      { path: 'register', component: () => import('pages/auth/RegisterPage.vue') },
      { path: 'login', name: 'login', component: () => import('pages/auth/LoginPage.vue') },
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/dashboard/DashboardLayout.vue'),
    children: [
      { path: '', name: 'dashboard', component: () => import('pages/DashboardPage.vue') },
      { path: ':id', name: 'list-view', component: () => import('pages/ListPage.vue') },
    ],
    beforeEnter: isAuthenticated
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes