# minapp-cloud


### Tasks
* [] Database integration.
* [] Setup logger.
* [] Integration with QQ/Dingding login by [passport](https://github.com/jaredhanson/passport)
* [] [deno](http://www.ruanyifeng.com/blog/2020/01/deno-intro.html)


### Refs
* [uni-app](https://uniapp.dcloud.io)
* [node-express-realworld](https://github.com/gothinkster/node-express-realworld-example-app)

### Commands
```
export TOKEN=''
export HOSTNAME=http://localhost:3000

# Login
curl -X POST -H "Content-Type: application/json" \
  -d '{"account":"admin","password":"1234"}' \
  ${HOSTNAME}/api/authors
  
# Verify token  
curl -H "Authorization: Bearer $TOKEN" ${HOSTNAME}/api/check

# List questions
curl -H "Authorization: Bearer $TOKEN" ${HOSTNAME}/api/questions

# Create Author
curl -X POST -H "Content-Type: application/json" \
  -d '{"name": "Lisa","account": "wangwii", "password": "123", "description": "This is description for Lisa."}' \
  ${HOSTNAME}/api/authors
  
# Create Question
curl -X POST -H "Content-Type: application/json" \
  -d '{"title": "Lisa","subtitle": "wangwii", "content": "This is description for question content.", "author_id": 2}' \
  ${HOSTNAME}/api/questions
```  


### Helper
* 宜搭(https://yida.alibaba-inc.com)
* itrace(https://wpk.ucweb.com/index)
* 真机测试(http://irma.alibaba-inc.com)
* 机器人工场(http://robot.alibaba-inc.com/index.htm)
* 办公产品联盟(https://yida.alibaba-inc.com/s/x10)
