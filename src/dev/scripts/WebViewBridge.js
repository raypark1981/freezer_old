/**
 * Created by Guy Blank on 3/9/17.
 *
 *  This is a sample provides an API to send & receive messages to and from the React-Native WebView (using postMessage/onMessage WebView API).
 *  A sample project that uses the bridge is available here https://github.com/blankg/rn-webview-bridge-sample
 *
 *  webViewBridge.send('functionToInvoke', {mydata: 'test'}, function(){console.log('success')},function(){console.log('error')});
 *
 *  The API is designed to be similar to the Cordova exec API so migration to it should be almost seamless.
 *  The API also provides solution to a React-Native WebView bug in iOS which causes sending consecutive postMessage calls to override each other.
 *
 *  Handling message on the React-Native side:
 *   <WebView
 *       ref={webview => { this.myWebView = webview; }}
 *       onMessage={this.onWebViewMessage}
 *  />
 *
 *  onWebViewMessage(event) {
 *      // post back reply as soon as possible to enable sending the next message
 *      this.myWebView.postMessage(event.nativeEvent.data);
 *
 *      let msgData;
 *      try {
 *          msgData = JSON.parse(event.nativeEvent.data);
 *      }
 *      catch(err) {
 *          console.warn(err);
 *          return;
 *      }
 *
 *      // invoke target function
 *      const response = this[msgData.targetFunc].apply(this, [msgData]);
 *      // trigger success callback
 *      msgData.isSuccessfull = true;
 *      msgData.args = [response];
 *      this.myWebView.postMessage(JSON.stringify(msgData))
 *  }
 * 
 * 		################################################################ native > webview 쪽으로 동작 내용 ####################################################################################
 * 		****** native 에서 아래와 같이 호출 webview 쪽으로  ******
 *		>>  funcCallWebviewPostMessage 이한수는 window.postMessage를 바인딩 해놓은것임 funcCallWebviewPostMessage 실행하면 전역적으로 window.postMessage를 호출하는거랑 같은 기능
 * 		 var msg = createPostMessage('toggleRightMenu' , null );
            // webView 에 함수 호출 대표 핸들러
			this.props.funcCallWebviewPostMessage(msg);
		

		****** 웹에서 동작 하는거임 ********

		위의 funcCallWebviewPostMessage 로 호출한 것을 받아오는곳
 *      전역으로 쓸 함수 바인딩 셋팅하고 전역 이벤트를 바인딩 해둠.. native 웹에서 호출시 window 객체 안에 바인딩 되어있는 전역 함수가 실행됨
        if(window._appBridge == undefined){
            window._appBridge = {
                //함수이름 : 함수
                toggleRightMenu : this.toggleRightMenu.bind(this) , 
            }
		}
		################################################################ native > webview 쪽으로 동작 내용 ####################################################################################




		################################################################ webView > native 쪽으로 동작 내용 ####################################################################################

		WebViewBridge.js 에서 send 메세지 바인딩 해놓음 전역용으로..
		>> window.webViewBridge.send('handleFooterVisible' , 'N' , function (){ } , function (){ });

		WebView Component 에 이벤트 onWebViewMessage 에서  postMessage를 받게 셋팅해둠
		handleFooterVisible 이벤트가 일어날꺼임
		
		################################################################ webView > native 쪽으로 동작 내용 ####################################################################################
 *
 */
(function(){

	var promiseChain = Promise.resolve();

	var callbacks = {};

	var init = function() {

		const guid = function() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			}
			return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
		}

		window.webViewBridge = {
			/**
			 * send message to the React-Native WebView onMessage handler
			 * @param targetFunc - name of the function to invoke on the React-Native side
			 * @param data - data to pass
			 * @param success - success callback
			 * @param error - error callback
			 */
			send: function(targetFunc, data, success, error) {
				var msgObj = {
					targetFunc: targetFunc,
					data: data || {}
				};

				if (success || error) {
					msgObj.msgId = guid();
				}

				var msg = JSON.stringify(msgObj);

				promiseChain = promiseChain.then(function () {
					return new Promise(function (resolve, reject) {
						console.log("sending message " + msgObj.targetFunc);

						if (msgObj.msgId) {
							callbacks[msgObj.msgId] = {
								onsuccess: success,
								onerror: error
							};
						}
						
						console.log('in postmssage new!@!@!@')
						try{
							window.postMessage(msg , '*');
						}
						catch(e){
							alert(e)
						}
						

						resolve();
					})
				}).catch(function (e) {
					console.error('rnBridge send failed ' + e.message);
				});
			},


		};

		window.document.addEventListener('message', function(e) {
			console.log("message received from react native");

			var message;
			try {
				message = JSON.parse(e.data)
				// alert(message);
			}
			catch(err) {
				console.error("failed to parse message from react-native " + err);
				return;
			}
			
			if(window._appBridge != undefined){
				try{
					window._appBridge[message.targetFunc].apply(null , message)
				}
				catch(e){
					alert('App 전역에서 함수를 생성하세요')
				}
			}
			
		});
	};

	init();
}());
