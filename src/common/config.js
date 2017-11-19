import BasicLayout from '../layouts/BasicLayout';
import BlankLayout from '../layouts/BlankLayout';
import UserLayout from '../layouts/UserLayout';

const data = [{
  component: BasicLayout,
  layout: 'BasicLayout',
  name: '首页',
  path: '',
  children: [{
    name: 'Dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    children: [{}],
  }],
}, {
  component: UserLayout,
  layout: 'UserLayout',
  children: [{
    name: '账户',
    icon: 'user',
    path: 'user',
    children: [{
      name: '登陆',
      path: 'login',
      component: '',
    }, {
      name: '注册',
      path: 'register',
      component: '',
    }, {
      name: '注册结果',
      path: 'register-result',
      component: '',
    }],
  }],
}, {
  component: BlankLayout,
  layout: 'BlankLayout',
  children: [{
    name: '使用文档',
    path: 'http://pro.ant.design/docs/getting-started',
    target: '_blank',
    icon: 'book',
  }],
}];

export default data;
