var Mock = require('mockjs')

Mock.mock('/user/userInfo', 'get', require('./json/comlist'));