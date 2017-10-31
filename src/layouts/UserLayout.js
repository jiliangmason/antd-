import { PureComponent } from 'react';
import { Link, Route } from 'dva/router';
import DocumentTitle from 'react-document-title'; //修改组件的title
import { Icon } from 'antd';
import styles from './UserLayout.less';

const links = [{
  title: '帮忙',
  href: ''
}, {
  title: '私密',
  href: '',
}, {
  title: '条款',
  href: '',
}];

const copyright = <div>Copyright<Icon type="copyright" />测试</div>;
