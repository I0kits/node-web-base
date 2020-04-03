import { history, getDvaApp } from 'umi';

import auth from '../apis/auth';
import {update} from '../helper/current-user';

export default {
  namespace: 'app',
  state: {
    user: {},
  },
  subscriptions: {
    setup({dispatch}) {
      dispatch({type: 'check'})
    }
  },
  effects: {
    * check({payload}, {put, call}) {
      try {
        const resp = yield call(auth.check);
        yield put({ type: 'updateState', payload: { user: resp.data }});
        history.push('/main');
      } catch (err) {
        history.push('/login');
      }
    },
    * login({payload}, {call, put}) {
      try {
        const resp = yield call(auth.login, payload);
        yield put({ type: 'updateState', payload: { user: resp.data }});
        history.push('/main');
      } catch(err) {
        console.log('Login error:', err);
      }
    }
  },
  reducers: {
    updateState(state, { payload }) {
      if(!_.isEmpty(payload.user)) update(payload.user);
      return { ...state, ...payload }
    }
  }
};
