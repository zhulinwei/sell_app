'use strict'
const path = require('path');
const express = require('express');

let app = express();

let appData = require('./data.json');
let seller = appData.seller;
let goods = appData.goods;
let ratings = appData.ratings;
let apiRoutes = express.Router();
// app.set('views', path.resolve(__dirname,'views'));
// app.set('view engine', 'html');
// app.engine('.html', require('ejs').__express);
// ejs.delimiter = "$";

apiRoutes.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  });
});

apiRoutes.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  })
});

apiRoutes.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  });
});

app.use(express.static('./dist'));
// app.use('/',function(req,res,next){
//     console.log('a');
//     res.render('./index.html');
//     next();
// })

app.use('/api', apiRoutes);

let config = require('./config');
let port = process.env.PORT || config.dev.port;
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}
// let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// app.use(staticPath, express.static('./static'));

process.on('uncaughtException', function (err) {
    console.error(err.stack);
})

app.listen(3452, () => {
	console.log('服务器开启成功')
})
