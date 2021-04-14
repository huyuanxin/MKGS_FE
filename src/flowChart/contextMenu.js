
  import { EventCenter } from 'flowChart/eventCenter';
  import command from 'flowChart/command';
  import editor from 'flowChart/editor';
  
  class MenuItem {
    constructor(opt) {
      this.text = opt.text;
      this.icon = opt.icon;
      this.role = opt.role;
      this.clickHandle = opt.clickHandle;
      this.init();
    }
  
    init() {
      const li = document.createElement('li');
      li.className = 'fy_contextMenu_item';
      li.dataset.role = this.role;
      if (this.role === 'save') {
        li.innerHTML = `<i style="display: inline-block;transform: translateY(2px);">
          <svg
            t="1612497429237" 
            viewBox="0 0 1024 1024" 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg" 
            p-id="8075" 
            width="12" 
            height="13">
            <path 
              d="M893.3 293.3L730.7 130.7c-7.5-7.5-16.7-13-26.7-16V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 184h256v104H384V184z m456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136V840z" 
              p-id="8076" 
              fill="#333">
            </path>
              <path d="M512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144z m0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z" 
              p-id="8077" 
              fill="#333">
            </path>
          </svg>
        </i><span>${this.text}</span>`
      } else {
        li.innerHTML = `<i class="${this.icon}"></i><span>${this.text}</span>`;
      }
      this.el = li;
      this.bind();
    }
  
    bind() {
      this.el.onclick = (e) => {
        e.stopPropagation();
        this.clickHandle(e);
      };
    }
  
    getEl() {
      return this.el;
    }
  }
  
  // 右键菜单栏容器
  let ul = null;
  // 触发右键菜单的组件（Connector或者Node）
  let currentComponent = null;
  // 当前复制的节点Id
  let copiedNodeId = '';
  // 记录当前菜单栏位置
  let contextMenuPos = {};
  
  /**
     * @description 删除连接线
     * @param {Connection} comp 连接线对象
     */
  function deleteHandle(comp) {
    if (comp) {
      if (typeof comp === 'object') {
        command.exec(command.RemoveConnectorCommand, comp);
      } else if (typeof comp === 'string') {
        command.exec(command.RemoveNodeCommand, comp);
      }
      const FlowChart = require('./index');
      FlowChart.emit('delete');
    }
  }
  
  /**
   * @description 隐藏右键菜单
   */
  function hide() {
    ul.style.display = 'none';
  }
  
  /**
   * @description 生成分割线菜单项
   */
  function generateMenuDivideLine() {
    const divide = document.createElement('div');
    divide.style.cssText = 'height:1px;background:#efefef;';
    ul.appendChild(divide);
  }
  
  /**
   * @description 生成单个菜单项并插入右键菜单中
   * @param {object} opt
   */
  function generateMenuItem(opt) {
    const item = new MenuItem(opt);
    ul.appendChild(item.getEl());
  }
  
  /**
   * @description 生成节点的右键菜单
   */
  function generateNodeMenu() {
    // generateMenuItem({
    //   text: '重命名',
    //   icon: 'el-icon-edit',
    //   role: 'rename',
    //   clickHandle: () => {
    //     const nodeEl = document.getElementById(currentComponent);
    //     const cComp = nodeEl.vNode.$children[0];
    //     Vue.$prompt('请输入新名称', '重命名', {
    //       confirmButtonText: '确定',
    //       inputValue: cComp.text,
    //       cancelButtonText: '取消',
    //     }).then(({ value }) => {
    //       command.exec(RenameNodeCommand, currentComponent, cComp.text, value);
    //     }).catch(() => {});
    //   },
    // });
    // generateMenuItem({
    //   text: '复制',
    //   icon: 'el-icon-copy-document',
    //   role: 'delete',
    //   clickHandle: () => {
    //     copiedNodeId = currentComponent;
    //     Vue.$message.success({
    //       message: '复制成功！',
    //     });
    //   },
    // });
    generateMenuItem({
      text: '删除',
      icon: 'el-icon-delete',
      role: 'delete',
      clickHandle: () => {
        deleteHandle(currentComponent);
      },
    });
    // generateMenuDivideLine();
    // generateMenuItem({
    //   text: '查看数据',
    //   icon: 'el-icon-view',
    //   role: 'view',
    //   clickHandle: () => {
    //     // const nodeEl = document.getElementById(currentComponent);
    //     // const cComp = nodeEl.vNode.$children[0];
    //     editor.emitShowNodeData(currentComponent);
    //   },
    // });
  }
  
  /**
   * @description 生成连接线的右键菜单
   */
  function generateConnectorMenu() {
    generateMenuItem({
      text: '删除',
      icon: 'el-icon-delete',
      role: 'delete',
      clickHandle: () => {
        deleteHandle(currentComponent);
      },
    });
  }
  
  /**
   * @description 生成背景的菜单
   */
  function generateBgMenu() {
    // generateMenuItem({
    //   text: '粘贴节点',
    //   icon: 'el-icon-download',
    //   role: 'paste',
    //   clickHandle: () => {
    //     if (copiedNodeId) {
    //       command.exec(
    //         PasteNodeCommand,
    //         { pageX: contextMenuPos.left, pageY: contextMenuPos.top },
    //         copiedNodeId,
    //       );
    //     } else {
    //       Vue.$message({
    //         type: 'warning',
    //         message: '请复制节点后再粘贴。',
    //       });
    //     }
    //   },
    // });
    generateMenuItem({
      text: '清空',
      icon: 'el-icon-delete',
      role: 'delete',
      clickHandle: () => {
        cleanHandle()
      },
    });
    generateMenuItem({
      text: '撤销',
      icon: 'el-icon-refresh-left',
      role: 'undo',
      clickHandle: () => {
        undoHandle()
      },
    });
    generateMenuItem({
      text: '保存',
      icon: '',
      role: 'save',
      clickHandle: () => {
        saveHandle()
      },
    });
    generateMenuItem({
      text: '放大',
      icon: 'el-icon-zoom-in',
      role: 'zoomOut',
      clickHandle: () => {
        const FlowChart = require('./index');
        FlowChart.zoomOut();
      },
    });
    generateMenuItem({
      text: '缩小',
      icon: 'el-icon-zoom-out',
      role: 'zoomIn',
      clickHandle: () => {
        const FlowChart = require('./index');
        FlowChart.zoomIn();
      },
    });
  }

  function saveHandle() {
    const FlowChart = require('./index');
    FlowChart.emit('save');
  }

  function undoHandle() {
    const FlowChart = require('./index');
    FlowChart.emit('undo');
  }

  function cleanHandle() {
    const FlowChart = require('./index');
    FlowChart.emit('cleanAll');
  }
  
  /**
   * @description 生成菜单项
   */
  function generateMenuItemsBycurrentComponent() {
    ul.innerHTML = '';
    if (currentComponent && typeof currentComponent === 'string')generateNodeMenu();
    if (currentComponent && typeof currentComponent === 'object') generateConnectorMenu();
    if (typeof currentComponent === 'undefined') generateBgMenu();
  }
  
  /**
   * @description 生成菜单容器
   */
  function generateMenuContainer() {
    ul = document.createElement('ul');
    ul.className = 'fy_contextMenu';
    document.body.appendChild(ul);
    ul.onmouseup = e => {
      e.button === 0 && hide()
    };
  }
  
  /**
   * @description 显示右键菜单
   * @param {object} position {left:0,top:0}
   * @param {*} component 组件，传入当前组件，用于在点击菜单按钮时，绑定操作对象
   */
  function show(position, component) {
    ul.style.top = `${position.top}px`;
    ul.style.left = `${position.left}px`;
    ul.style.display = 'block';
    contextMenuPos = position;
    currentComponent = component;
    generateMenuItemsBycurrentComponent();
  }
  
  /**
   * @description 初始化右键菜单
   */
  function init() {
    generateMenuContainer();
  
    hide();
  
    EventCenter.on('document.click', (ev) => {
      if (!ev.target.classList.contains('fy_contextMenu_item')) hide();
    });
  }
  
  
  const ContextMenu = {
    init,
    show,
    hide
  };

  export default ContextMenu;
  

