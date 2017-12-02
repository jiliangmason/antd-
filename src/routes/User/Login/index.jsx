import React from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;
const { TabPane } = Tabs;


export default class Login extends React.Component {
  state = {
    count: 0,
    type: 'account',
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login.status === 'ok') {
      this.props.dispatch(routerRedux.push('/'))
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onSwitch = key => {
    this.setState({
      type: key,
    })
  }

  handleSubmit = e => {
    e.preventDefault();

  }

  renderMessage = msg => {
    return (<Alert style={{marginBottom: 24}} message={msg} type="error" showIcon />);
  }

  // 倒计时
  onGetCaptcha = () => {
    let count = 59;
    this.setState({ count })
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval)
      }
    }, 1000);
  }

  render() {
    const { form, login } = this.props;
    const { getFieldDecorator } = form;
    const { count, type } = this.state;

    return (<div className={styles.main}>
      <Form onSubmit={this.handleSubmit}>
        <Tabs animated={false} className={styles.tabs} activeKey={type} onChange={this.onSwitch}>
          <TabPane tab="账户密码登陆" key="account">
            {
              login.status === 'error'
              && login.type === 'account'
              && login.submitting === 'false'
              && this.renderMessage('账户密码错误')
            }
          </TabPane>
          <FormItem>
            {
              getFieldDecorator('userName', {
                rules: [{
                  required: type === 'acount',
                  message: '请输入用户名',
                }]
              })(
                <Input size="large"
                       prefix={<Icon type="user"
                                     className={styles.prefixIcon}
                                     placeholder="admin" />} />
                )}
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('password', {
                rules: [{
                  required: type === 'account',
                  message: '请输入密码',
                }]
              })(<Input prefix={<Icon type="lock" className={styles.prefixIcon} />}
                        type="password"
                        placeholder="admin" />)
            }
          </FormItem>
          <FormItem>
            {getFieldDecorator('mobile', {
              rules: [{
                required: type === 'mobile', message: '请输入手机号！',
              }, {
                pattern: /^1\d{10}$/, message: '手机号格式错误！',
              }],
            })(
              <Input
                size="large"
                prefix={<Icon type="mobile" className={styles.prefixIcon} />}
                placeholder="手机号"
              />
            )}
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('captcha', {
                  rules: [{
                    required: type === 'mobile', message: '请输入验证码！',
                  }],
                })
                (<Input
                  size="large"
                  prefix={<Icon type="mail" className={styles.prefixIcon} />}
                  placeholder="验证码"
                />)}
              </Col>
              <Col span={8}>
                <Button disabled={count}
                        className={styles.getCaptcha}
                        size="large"
                        onClick={this.onGetCaptcha}>{ count ? `${count} s` : '获取验证码' }</Button>
              </Col>
            </Row>
          </FormItem>
        </Tabs>
        <FormItem className={styles.additional}>
          {
            getFieldDecorator('remember', {
              valuePropName: 'checked',
              initalValue: true,
            })(<Checkbox className={styles.autoLogin}>自动登陆</Checkbox>)
          }
        </FormItem>
      </Form>
      <div className={styles.other}>
        其他登陆方式
        <span className={styles.iconAlipay} />
        <span className={styles.iconTaobao} />
        <span className={styles.iconWeibo} />
        <Link className={styles.register} to="/user/register">注册账户</Link>
      </div>
    </div>)
  }
}

@connect(state => ({
  login: state.login,
}))
@Form.create() //修饰器用来修饰原始组件
