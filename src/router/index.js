import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Cart from '../views/Cart.vue'
import ProductList from '../views/ProductList.vue'
import CheckoutPage from '../views/CheckoutPage.vue'

// Import new views
import ProductCreate from '../views/ProductCreate.vue'
import ProductUpdate from '../views/ProductUpdate.vue'
import ProductDelete from '../views/ProductDelete.vue'

import CustomersList from '../views/CustomersList.vue'
import CustomerCreate from '../views/CustomerCreate.vue'
import CustomerUpdate from '../views/CustomerUpdate.vue'
import CustomerDelete from '../views/CustomerDelete.vue'

const routes = [
  {
    path: '/',
    name: 'ProductList',
    component: ProductList,
    meta: { requiresAuth: true }
  },
  {
    path: '/products/create',
    name: 'ProductCreate',
    component: ProductCreate,
    meta: { requiresAuth: true }
  },
  {
    path: '/products/update',
    name: 'ProductUpdate',
    component: ProductUpdate,
    meta: { requiresAuth: true }
  },
  {
    path: '/products/delete',
    name: 'ProductDelete',
    component: ProductDelete,
    meta: { requiresAuth: true }
  },
  {
    path: '/customers',
    name: 'CustomersList',
    component: CustomersList,
    meta: { requiresAuth: true }
  },
  {
    path: '/customers/create',
    name: 'CustomerCreate',
    component: CustomerCreate,
    meta: { requiresAuth: true }
  },
  {
    path: '/customers/update',
    name: 'CustomerUpdate',
    component: CustomerUpdate,
    meta: { requiresAuth: true }
  },
  {
    path: '/customers/delete',
    name: 'CustomerDelete',
    component: CustomerDelete,
    meta: { requiresAuth: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { requiresAuth: true }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutPage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard stays the same
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/register') && isLoggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router
