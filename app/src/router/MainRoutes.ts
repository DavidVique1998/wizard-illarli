const MainRoutes = {
  path: '/auth',
  component: () => import('@/layouts/blank/BlankLayout.vue'),
  meta: {
    requiresAuth: true,
    requiresLead: true,
  },
  children: [
    {
      name: 'Register',
      path: '/auth/register',
      component: () => import('@/views/authentication/auth/RegisterPage.vue')
    },
    {
      name: 'Approval',
      path: '/auth/approval',
      component: () => import('@/views/authentication/auth/ApprovalPage.vue')
    }
  ]
};

export default MainRoutes;
