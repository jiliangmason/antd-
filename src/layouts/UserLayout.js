import React from 'react';
import { Link, Route } from 'dva/router';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title'; // 修改组件的title
import { Icon } from 'antd';
import { getRouteData } from '../utils/utils';
import styles from './UserLayout.less';
import GlobalFooter from '../components/globalFooter';

const links = [{
  title: '帮忙',
  href: '',
}, {
  title: '私密',
  href: '',
}, {
  title: '条款',
  href: '',
}];

const copyright = <div>Copyright<Icon type="copyright" />测试</div>;
class UserLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
  };

  getChildContext() {
    const { location } = this.props;
    return { location };
  } // 越级传递属性this.context.location 赋值

  getPageTitle() {
    const { location } = this.props;
    const { pathname } = location;
    let title = '用户登陆';
    getRouteData('UserLayout').forEach((item) => {
      if (item.path === pathname) {
        title = `${item.name} - demo`;
      }
    });

    return title;
  }

  render() {
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="" className={styles.logo} src="https://gw.alipayobjects.com/zos/rmsportal/NGCCBOENpgTXpBWUIPnI.svg" />
                <span className={styles.title}>企业后台demo</span>
              </Link>
            </div>
            <p className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</p>
          </div>
          {
          getRouteData('UserLayout').map(item =>
            (
              <Route
                exact={item.exact}
                key={item.path}
                path={item.path}
                component={item.component}
              />
            )
          )
        }
          <GlobalFooter links={links} copyright={copyright} className={styles.footer} />
        </div>
      </DocumentTitle>);
  }
}

export default UserLayout;
