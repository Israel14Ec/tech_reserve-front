import { createRouter, createWebHistory } from 'vue-router'
import HomeLayout from '@/layout/HomeLayout.vue'
import PanelAdminLayout from '@/layout/PanelAdminLayout.vue'
import PanelTeacherLayout from '@/layout/PanelTeacherLayout.vue'
import {AuthStore } from '@/stores/Auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homeLayout',
      component: HomeLayout,
      children: [
        {
          path: '',
          name: 'Login',
          component: () => import('../views/Home/Loggin.vue')
        },
        {
          path: 'crear_cuenta',
          name: 'createAccount',
          component: () => import('../views/Home/CreateAccount.vue')
        },
        {
          path: 'recuperar_cuenta',
          name: 'forgotPassword',
          component: () => import('../views/Home/ForgotPassword.vue')
        }, {
          path: 'confirmar_cuenta/:email_verification_token',
          name: 'confirmAccount',
          component: () => import('../views/Home/ConfirmAccount.vue')
        }
      ]
    },

    {
      path:'/panel_admin',
      name: 'AdminLayout',
      component: PanelAdminLayout,
      meta: {requiresAuthAdmin: true},
      children: [
        {
          path: '',
          name: 'HomeAdmin',
          component: () => import('@/views/PanelAdmin/HomeAdmin.vue')
        },
        {
          path: 'laboratorios',
          name: 'ManageLabsAdmin',
          component: () => import('@/views/PanelAdmin/ManageLabs/ManageLabsLayout.vue'),
          children: [
            {
              path: 'horarios/:idComputerLab',
              name: 'ManageSchedules',
              component: () => import('@/views/PanelAdmin/ManageLabs/ManageSchedules.vue')
            }

          ]
        },
        {
          path: 'reservaciones',
          name: 'ReservationsLabsAdmin',
          component: () => import('@/views/PanelAdmin/Reservations.vue')
        }
      ]

    },
    {
      path: '/panel_profesor',
      name: 'TeacherLayout',
      component: PanelTeacherLayout,
      meta: {requiresAuthTeacher: true},
      children: [
        {
          path: '',
          name: 'HomeTeacher',
          component: () => import('@/views/PanelTeacher/Home/HomeTeacherLayout.vue'),
          children: [
            {
              path: 'horarios/:idComputerLab',
              name: 'SchedulesTeacher',
              component: () => import('@/views/PanelTeacher/Home/SchedulesLab.vue')
            }
          ]
        },
        {
          path: 'historial',
          name: 'HistoryReservationTeacher',
          component: () => import('@/views/PanelTeacher/HistoryReservationTeacher.vue'),
        }
      ]
    }
    
  ]
})

// Guards de navegación global
let userRole = null; // Variable para cachear el rol del usuario

router.beforeEach(async (to, from) => {
  const auth = AuthStore();

  // Verifica si la ruta requiere autenticación
  if (to.meta.requiresAuthAdmin || to.meta.requiresAuthTeacher) {

    // Carga el perfil solo si no ha sido cargado previamente
    if (Object.keys(auth.userData).length === 0) {
      await auth.getProfile();
      userRole = auth.userData?.role;

    }

    const isAuthorized = (to.meta.requiresAuthAdmin && userRole === 'admin') ||
                         (to.meta.requiresAuthTeacher && userRole === 'teacher');
    
    if (isAuthorized) {
      return true; // Permite la navegación
    } else {
      return { name: 'Login' }; // Redirige a la página de login
    }
  }
});


export default router
