// 发送消息

let MessageInfo = '';
let loading = document.querySelector('.loading');

chrome.runtime.sendMessage({
  method: 'showAlert'
}, function (response) {
  // response 代表消息回复，可以接受到通过 sendResponse 方法发送的消息回复
  // console.log('response',response);
  MessageInfo = response.message;
  console.log(MessageInfo);

  if(MessageInfo){
    loading.classList.add('hide');
    let ele = document.querySelector('.myicon-container');
    let str = `
      <div class="logo">
        <img src="${MessageInfo.avatar_url}">
      </div>
      <div class="detail-info">
        <p>${MessageInfo.bio}</p>
        <p>Repos: ${MessageInfo.public_repos}</p>
        <a target="_blank" href="${MessageInfo.html_url}">@${MessageInfo.login}</a>
      </div>
    `;
    ele.innerHTML = str;
  }
  return true;
});

// connect
var port = chrome.runtime.connect({name: "connection"});
port.postMessage({method: "add"});

port.onMessage.addListener(function(msg) {
  if (msg.method === "answer") {
    console.log(msg.data);
  }
});

// (async function(){
//   let datas = await fetch('https://api.github.com/users/chengzao');
//   let data2 = await datas.json();
//   console.log('data',data2);

//   let ele = document.querySelector('.container');

//   let  str =  `
//     <img src="${data2.avatar_url}">
//     <p>${data2.bio}</p>
//   `;
//   ele.innerHTML = str;

// })()