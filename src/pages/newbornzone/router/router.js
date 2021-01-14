/*
 * @Author: your name
 * @Date: 2019-11-12 10:41:53
 * @LastEditTime: 2021-01-14 17:25:35
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /MultiVue/src/pages/newbornzone/router/router.js
 */
// import Vue from 'vue';
// import Router from 'vue-router';
import newbornzone from '@/pages/newbornzone/newbornzone.vue';
// import axios from "@/utils/https.js"

// Vue.use(Router);
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/newbornzone',
      component: newbornzone,
      meta: {
        title: 'title',
      },
    },
  ],
});
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
