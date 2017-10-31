import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Table, Icon, Divider } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="">Action 一 {record.name}</a>
      <Divider type="vertical" />
      <a href="">Delete</a>
      <Divider type="vertical" />
      <a href="" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

class IndexComponent extends PureComponent {

  componentDidMount() {
    this.props.dispatch({
      type: 'user/fetch',
    });
  }

  render() {
    const { user: { list, loading } } = this.props;
    return (
      <div>
        <Row gutter={24}>
          <Col span={8}>
            <Card bordered={false}>
              <p>blank</p>
              <p>blank</p>
              <p>blank</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <p>blank</p>
              <p>blank</p>
              <p>blank</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <p>blank</p>
              <p>blank</p>
              <p>blank</p>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: 24 }}>
          <Col span={12}>
            <Card bordered={false}>
              <p>blank</p>
              <p>blank</p>
              <p>blank</p>
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <p>blank</p>
              <p>blank</p>
              <p>blank</p>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} style={{marginTop: 24 }}>
          <Col span={24}>
            <Card
              title="表格"
              extra={<Icon type="setting" />}
              bordered={false}>
              <Table dataSource={list} columns={columns} loading={loading} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(state => ({
  user: state.user,
}))(IndexComponent);
