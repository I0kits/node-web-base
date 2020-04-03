# minapp-cloud


### Tasks
* [] Database integration.
* [] Setup logger.
* [] Integration with QQ/Dingding login by [passport](https://github.com/jaredhanson/passport)


### Refs
* [uni-app](https://uniapp.dcloud.io)
* [node-express-realworld](https://github.com/gothinkster/node-express-realworld-example-app)

### Commands
```
export HOSTNAME=http://localhost:3000

curl -X POST -H "Content-Type: application/json" \
  -d '{"account":"admin","password":"1234"}' \
  ${HOSTNAME}/api/login
  
  
  
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODU4MTM3NjAsImV4cCI6MTU4NTgxNzM2MCwibmFtZSI6IueuoeeQhuWRmCIsImljb24iOiJhIHBpY3R1cmUiLCJyb2xlIjoiQURNSU4ifQ.EDh_5A6fOaahnXPV6dK98CxlmtxTYwwLmYVeU_dvXcg" ${HOSTNAME}/api/check
```  



### Helper
* 宜搭(https://yida.alibaba-inc.com)
* itrace(https://wpk.ucweb.com/index)
* 真机测试(http://irma.alibaba-inc.com)
* 机器人工场(http://robot.alibaba-inc.com/index.htm)
* 办公产品联盟(https://yida.alibaba-inc.com/s/x10)
