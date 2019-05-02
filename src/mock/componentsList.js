var Mock = require('mockjs')

Mock.mock('/user/userInfo', 'get', require('./json/comlist.json'));
Mock.mock('/magiCube/webData', 'get', require('./json/weblist.json'));