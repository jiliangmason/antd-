import React from 'react';
import { Button } from 'antd';
import { Link } from 'dva/router';
import Result from '../../../components/Result';
import styles from './RegisterResult.less';


const title = <div className={styles.title}>你的账户：AntDesign@example.com 注册成功</div>;

const actions = (
  <div className={styles.actions}>
    <a href="">
      <Button size="large" type="primary">查看邮箱</Button>
      <Link to="/"><Button size="large">返回首页</Button></Link>
    </a>
  </div>
);

export default () => {
  return (<Result
          className={styles.registerResult}
          type="success"
          title={title}
          description="激活邮件已经发出"
          ations={actions}
          style={{ marginTop: 56 }} />);
};
