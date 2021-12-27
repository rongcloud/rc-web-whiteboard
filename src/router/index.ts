import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Login/index.vue'

const routes: Array<RouteRecordRaw> = [
  // 登录
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // 注册条款
  {
    path: '/reg-protocal',
    name: 'RegProtocal',
    component: () => import(/* webpackChunkName: "reg" */ '../views/RegProtocal/index.vue')
  },
  // 首页
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "room" */ '../views/Home/index.vue'),
    meta: {
      needLogin: true,
    }
  },
  // 加入房间
  {
    path: '/room-join',
    name: 'RoomJoin',
    component: () => import(/* webpackChunkName: "room" */ '../views/RoomJoin/index.vue'),
    meta: {
      needLogin: true,
    }
  },
  // 白板页
  {
    path: '/room-play',
    name: 'RoomPlay',
    component: () => import(/* webpackChunkName: "room" */ '../views/RoomPlay/index.vue'),
    meta: {
      needLogin: true,
    }
  },
  // 录像播放
  {
    path: '/record-play',
    name: 'RecordPlay',
    component: () => import(/* webpackChunkName: "room" */ '../views/RecordPlay/index.vue'),
    meta: {
      needLogin: true,
    }
  },
  // 录像列表
  {
    path: '/records',
    name: 'Records',
    component: () => import(/* webpackChunkName: "record" */ '../views/Records/index.vue'),
    meta: {
      needLogin: true,
    }
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((from, to, next) => {
  const token = sessionStorage.getItem("token");
  const needLogin = from.meta.needLogin;
  if (needLogin) {
    // 是否已经登录
    if (token) {
      // 已登录
      next();
    } else {
      // 未登录
      next({
        name: "Login",
        query: {
          redirect: encodeURIComponent(from.fullPath)
        }
      })
    }
  } else {
    next()
  }
})

export default router
