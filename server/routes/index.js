var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple')
var moment = require('moment')

/* GET home page. */
//全局中间件，注入允许跨域的头，过滤是否登录成功，以及token是否过期
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  //浏览器发送给服务器的自定义头的key
  res.header("Access-Control-Allow-Headers", "author")
  // console.log(req.headers)
  if (!req.originalUrl === "/login") {
    var author = req.headers.author
    if (author) {
      //进行反编译,将token还原
      var token = jwt.decode(author, "key")
      //如果当前时间大于token中的时间，证明该token已经过期,则返回login:failed
      if (moment().isAfter(token.ext)) {
        return res.json({ login: "failed" })
      } else {
        next()
      }

    } else {
      res.json({ login: "failed" })
    }
  } else {
    next()
  }
})
router.post('/login', function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true");

  //服务器返回响应中允许返回的自定义头的KEY
  res.header("Access-Control-Expose-Headers", "author");
  console.log(req.body)
  var user = req.body
  var token
  //如果登录成功，则生成token
  if (user.username === 'admin' && user.password === '123')
    token = jwt.encode({ userid: 1, ext: moment().add(1, "hour") }, "key")
  console.log(token)
  res.header("author", token)
  // res.header("my","aaaa")
  res.json({ aa: 1 })
});

router.get('/home', (req, res, next) => {
  console.log('home')
  // console.log(req.headers)
  res.json({ path: "home" })
})

module.exports = router;
