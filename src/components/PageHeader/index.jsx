import React, { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Tabs } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

const { TabPane } = Tabs;

function getBreadcrumbNameWithParams(breadcrumbNameMap, url) {
  let name = '';
  Object.keys(breadcrumbNameMap).forEach(item => {
    const itemRegExpStr = `^${item.replace(/:[\w-]+/g, '[\\w-]+')}$`; //:id -> id
    const itemRegExp = new RegExp(itemRegExpStr);
    if (itemRegExp.test(url)) {
      name = breadcrumbNameMap[item]
    }
  });
  return name;
  // 意义？带有参数的url api/request/:id
}

export default class PageHeader extends PureComponent {
  static context = {
    routes: PropTypes.array,
    params: PropTypes.object,
    location: PropTypes.object,
    breadcurmNameMap: PropTypes.object,
  };
  static PropTypes = this.context

  getBreadCrumProps = () => {
    return {
      routes: this.props.routes || this.context.routes,
      params: this.props.params || this.context.params,
      location: this.props.location || this.context.location,
      breadcrumbNameMap: this.props.breadcrumbNameMap || this.context.breadcrumbNameMap,
    }
  } // this.context是从最顶层组件拿到，

  onChange = (key) => {
    if (this.props.onTabChange) {
      this.props.onTabChange(key);
    }
  }

  itemRender = () => {

  }

  render() {
    const { routes, params, location, breadcrumbNameMap } = this.getBreadCrumProps();
    const { title, logo, action, content, extraContent,
      breadcrumbList, tabList, className, linkElement = 'a', } = this.props;
    const clsString = classNames(styles.pageHeader, className);
    let breadcrumb;
    if (routes && params) {
      breadcrumb = (
        <Breadcrumb className={styles.breadcrumb}
                    routes={routes.filter(route => route.breadcrumbName)}
                    params={params}
                    itemRender={this.itemRender}
        />
      );
    } else if (location && location.pathname) {
      const pathSnippets = location.pathname.split('/').filter(i => i);
      const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        // /api/request
        <Breadcrumb.Item key={url}>
        {
          createElement(index === pathSnippets.length - 1 ? 'span' : linkElement,
              { [linkElement === 'a' ? 'href' : 'to']: url},
              breadcrumbNameMap[url] ||
              breadcrumbNameMap[url.replace('/', '')] ||
              getBreadcrumbNameWithParams(breadcrumbNameMap, url) ||
              url
          )}
        </Breadcrumb.Item>
      })
    }

  }
}
