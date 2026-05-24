export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    refresh: '/auth/refresh',
  },
  ai: {
    chat: '/ai/chat',
    knowledgeBase: '/ai/knowledge-base',
  },
  admin: {
    dashboard: '/admin/dashboard',
  },
  tickets: {
    list: '/tickets',
    create: '/tickets',
    detail: (id: string) => `/tickets/${id}`,
  },
  books: {
    list: '/books',
  },
};
