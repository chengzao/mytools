const elementVnode = {
  tag: "div",
  text: "VNode"
};
function render(vnode, container) {
  mountElement(vnode, container);
}

function mountElement(vnode, container) {
  // 创建元素
  const el = document.createElement(vnode.tag);
  el.innerHTML = vnode.text;
  // 将元素添加到容器
  container.appendChild(el);
}

render(elementVnode, document.getElementById("vnode"));
