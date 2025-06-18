import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Cart from '../views/Cart.vue'
import ProductList from '../views/ProductList.vue'
import CheckoutPage from '../views/CheckoutPage.vue'
import TopSales from '../views/TopSales.vue'
import TopCustomers from '../views/TopCustomers.vue' //  import the view
import OrderSummary from '../views/OrderSummary.vue'
import LowStockProducts from '../views/LowStockProducts.vue'
import Payment from '../views/Payment.vue'; // adjust path if needed


// Admin Views
import ProductCreate from '../views/ProductCreate.vue'
import ProductUpdate from '../views/ProductUpdate.vue'
import ProductDelete from '../views/ProductDelete.vue'

import CustomersList from '../views/CustomersList.vue'
import CustomerCreate from '../views/CustomerCreate.vue'
import CustomerUpdate from '../views/CustomerUpdate.vue'
import CustomerDelete from '../views/CustomerDelete.vue'

// Optional: Unauthorized view
import Unauthorized from '../views/Unauthorized.vue'

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
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  { path: '/top-customers', name: 'TopCustomers', component: TopCustomers, meta: { requiresAuth: true, requiresAdmin: true } }, // 👈 add route
  {
    path: '/products/update',
    name: 'ProductUpdate',
    component: ProductUpdate,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/products/delete',
    name: 'ProductDelete',
    component: ProductDelete,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/customers',
    name: 'CustomersList',
    component: CustomersList,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/customers/create',
    name: 'CustomerCreate',
    component: CustomerCreate,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/customers/update',
    name: 'CustomerUpdate',
    component: CustomerUpdate,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/customers/delete',
    name: 'CustomerDelete',
    component: CustomerDelete,
    meta: { requiresAuth: true, requiresAdmin: true }
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
  },
  {
  path: '/payment/:orderId',
  name: 'Payment',
  component: () => import('../views/Payment.vue'),
  props: true
},
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: Unauthorized
  },
  {
    path: '/top-sales',
    name: 'TopSales',
    component: TopSales,
    meta: { requiresAuth: true, requiresAdmin: true } // if using auth, ensure you are logged in
  },
  {
    path: '/order-summary',
    name: 'OrderSummary',
    component: OrderSummary,
     meta: { requiresAuth: true, requiresAdmin: true }
  },
   {
    path: '/low-stock',
    name: 'LowStockProducts',
    component: LowStockProducts
    , meta: { requiresAuth: true, requiresAdmin: true }
  }
  
   
   
    
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const roles = JSON.parse(localStorage.getItem('role') || '[]')

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else if (to.meta.requiresAdmin && !(roles.includes('Admin') && roles.includes('Customer'))) {
    next('/access-denied') // Optional: create this page
  } else {
    next()
  }
})


export default router
