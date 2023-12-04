import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppointmentsLayout from '../views/appointments/AppointmentsLayout.vue'
import authApiServices from '../api/authApiServices.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/reservaciones',
      name: 'appointments',
      component: AppointmentsLayout,
      meta: { requiresAuth: true },
      children : [
        {
          path: '',
          name: 'user-appointments',
          component: () => import('../views/appointments/UserAppointmentsView.vue')
        },
        {
          path : 'nueva',
          component : () => import('../views/appointments/NewAppointmentLayout.vue'),
          children : [
            {
              path : '',
              name : 'new-appointment',
              component : () => import('../views/appointments/ServicesView.vue')
            },
            {
              path : 'detalles',
              name : 'appointment-details',
              component : () => import('../views/appointments/AppointmentDetailsView.vue')
            }
          ]
        },
        {
          path: ':id/editar',
          component: () => import('../views/appointments/UpdateAppointmentLayout.vue'),
          children : [
            {
              path : '',
              name : 'update-appointment',
              component : () => import('../views/appointments/ServicesView.vue')
            },
            {
              path : 'detalles',
              name : 'update-appointment-details',
              component : () => import('../views/appointments/AppointmentDetailsView.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthLayout.vue'),
      children : [
        {
          path : 'registro',
          name : 'register',
          component : () => import('../views/auth/RegisterView.vue')
        },
        {
          path : 'verificacion/:token',
          name : 'user-verification',
          component : () => import('../views/auth/VerificationView.vue')
        },
        {
          path : 'login',
          name : 'auth-login',
          component : () => import('../views/auth/LoginView.vue')
        },
        {
          path : 'olvide-password',
          name : 'forgot-password',
          component : () => import('../views/auth/ForgotPasswordView.vue')
        },
        {
          path : 'nuevo-password',
          name : 'new-password',
          component : () => import('../views/auth/NewPasswordView.vue')
        },
      ]
    }
  ]
})

//Guard navigation (info from vue-router docs)

router.beforeEach(async (to, from, next) => {
  //check routes that need auth
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth); //.matched works for find childrens of the father route that need auth

  if(requiresAuth){
    //Check if user is auth
    try {
      await authApiServices.auth();

      next();
      
    } catch (error) {
      console.log(error.response.data.msg);
      next({name: 'auth-login'})
    }

  }else{
    next();
  }
})

export default router
