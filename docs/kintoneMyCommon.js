//どのアプリも、一覧画面からアプリ概要・詳細情報、更新履歴へのリンクを追加するためのもの
//アプリ「アプリまとめ」でこれらの情報を管理する。

jQuery.noConflict();
//2018-01-04 追加（ kintone.api.urlメソッドだけでは適応できなかったため）
var isGuestSpace=false;
if(location.href.indexOf("/guest/")!=-1)isGuestSpace = true;
console.log("ゲストスペースか否か" + isGuestSpace);

(function($) {
   "use strict";
   
   //ポップアップメニューの表示 http://glow-factory.com/blog_web/jquery/jquerypopmenu/
   
   $('body').append('<div class="popmenu-box"><span class="pop_ctrl icon-menu"></span><ul id="popmenu"><li>ホーム</li><li>投稿</li><li>ログイン</li><li>新着</li><li>画像</li><li>メール</li><li>Facebook</li><li>Twitter</li><li>設定</li></ul></div>');
   
   $('.popmenu-box').popmenu();
   
   kintone.events.on("app.record.index.show", function(e) {
      var 更新日時等 = 'ver0.920 共通JS更新日時 平成30年2月6日 02時17分';
        $('body').append('<div>'+更新日時等+'</div>');
        console.info("共通Javascript更新日時＝"+更新日時等);

        var アプリ一覧アプリid = 2370
        var appId = kintone.app.getId();
        var レコードID ;
        console.log(appId);
        //https://(サブドメイン名).cybozu.com/k/guest/(スペースのID)/v1/record.json
        var body = {
            //"app": appId,
            //"app": 2370, //アプリ「アプリ一覧」のアプリID
            "app": アプリ一覧アプリid,
            //"id": 1001 //レコードID
            //"id": 429
            "query": "アプリID=" + appId //クエリで取得するには、recordではなく、record"s" ！
            //"query": "アプリID=\"2367\"",
            //"fields": ["$id", "アプリID"] //返ってくるフィールドを指定する場合
        };
        
        //kintone.api(kintone.api.url('/k/v1/record', true), 'GET', body, function(resp) {
        var apiStr = '/k/v1/records';
        if(isGuestSpace == false) apiStr = '/k/guest/47/v1/records';
        kintone.api(kintone.api.url(apiStr, true), 'GET', body, function(resp) {//🔴urlメソッドを使えば、「guestスペースかどうかは無関係」は嘘だった・・・
            //console.log(resp);
            レコードID = resp.records[0].レコード番号.value;
            //アプリ「アプリ一覧」のレコードのうち、アプリIDが appId(自身のアプリID) のレコードの詳細画面を開く
            //一覧画面の上部に追加（本当は、「・・・」のメニューの中に追加したいが、できなかった
            $('.gaia-argoui-app-toolbar').append('<a target="_blank" href="https://musashi.cybozu.com/k/guest/47/'+アプリ一覧アプリid+'/show#record='+レコードID+'" title="アプリ更新情報、アプリ概要等を表示します。"><img src="https://ssatoh17.github.io/cdn/img/Info-icon.png" style="height:20px;margin-bottom:14px;margin-left:-13px;" alt="アプリ更新情報、アプリ概要等を表示します。"></a>');           
            //$('.gaia-argoui-app-toolbar').prepend('<a target="_blank" href="https://musashi.cybozu.com/k/guest/47/'+アプリ一覧アプリid+'/show#record='+レコードID+'" title="アプリ更新情報、アプリ概要等を表示します。"><img src="https://ssatoh17.github.io/cdn/img/Info-icon.png" style="height:20px;"></a>'); //左側に表示される          
            //以下は🔴無効
            //$('.gaia-argoui-pulldown').prepend('<a target="_blank" href="https://musashi.cybozu.com/k/guest/47/'+アプリ一覧アプリid+'/show#record='+レコードID+'" title="アプリ更新情報、アプリ概要等を表示します。">app更新履歴他</a>'); //🔴無効（表示されない）
            //$('.gaia-argoui-pulldown').append('<a target="_blank" href="https://musashi.cybozu.com/k/guest/47/'+アプリ一覧アプリid+'/show#record='+レコードID+'" title="アプリ更新情報、アプリ概要等を表示します。">app更新履歴他</a>');  //🔴無効（表示されない）
        }, function(error) {    //❌error時
            console.log(error);
        });
   });
})(jQuery);
