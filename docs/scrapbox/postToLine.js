        //jQuery https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js のロードは済んでいるのが前提
        
    	var accessToken = '10iU3TBW1R8uQuF2nou7uTTaqlgrPZmodvhP5349rv5'; //公開してしまうとこのkeyが流出してしまうおそれがある

        var url = 'https://notify-api.line.me/api/notify';
    	function Lineに通知(msg) {
		    var message = msg; //'🔴関数名を日本語にすると送れないので注意！'; ← 
			$.ajax({
			  type: "POST",
			  headers: {
			  	'Content-Type':'application/x-www-form-urlencoded',
			    'Authorization': 'Bearer ' + accessToken
			  },
			  url: url,
			  data: { message: msg },
			  success: function(rtn) {
			  		console.log(rtn);
			  }
		    });
		}

    	var title = "";
    	var body = "";
    	
    	//$("#title").val("テスト2018-04-28"); //これだとchangeイベントは発火しない！
    	//$("#body").val("テスト2018-04-28_12");
    	
    	
    	var a = document.getElementById("scrapboxに登録");
    	$('#タイトル').on('change',function(e){    		
    		title = $(this).val(); console.log(title);
    	});
    	$('#本文').on('change',function(e){    		
    		body = $(this).val(); console.log(body);
		});
			
    	//aタグのクリック（Enterで実行時も発火）時に自分のhref属性のURLへ変移させるクリックイベントを書く。
    	$('#scrapboxに登録').click(function(e){
    		console.log("クリックされました");
    		$(this).attr('href',"https://scrapbox.io/ssatoh17/" + title + "?body=" + body);
    		var href = $(this).attr('href',"https://scrapbox.io/ssatoh17/" + title + "?body=" + body);
    		
    		var href2 = "https://scrapbox.io/ssatoh17/ScrapboxWebアプリでの登録ログ?body=[" + title + "]";
    		$('#scrapboxに連続登録').attr('href',href2);
    		
    		setTimeout(function(){
    			console.log("別のaタグをクリックします（setTimeoutで実行）");
    			$("#scrapboxに連続登録")[0].click();
    		},500);
    		
    		Lineに通知(title); //🌟Lineに「Line Notifyが」通知
    		
    		//初期化
    		$('#本文').val(''); //これでchangeイベントは発生しない（＝変数title,bodyは変わらない）ので安心してください
    		$('#タイトル').focus();
    		$('#タイトル').val('');
    	});    	    	    		
		
			//ブラウザ名の表示
		$("#ブラウザ名").text(navigator.appName + "：" + navigator.appVersion);

		var d = document;
		var f = document.getElementById('formForCrossDomainAccess'); //なんかのフォーム Element
		var b = document.getElementById('submitButton'); // なんかのサブミットボタン Element
		// サブミットボタンにイベント登録
		b.addEventListener('click',function(e){
			// クロスドメインポスト用隠し iframe
			var i = d.createElement('iframe');
			i.style.display = 'none';
			d.body.appendChild(i);

			// レスポンスイベント取得用隠し iframe
			var i2 = d.createElement('iframe');
			i2.name = 'postresult';
			i2.style.display = 'none';
			d.body.appendChild(i2);

			// レスポンス時イベント登録
			//i2.contentWindow.addEventListener('unload', function(e) {
			i2.contentWindow.addEventListener('unload', function() {
				f.submit();
			}, false);
			// クロスドメインへの POST メソッド送信
			var iDoc = i.contentWindow.document;
			iDoc.open();
			//iDoc.write('<form method="POST" action="http://twitter.com/statuses/update.xml" target="postresult">');
            //https://notify-api.line.me/api/notify
            iDoc.write('<form method="POST" action="'+ url +'" target="postresult">');
			//iDoc.write('<input type="hidden" name="status" value="ポストしたい内容" />');
			iDoc.write('<input type="hidden" name="status" value="test2018-05-06" />');
			//iDoc.write('</form>');
			iDoc.write('</form>');
			iDoc.close();
			iDoc.write('<script>window.onload = function(){document.forms[0].submit();}</script>');
			// サブミットボタン本来の動作をキャンセル
			e.preventDefault();					
		}, false);
