var express = require('express'),
    app = express(),
    server = require('http').createServer(app);
    io = require('socket.io')(server),
    path = require('path'),
    fs = require('fs');

server.listen(3000);

// 設定
var shots = require('./routes/shots');
app.set('view engine', 'ejs');
app.set('view options',{layout:false});

// 使用
app.use('/shots', shots);
app.use(express.static(path.join(__dirname, 'public')));


// getリクエスト
app.get('/', function(req, res){

  var url_data = '';

  // getリクエストがあるかどうか
  if(!is_arrays(req.query)){

    console.log(req.query);

    // 引数の整形
    for (key in req.query) {
      url_data = req.query[key];
    };

    // データを送信　ブラウザ用
    io.sockets.on('connection', function (socket) {
      io.sockets.emit( 'url_params', url_data );
    });

    // データを送信　Ring用
    io.sockets.emit( 'url_params', url_data );

  }

  // viewのレンダー
  res.render( 'index', { url_data: url_data } );

});

io.sockets.on('connection', function (socket)
{

  // screen shot データ受信
  socket.on( 'screen_shot_server', function(data){

    // 送信者以外のユーザーにデータを送信
    io.sockets.emit( 'post_screen_shot', data );

  } );

});

function is_arrays(arrays){
  for(var val in arrays) return false;
  return true;
}



