import auth from '../auth';

export default {
  mount: (router)=> {
    router.get('/users', auth.required, function(req, res, next){
      return res.json([
        {id: 1, name: 'Wangwei'},
        {id: 2, name: "Zhuangzhang"}
      ]).end();
    });
  }
}
