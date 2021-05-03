import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'
import Login from '../views/Login.vue'

import { Storage } from '@capacitor/storage';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/forum'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/forum'
      },
      {
        path: 'forum',
        component: () => import('@/views/Forum.vue')
      },
      {
        path: 'forum/:topicID',
        component: () => import('@/views/ForumTopic.vue')
      },
      {
        path: 'events',
        component: () => import('@/views/EventCalendar.vue')
      },
      {
        path: 'events/:eventID',
        component: () => import('@/views/EventDetail.vue')
      },
      {
        path: 'members',
        component: () => import('@/views/MemberList.vue')
      },
      {
        path: 'members/:memberID',
        component: () => import('@/views/MemberDetail.vue')
      },
      {
        path: 'menu',
        component: () => import('@/views/Menu.vue')
      },
      {
        path: 'lustrum',
        component: () => import('@/views/Lustrum.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// TODO
router.beforeEach(async (to, from, next) => {
  const { value } = await Storage.get({ key: 'isAuthenticated' });
  const isAuthenticated = value == 'true';
  
  // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  if (to.path !== '/login' && !isAuthenticated) next({ path: 'login' })
  else next()
})

export default router
