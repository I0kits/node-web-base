const getUserInfo = (req, res) => {
  res.json({name: 'Rex'}).end();
};

export default {
  mount: (router) => {
    router.get('/user', getUserInfo);
  }
}
