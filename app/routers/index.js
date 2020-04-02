import login from './apis/login';
import users from './apis/users';


export default {
  mount: (uri, app, router) => {
    login.mount(router);
    users.mount(router);

    app.use(uri, router);
  }
}
