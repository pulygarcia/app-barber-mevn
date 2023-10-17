import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppointmentsLayout from '../views/appointments/AppointmentsLayout.vue'

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
      children : [
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
            },
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
      ]
    }
  ]
})

export default router
