import editorCss from 'flowChart/editorCss';
import instance from 'flowChart/instance'
import {EventCenter, extendsEvent} from 'flowChart/eventCenter'
import panZoom from 'flowChart/moveAndZoom';

import contentMenu from 'flowChart/contextMenu';
import editor from 'flowChart/editor';
import model from 'flowChart/model';
import command from 'flowChart/command';

/**
     * @description 设置插件容器
     * @param {string} id 容器id
     */
    function setContainer(id) {
      instance.setContainer(id);
      this.init();
    };

    /**
     * @description 在容器内添加节点
     * @param {object} position {left:0; top:0}节点位置
     * @param {string} elId 记录生产节点的源节点id，便于传递原节点信息
     */
    function addNode(position, elId) {
      command.exec(command.AddNodeCommand, position, elId);
    };

    /**
     * @description 在节点下拉项添加端点
     * @param {string} elId 记录生产端点的元素id
     * @param {string} nodeId 记录当前节点id
     */
    function addEndpoint(elId, nodeId) {
      return command.exec(command.AddEndpointCommand, elId, nodeId);
    };

    /**
     * @description 移除下拉项的某个端点
     */
    function removeEndpoint(menuItem, nodeId) {
      command.exec(command.RemoveEndpointCommand, menuItem, nodeId);
    };

    /**
     * @description 撤销
     */
    function undo() {
      command.undo();
    };

    /**
     * @description 恢复
     */
    function recover() {
      command.recover();
    };

    /**
     * @description 初始化
     */
    function init() {
      editor.init();
      panZoom.init();
      contentMenu.init();
    };

    /**
     * @description  缩小画布
     */
    function zoomIn() {
      const x = instance.mainContainerWrap.clientWidth / 2;
      const y = instance.mainContainerWrap.clientHeight / 2;
      instance.pan.smoothZoom(x, y, 0.8);
    };

    /**
     * @description 放大画布
     */
    function zoomOut() {
      const x = instance.mainContainerWrap.clientWidth / 2;
      const y = instance.mainContainerWrap.clientHeight / 2;
      instance.pan.smoothZoom(x, y, 1.2);
    };

    /**
     * @description 加载数据
     */
    function loadData(data) {
      model.setData(data);
      editor.render();
    };

    /**
     * @description 执行模型
     * @returns {Promise}
     */
    function execModel() {
      return editor.execModel();
    };


const FlowChart = {
  setContainer,
  addNode,
  addEndpoint,
  removeEndpoint,
  undo,
  recover,
  init,
  zoomIn,
  zoomOut,
  loadData,
  execModel
}

extendsEvent(FlowChart);

document.addEventListener('click', (ev) => {
  EventCenter.emit('document.click', ev);
});

export default FlowChart;

