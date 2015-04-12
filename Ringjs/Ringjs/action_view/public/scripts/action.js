$(function(){

  var canvas = $('#canvas_mv')[0],
      ctx = canvas.getContext('2d'),
      W = canvas.width = window.innerWidth,
      H = canvas.height = window.innerHeight,
      r = 10,
      particles = [],
      particle_count = 100,
      pFa = $('.fa'),
      pSa = $('.sa'),
      main = $('#main'),
      canvas = $('#canvas_mv'),
      viewSpeed = 3000;

  for(var i = 0; i < particle_count; i++) {
    particles.push(new particle());
  }

  //-------------------------------------------------------------------
  /**
   * startイベント
   */

  if(!getCookie('view_old')){
    // view_content();
    // setCookie('view_old','viewed',7);
    canvas_on();
  }else{
    canvas_on();
  }

  function view_content(){
    pFa.fadeIn(viewSpeed, function() {
      $(this).fadeOut(viewSpeed*1.5, function() {
      });
      pSa.fadeIn(viewSpeed*1.7, function() {
        $(this).fadeOut(viewSpeed, function() {
        });
        main.fadeOut(viewSpeed, function() {
          canvas.fadeIn('show', function() {
          });
        });
      });
    });
  }

  function canvas_on(){
    main.hide();
    canvas.show();
  }

  //-------------------------------------------------------------------
  /**
   * keyイベント
   */

  var keyCode = false;
  var kc = false;
  var chr = false;
  window.document.onkeydown = function(evt){
    if (evt){
      kc = evt.keyCode;
      }else{
      kc = event.keyCode;
    }
    chr = String.fromCharCode(kc);
    keyCode = {
      'kc': kc,
      'chr': chr
    };

    for(var i = 0; i < particles.length; i++) {
      console.log(particles[i].radius += keyCode.kc / 4 );
    }
    console.log(keyCode.kc);

    return keyCode;
  }

   window.document.onkeyup = function(){
    for(var i = 0; i < particles.length; i++) {
      console.log(particles[i].radius -= keyCode.kc / 5 );
    }
  }

  //-------------------------------------------------------------------
  /**
   * mouseイベント
   */

  var cursor = false;
  $('body').mousemove(function(e){
      cursor = {
          x:e.pageX,
          y:e.pageY
      };
      return cursor;
  });

  // var test = new test();
  // test.aaa();

  // function test (){
  //   this.aaa = function(){
  //       console.log('123456789');
  //   }
  // }

  //-------------------------------------------------------------------
  /**
   * 丸の生成
   */

  function particle() {
    this.speed = { x: -(r / 2) + Math.random() * r, y: -(r / 2) + Math.random() * r };
    this.location = { x: W / 2, y: H / 2 };
    if(cursor){
        // p.location.x = cursor.x;
        // p.location.y = cursor.y;
        this.location = { x: cursor.x, y: cursor.y };
    }
    this.radius = 10 + Math.random() * 20;
    this.life = 20 + Math.random() * 10;
    this.remaining_life = this.life;
  }

  //-------------------------------------------------------------------
  /**
   * draw関数
   */

  function draw() {

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, W, H);
    for(var i = 0; i < particles.length; i++) {
      var p = particles[i];
      //console.log(p.location);
      ctx.beginPath();
      p.opacity = Math.round(p.remaining_life / p.life * 100) / 100;
      ctx.fillStyle = 'rgba(118, 248, 219, ' + p.opacity + ')';
      ctx.strokeStyle = 'rgba(118, 248, 219, ' + p.opacity + ')';
      ctx.arc(p.location.x, p.location.y, p.radius, Math.PI * 2, false);
      // ctx.fill();
      ctx.stroke();
      p.remaining_life--;
      p.radius--;
      p.location.x += p.speed.x;
      p.location.y += p.speed.y;
      if(p.remain_life < 0 || p.radius < 0) {
        particles[i] = new particle();
      }
    }
    // cursor = false;
  }

  setInterval(draw, 33);

  //-------------------------------------------------------------------
  /**
   * cookie
   */

  // クッキー保存　setCookie(クッキー名, クッキーの値, クッキーの有効日数); //
  function setCookie( c_name, value, expiredays ){
    // pathの指定
    var path = location.pathname;
    // pathをフォルダ毎に指定する場合のIE対策
    var paths = new Array();
    paths = path.split("/");
    if(paths[paths.length-1] != ""){
        paths[paths.length-1] = "";
        path = paths.join("/");
    }
    // 有効期限の日付
    var extime = new Date().getTime();
    var cltime = new Date(extime + (60*60*24*1000*expiredays));
    var exdate = cltime.toUTCString();
    // クッキーに保存する文字列を生成
    var s="";
    s += c_name +"="+ escape(value);// 値はエンコードしておく
    s += "; path="+ path;
    if(expiredays){
        s += "; expires=" +exdate+"; ";
    }else{
        s += "; ";
    }
    // クッキーに保存
    document.cookie=s;
  }

  // クッキーの値を取得 getCookie(クッキー名); //
  function getCookie(c_name){
    var st="";
    var ed="";
    if(document.cookie.length>0){
        // クッキーの値を取り出す
        st=document.cookie.indexOf(c_name + "=");
        if(st!=-1){
            st=st+c_name.length+1;
            ed=document.cookie.indexOf(";",st);
            if(ed==-1) ed=document.cookie.length;
            // 値をデコードして返す
            return unescape(document.cookie.substring(st,ed));
        }
    }
    return "";
  }

});