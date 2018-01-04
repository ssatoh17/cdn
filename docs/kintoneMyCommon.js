jQuery.noConflict();
(function($) {
   "use strict";
   kintone.events.on("app.record.index.show", function(e) {
        $('body').append('<div>abcdef</div>');

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
        kintone.api(kintone.api.url('/k/guest/47/v1/records', true), 'GET', body, function(resp) {    // success
            console.log(resp);
            console.log(resp.records[0].レコード番号.value);
            //レコードID = resp.レコード番号; // undefined
            レコードID = resp.records[0].レコード番号.value;
            //アプリ「アプリ一覧」のレコードのうち、アプリIDが appId(自身のアプリID) のレコードの詳細画面を開く
            //一覧画面の上部に追加（本当は、「・・・」のメニューの中に追加したい
            //$('.gaia-argoui-app-toolbar').append('<a target="_blank" href="https://musashi.cybozu.com/k/guest/47/'+アプリ一覧アプリid+'/show#record='+レコードID+'">app更新履歴他２</a>');
            $('.gaia-argoui-app-toolbar').append('<a target="_blank" href="https://musashi.cybozu.com/k/guest/47/'+アプリ一覧アプリid+'/show#record='+レコードID+'" title="アプリ更新情報等の表示"><img src="https://ssatoh17.github.io/cdn/img/Info-icon.png" style="height:20px;" alt="アプリ更新情報、アプリ概要等を表示します。"></a>');           
            $('.gaia-argoui-app-toolbar').prepend('<a target="_blank" href="https://musashi.cybozu.com/k/guest/47/'+アプリ一覧アプリid+'/show#record='+レコードID+'"><img src="https://ssatoh17.github.io/cdn/img/Info-icon.png" style="height:20px;"></a>');           
            $('.gaia-argoui-pulldown').prepend('<a target="_blank" href="https://musashi.cybozu.com/k/guest/47/'+アプリ一覧アプリid+'/show#record='+レコードID+'">app更新履歴他</a>');
            $('.gaia-argoui-pulldown').append('<a target="_blank" href="https://musashi.cybozu.com/k/guest/47/'+アプリ一覧アプリid+'/show#record='+レコードID+'">app更新履歴他</a>');
        }, function(error) {    // error
            console.log(error);
        });
   });
})(jQuery);
