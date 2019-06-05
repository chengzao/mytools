// 获取选择的文本
function getSelectedText() {
    if (window.getSelection) {
      return window.getSelection().toString();
    } else if (document.getSelection) {
      return document.getSelection();
    } else if (document.selection) {
      return document.selection.createRange().text;
    }
  }
  // 组建信息
  function getSelectionMessage() {
    var text = getSelectedText();
    var title = document.title;
    var url = window.location.href;
    var data = {
      text: text,
      title: title,
      url: url
    };
    var message = {
      method: 'get_selection',
      data: data
    }
    return message;
  }
  // 发送消息
  function sendSelectionMessage(message) {
    //console.log('message',message);
    chrome.runtime.sendMessage(message, function(response) {
      console.log('get_selection data => ',response)
    });
  }
  // 监听鼠标松开的事件，只有在右键点击时，才会去获取文本
  window.onmouseup = function(e) {
    if (!e.button === 2) {
      return;
    }
    var message = getSelectionMessage();
    sendSelectionMessage(message);
  };

