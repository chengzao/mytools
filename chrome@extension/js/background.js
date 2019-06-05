// message 就是你发送的 message
// sender 代表发送者，可以通过 sender.tab 判断消息是否是从内容脚本发出
// sendResponse 可以直接发送回复，如：

  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    alert(JSON.stringify(message))
    let str = JSON.stringify(message);
    if (message.method === 'get_selection') {
      sendResponse({
        method: 'response',
        message: message
      });
    }

    if (message.method === 'showAlert') {
    (async function fn(){
      let datas = await fetch('https://api.github.com/users/chengzao');
      let data2 = await datas.json();
        sendResponse({
          method: 'response',
          message: data2
        });
    })()
  }
    // 异步需要返回true  
    return true;
  });

  // connect
  chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name == "connection");
    port.onMessage.addListener(function(msg) {
      if(msg.method == "add"){
        var result = 'THIS IS RESULT';  
        port.postMessage({
          method: "answer",
          data: result
        });
      }
    });
  });
