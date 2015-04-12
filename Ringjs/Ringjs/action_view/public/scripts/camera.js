$(function (){
   navigator.getMedia = (  navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia );

   //端末のCameraのstreamデータを流すVideoタグ
   var video = document.getElementById('camera');

   //StreamデータをDataURL化するために一時的に貼付けるCanvasタグ
    var canvas = document.getElementById('camera_canvas');
    var ctx = canvas.getContext('2d');

    //DataURLを貼付けるimgタグ
    var image1 = document.getElementById('camera_image1');

    //Videoタグ
    navigator.getMedia ({ video:true, audio:true }, function(stream) {
        video.src = window.URL.createObjectURL(stream);
    }, function(err){console.log(err);});

    function cameraToImage(modifyFunc,img){
        var canvas_image = ctx.drawImage(video,0,0,400,300);
        canvas_image = ctx.getImageData(0, 0, 400, 300);
        modifyFunc(canvas_image.data);
        ctx.putImageData(canvas_image, 0, 0);

        var dataURL = canvas.toDataURL("image/octet-stream");
        img.src = dataURL;
    }

    // //動画から画像を生成
    // setInterval(function(){
    //     cameraToImage(toGlayScale,image1);
    //     cameraToImage(toBlackWhite,image2);
    //     cameraToImage(toRedNoise,image3);
    // }, 200);

    $('#ss').click( function (){
      cameraToImage(toGlayScale,image1);
    } );

    //Effect function : glayscale
    function toGlayScale(pixel){
        for (var i = 0, n = pixel.length; i < n; i += 4) {
            var gr = pixel[i  ] * 0.2 + pixel[i+1] * 0.2 + pixel[i+2] * 0.2;
            pixel[i  ] = gr; //R
            pixel[i+1] = gr; //G
            pixel[i+2] = gr; //B
        }
    }

    $('img').click(function(){
        var dataURL = $(this).attr('src');
        var $img = $('<img>').attr('src', dataURL);
        $($img).prependTo('#snapshot');
    });

});