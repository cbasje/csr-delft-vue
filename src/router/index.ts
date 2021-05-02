import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'
import Login from '../views/Login.vue'

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
        path: 'forum/:topicID',
        component: () => import('@/views/ForumTopic.vue')
      },
      {
        path: 'forum',
        component: () => import('@/views/Forum.vue')
      },
      {
        path: 'events/:eventID',
        component: () => import('@/views/EventDetail.vue')
      },
      {
        path: 'events',
        component: () => import('@/views/EventCalendar.vue')
      },
      {
        path: 'members/:memberID',
        component: () => import('@/views/MemberDetail.vue')
      },
      {
        path: 'members',
        component: () => import('@/views/MemberList.vue')
      },
      {
        path: 'settings',
        component: () => import('@/views/Settings.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
