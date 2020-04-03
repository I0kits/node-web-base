import _ from 'lodash';
import React from 'react';
import {createForm} from 'rc-form';
import { useDispatch, useRequest, connect } from 'umi';
import {List, InputItem, Button, Flex, WhiteSpace, Toast} from 'antd-mobile';

const formCreator = createForm();
const validateRules = {
  'account': {rules: [{required: true}]},
  'password': {rules: [{required: true}]},
};

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {errorMsg: null, loading: false}
  }

  componentWillMount() {
  }

  hasError(name:string) {
    const {getFieldError} = this.props.form;
    return !_.isEmpty(getFieldError(name));
  }

  onLogin() {
    this.props.form.validateFields((err, value) => {
      if (!_.isNil(err)) {
        const errorMsg = '请输入「用户名」和「密码」。';
        return this.setState({errorMsg});
      }

      this.props.dispatch({ type: 'app/login', payload: value })
    });
  }

  renderErrorInfo() {
    if (_.isEmpty(this.state.errorMsg)) {
      return null;
    }

    return (
      <List.Item.Brief style={{color: 'red'}}>
        {this.state.errorMsg}
      </List.Item.Brief>
    )
  }

  render() {
    let errors;
    const {getFieldProps} = this.props.form;

    return (<div style={{margin: '0 5px'}}>
      <List renderHeader={() => '请登录...'}>
        <InputItem
          clear
          placeholder="用户名称"
          error={this.hasError('account')}
          {...getFieldProps('account', { ...validateRules['account']})}>
        </InputItem>

        <InputItem
          type="password"
          name="password"
          placeholder="密码"
          error={this.hasError('password')}
          {...getFieldProps('password', { ...validateRules['password']})}>
        </InputItem>

        {this.renderErrorInfo()}

        <WhiteSpace size="lg"/>
        <Flex style={{margin: '0 5px'}}>
          <Flex.Item>
            <Button type="primary" icon="check-circle-o" onClick={this.onLogin.bind(this)}>
              登录
            </Button>
          </Flex.Item>
          <Flex.Item>
            <Button>注册</Button>
          </Flex.Item>
        </Flex>

        <WhiteSpace/>
      </List>
    </div>);
  }
}

export default connect(({ app, loading }) => ({ app, loading }))(formCreator(LoginPage))
