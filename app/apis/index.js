const buildUsersHandler = (router)=> {
  router.get('/users', (req, res, next) => {
    res.json([
      {id: 1, name: 'Wangwei'},
      {id: 2, name: "Zhuangzhang"}
    ]).end();
  });

  return router;
};


export default {
  mount: (uri, app, router) => {

    buildUsersHandler(router);

    app.use(uri, router);
  }
}
