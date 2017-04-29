'use strict'
const path = require('path');
const express = require('express');

let app = express();

let appData = require('./data.json');
let seller = appData.seller;
let goods = appData.goods;
let ratings = appData.ratings;
let apiRoutes = express.Router();

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
app.use('/api', apiRoutes);

process.on('uncaughtException', function (err) {
    console.error(err.stack);
})

app.listen(3452, () => {
	console.log('服务器开启成功')
})
