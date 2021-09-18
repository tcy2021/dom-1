window.dom = {
  create(string) {
    const container = document.createElement("template"); //template内可以有任意标签，但不会显示
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
  }, //将node2插入到node后面
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  }, //将node2插入到node前面
  append(parent, node) {
    parent.appendChild(node); //在parent下加一个子节点
  },
  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
  }, //给node加一个父节点
  remove(node) {
    //删除node节点
    node.parentNode.removeChild(node);
    return node; //保留node的引用
  },
  empty(node) {
    //node.innerHTML=''
    //删除node的所有子节点
    const { childNodes } = node; //等同于const childNodes =node.childNodes
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },
  attr(node, name, value) {
    //在node上增加一个属性及其值(重载，根据参数个数写不同代码)
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  text(node, string) {
    //适配,将node的内容改为
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string; //ie
      } else {
        node.textContent = string; //firefox/chrome
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    //增加样式
    if (arguments.length === 3) {
      // dom.style(div, 'color', 'red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        // dom.style(div, 'color')读取style的color
        return node.style[name];
      } else if (name instanceof Object) {
        // dom.style(div, {color: 'red'})
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },
  class: {
    //增加/删除类
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    contains(node, className) {
      return node.classList.contains(className);
    },
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  }, //添加|删除事件监听
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  find(selector, scope) {
    //获取标签
    return (scope || document).querySelectorAll(selector);
  },
  parent(node) {
    return node.parentNode;
  }, //获取父||子元素
  children(node) {
    return node.children;
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  each(nodeList, fn) {
    //遍历所有节点
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  index(node) {
    // 获取排行老几
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
