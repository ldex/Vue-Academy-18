import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Products from '@/views/Products.vue';
import Admin from '@/views/Admin.vue';
import Login from '@/views/Login.vue';
import Error from '@/views/Error.vue';
import ProductDetails from '@/components/ProductDetails.vue';
import ProductInsert from '@/components/ProductInsert.vue';
import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'products',
    component: Products
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductDetails,
    props: castRouteParamsId
  },
  {
    path: '/product/insert',
    name: 'productInsert',
    component: ProductInsert
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error',
    component: Error
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if(!store.getters.loggedIn) {
      next('/login')
    } else next()
  } else next()
})

export default router

function castRouteParamsId(route) {
  return {
    id: Number(route.params.id),
  };
}
