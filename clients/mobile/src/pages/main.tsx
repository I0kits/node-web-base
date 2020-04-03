import React from 'react';
import {useRequest} from "umi";
import { Button } from 'antd-mobile';


function getUsername3() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({success: true, data: {name: 'wangwei' }});
    }, 3000);
  });
}

export default () => {
  const {data, error, loading} = useRequest(getUsername3);
  console.log('render for main page');
  return (
    <div>
      <h1>Main Page</h1>
      { loading && <div>loading...</div> }
      { error && <div>failed to load</div> }
      <Button>Start</Button>
    </div>
  );
}
