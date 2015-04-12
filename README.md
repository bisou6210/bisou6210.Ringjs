 =================================================================

 # Ring js  
   @author Tanaka Mutsuto (bisou.web.6210@gmail.com)

 =================================================================


 ## はじめに。

 学生時代の卒業展示会で作成したものです。  
 日本初のウェアラブルデバイス「Ring」をつかって  
 ジェスチャーひとつでweb上のすべてのカメラから同時に写真が取れます。

 他にもスライドショーなど付けたい機能が多数ありましたが、  
 期間ギリギリで制作したため今のとこスクロールすると写真がみれるようになっています。

 ジェスチャーした際は画像サイズが大きいため読み込みに時間がかかります、  
 少し時間をおいてからスクロールしてください。

 使用したのは技術はvagrant node express socket通信 webRTCなどなどです。  
 初めてgithubにあげているので至らないところがあればすみません。  
 (Macでのみの動作確認になります。)

 RingZEROがもうすぐ発売されるとのことでその記念として上げておきます、どうぞ試してみてください。


 ## 使い方。(Vagrantが予め使える環境でおこなってください。)

 vagrantを立ち上げて(boxはCentOS 6.5 x86_64を使用しています。) 

 $cd /vagrant

 でディレクトリに移動。さらに「Ringjs/action_view/Ring.js」まで移動して

 $node Ring.js

 でNodeを起動して下さい。

 その後はifconfigなどでご自身のIPアドレスなどを調べて頂いた後ポートに8080を設定してやってください。

 http://自分のIPアドレス:8080

 でブラウザにアクセスできるので、カメラを許可した後「Ring」側のアプリのopen URLに

 http://自分のIPアドレス:8080?id=0003

 と設定してやればそのジェスチャーで写真がとれます。  
 複数のカメラを使用したい場合はブラウザを複数立ち上げるか、PCを複数台用意し先ほどの

 http://自分のIPアドレス:8080

 をブラウザで叩けばアクセスしている分だけ写真がとれます。