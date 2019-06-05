function init() {
  var $canvas = document.createElement("canvas");
  $canvas.width = document.body.clientWidth || document.documentElement.clientWidth;
  $canvas.height = document.body.clientHeight || document.documentElement.clientHeight;

  var ctx = $canvas.getContext('2d');

  ctx.font = "30px Verdana";
  // 创建渐变
  var gradient = ctx.createLinearGradient(0, 0, $canvas.width, 0);
  gradient.addColorStop("0", "magenta");
  gradient.addColorStop("0.5", "blue");
  gradient.addColorStop("1.0", "red");
  // 用渐变填色
  ctx.fillStyle = gradient;
  ctx.fillText("w3school.com.cn", 10, 90);

  ctx.stroke();

  $canvas.classList.add("ouzz__top");

  var hasC = document.querySelector('.ouzz__top');
  if (hasC == null) {
    document.body.appendChild($canvas);
  }
}
// init();

  // tab
  // chrome.tabs.getCurrent(function(tab) {
  //   console.log('tab',tab);

  //   chrome.tabs.sendMessage(tab.id, {
  //     method: 'tab',
  //     message: 'get active tab'
  //   }, function(response) {});
  // });