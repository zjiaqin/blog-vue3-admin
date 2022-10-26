export const asyncRoutes = [
  {
    path: '/',
    component: () => import('@/views/Main.vue'),
    redirect: '/home',
    meta: {
      title: '首页',
      authId: '1',
      icon: 'House'
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/Home.vue'),
        name: 'home',
        meta: {
          title: '首页',
          authId: '1'
        }
      }
    ]
  },
  {
    path: '/article',
    component: () => import('@/views/Main.vue'),
    redirect: '/article/articleList',
    meta: {
      title: '文章管理',
      authId: '1',
      icon: 'Document'
    },
    child: true,
    children: [
      {
        path: '/article/articleList',
        component: () => import('@/views/article/ArticleList.vue'),
        name: 'ruleList',
        meta: {
          title: '文章列表',
          authId: '5e7a0c129653e66ae88e33ad'
        }
      },
      {
        path: '/article/articleAdd',
        component: () => import('@/views/article/ArticleAdd.vue'),
        name: 'articleAdd',
        meta: {
          title: '创建文章',
          authId: '5e834f23fb69305aa091e824'
        }
      },
      {
        path: '/article/edit',
        component: () => import('@/views/article/ArticleAdd.vue'),
        name: 'articleEdit',
        hidden: true,
        meta: {
          title: '编辑文章',
          authId: '5e7a0c129653e66ae88e33ad'
        }
      },
      {
        path: '/article/articleTag',
        component: () => import('@/views/article/ArticleTag.vue'),
        name: 'articleTag',
        meta: {
          title: '文章标签',
          authId: '5e7a0c6c9653e66ae88e33ae'
        }
      },
      {
        path: '/article/comment',
        component: () => import('@/views/article/ArticleComment.vue'),
        hidden: true,
        name: 'articleComment',
        meta: {
          title: '文章评论',
          authId: '5e7a0c849653e66ae88e33af'
        }
      }
    ]
  },
  {
    path: '/project',
    component: () => import('@/views/Main.vue'),
    redirect: '/project',
    meta: {
      title: '项目管理',
      authId: '1',
      icon: 'Collection'
    },
    children: [
      {
        path: '/project',
        component: () => import('@/views/project/ProjectList.vue'),
        name: 'projectList',
        meta: {
          title: '项目列表',
          authId: '5e7a11f09653e66ae88e33b0'
        }
      }
    ]
  },
  {
    path: '/link',
    component: () => import('@/views/Main.vue'),
    redirect: '/link',
    meta: {
      title: '友情链接',
      authId: '1',
      icon: 'Link'
    },
    children: [
      {
        path: '/link',
        component: () => import('@/views/link/Link.vue'),
        name: 'link',
        meta: {
          title: '友情链接',
          authId: '5e7a120a9653e66ae88e33b1'
        }
      }
    ]
  },
  {
    path: '/message',
    component: () => import('@/views/Main.vue'),
    redirect: '/message',
    meta: {
      title: '留言管理',
      authId: '1',
      icon: 'Edit'
    },
    children: [
      {
        path: '/message',
        component: () => import('@/views/message/MessageList.vue'),
        name: 'messageList',
        meta: {
          title: '留言列表',
          authId: '5e7a12149653e66ae88e33b2'
        }
      }
    ]
  },
  {
    path: '/menu',
    component: () => import('@/views/Main.vue'),
    redirect: '/menu',
    meta: {
      title: '菜单管理',
      authId: '1',
      icon: 'MessageBox'
    },
    children: [
      {
        path: '/menu',
        component: () => import('@/views/menu/menuManag.vue'),
        name: 'menuManag',
        meta: {
          title: '菜单管理',
          authId: '5e7a12249653e66ae88e33b3'
        }
      }
    ]
  },
  {
    path: '/user',
    component: () => import('@/views/Main.vue'),
    redirect: '/user/userList',
    meta: {
      title: '用户管理',
      authId: '1',
      icon: 'User'
    },
    child: true,
    children: [
      {
        path: '/user/userList',
        component: () => import('@/views/user/UserList.vue'),
        name: 'userList',
        meta: {
          title: '用户列表',
          authId: '5e7a12939653e66ae88e33b6'
        }
      },
      {
        path: '/user/roleList',
        component: () => import('@/views/user/RoleList'),
        name: 'roleList',
        meta: {
          title: '角色管理',
          authId: '5e7a12a69653e66ae88e33b7'
        }
      }
    ]
  }
]
