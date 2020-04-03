import React from 'react';
import {Icon, Flex, WhiteSpace} from 'antd-mobile';

export default () => {
  return (
    <Flex justify="center" align="center" alignContent="center" style={{height: '100%', textAlign: 'center'}}>
      <Flex.Item >
        <Icon type="loading" size="lg"/>
        <WhiteSpace size="lg" />
        <span>检查用户登录状态...</span>
      </Flex.Item>
    </Flex>
  );
}
