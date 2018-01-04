jQuery.noConflict();
(function($) {
   "use strict";
   kintone.events.on("app.record.index.show", function(e) {
      var 更新日時等 = 'ver0.904 共通JS更新日時 平成30年1月4日 午前9時57分';
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
        //kintone.api(kintone.api.url('/k/guest/47/v1/record', true), 'GET', body, function(resp) {
        //kintone.api(kintone.api.url('/k/guest/47/v1/records', true), 'GET', body, function(resp) {    // success
        kintone.api(kintone.api.url('/k/v1/records', true), 'GET', body, function(resp) {//🔴urlメソッドを使えば、guestスペースかどうかは無関係！（というか、guest/スペースID を指定すると動かなくなる場合があるので注意）
            //console.log(resp);
            //console.log(resp.records[0].レコード番号.value);
            //レコードID = resp.レコード番号; // undefined
            レコードID = resp.records[0].レコード番号.value;
            //アプリ「アプリ一覧」のレコードのうち、アプリIDが appId(自身のアプリID) のレコードの詳細画面を開く
            //一覧画面の上部に追加（本当は、「・・・」のメニューの中に追加したいが、できなかった
            $('.gaia-argoui-app-toolbar').append('<a target="_blank" href="https://musashi.cybozu.com/k/guest/47/'+アプリ一覧アプリid+'/show#record='+レコードID+'" title="アプリ更新情報、アプリ概要等を表示します。"><img src="https://ssatoh17.github.io/cdn/img/Info-icon.png" style="height:20px;margin-bottom:14px;margin-left:-13px;" alt="アプリ更新情報、アプリ概要等を表示します。"></a>');           
            //$('.gaia-argoui-app-toolbar').prepend('<a target="_blank" href="https://musashi.cybozu.com/k/guest/47/'+アプリ一覧アプリid+'/show#record='+レコードID+'" title="アプリ更新情報、アプリ概要等を表示します。"><img src="https://ssatoh17.github.io/cdn/img/Info-icon.png" style="height:20px;"></a>'); //左側に表示される          
            //$('.gaia-argoui-pulldown').prepend('<a target="_blank" href="https://musashi.cybozu.com/k/guest/47/'+アプリ一覧アプリid+'/show#record='+レコードID+'" title="アプリ更新情報、アプリ概要等を表示します。">app更新履歴他</a>'); //🔴無効（表示されない）
            //$('.gaia-argoui-pulldown').append('<a target="_blank" href="https://musashi.cybozu.com/k/guest/47/'+アプリ一覧アプリid+'/show#record='+レコードID+'" title="アプリ更新情報、アプリ概要等を表示します。">app更新履歴他</a>');  //🔴無効（表示されない）
        }, function(error) {    // error
            console.log(error);
        });
   });
})(jQuery);
