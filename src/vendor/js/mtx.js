(function(window){
  var config = {
    debug: false,
  };

  window.prevPage = window.location.href;

  function hackForAndroid711(configData){
    if (!window.shouldHackFor711) {
      return;
    }
    if (configData.navBar) {
      configData.navBar.left = {func: "funcBack"}
    }else{
      configData.navBar = {left: {func: "funcBack"}}
    }
    MTX.navbarLeftButtonEvent = function(){
      window.history.back()
        if (window.prevPage == window.location.href) {
          setTimeout(function(){
            MTX.doClose()
          }, 200);
        }
    }
  }

  var connectWebViewJavascriptBridge = function(callback) {
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge)
    } else {
      document.addEventListener('WebViewJavascriptBridgeReady', function() {
        callback(WebViewJavascriptBridge)
      }, false)
    }
  }

  var connectHostApp = function(callback){
    if(window.HostApp) {
      callback(window.HostApp);
    } else {
      document.addEventListener('HostAppReady', function(){
        callback(window.HostApp);
      }, false)
    }
  }

  connectWebViewJavascriptBridge(function(bridge) {
    bridge.init(function(a,b){});
  });

  var adapter = function(funcName, data, callback){
    if (funcName == "doConfig") {
      hackForAndroid711(data)
    }
    if(window.HostApp) {

      // android old
      HostApp[funcName](data, callback);
    } else {

      // ios
      connectWebViewJavascriptBridge(function(bridge){
        bridge.callHandler(funcName, data, callback);
      });

      // android new
      connectHostApp(function(HostApp){
        HostApp[funcName](data, callback);
      })
    }
  };

  let LEGAL_FUNC_NAMES = [
    "doGetRequest",
    "doGetUserInfo",
    "doPostRequest",
    "doPutRequest",
    "doDeleteRequest",
    "doGetImageFromAlbum",
    "doGetImageFromCamera",
    "doMultipartPostRequest",
    "doConfirm",
    "doShowError",
    "doLocalNotification",
    "doGetLocalNotification",
    "doCancelLocalNotification",
    "doClose",
    "doSilentClose",
    "doCloseToPre",
    "doShare",
    "doConfig",
    "doLoad",
    "doRoute",
    "doPay",
    "doSelectRegion",
    "doUnBlockUI",
    "doBlockUI",
    "doTriggerEvent",
    "doGetHtmlContent"
  ]

  let LEGAL_EVENT_NAMES = [
    "navbarLeftButtonEvent",
    "navbarRightButtonEvent",
    "commonCallback"
  ]

  var MTX = {
    config: config
  }

  if(window.HostApp){
    window.HostApp.mtxMessage = function(messageName, data) {
      if(MTX[messageName]){
        MTX[messageName](data);
      }
    }
  }

  for(var i=0; i<LEGAL_FUNC_NAMES.length; i++){
    var name = LEGAL_FUNC_NAMES[i];

    MTX[name] = (function(name){
      return function(){
        if(config.debug) {
          alert("Call Method: " + name);
        }
        if(arguments.length === 0){
          adapter(name, {}, function(){});
        } else if(arguments.length === 1) {
          if(arguments[0] !== null && typeof arguments[0] === 'object') {
            adapter(name, arguments[0], function(){});
          } else {
            adapter(name, {}, arguments[0]);
          }
        } else if(arguments.length === 2) {
          adapter(name, arguments[0], arguments[1]);
        } else {
          throw 'arguments length error ' + arguments.length;
        }
      }
    })(name);
  };

  for(var i=0; i<LEGAL_EVENT_NAMES.length; i++){
    var name = LEGAL_EVENT_NAMES[i];

    (function(name){
      connectWebViewJavascriptBridge(function(bridge){
        bridge.registerHandler(name, function(data){
          if(MTX[name]){
            MTX[name](data);
          }
        })
      })
    })(name);
  }

  window.MTX = MTX;
})(window);
