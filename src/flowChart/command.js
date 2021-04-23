import editor from 'flowChart/editor';
import model from 'flowChart/model';
import {loadData} from 'flowChart/index'

const commandStack = {
    commandList: [],
    recoverList: [],
    recover() {
      const command = this.recoverList.pop()
      if (command) {
        this.commandList.push(command)
        command.recover()
        editor.emitRecoverListEmpty(this.recoverList.length === 0)
        editor.emitCommandListEmpty(this.commandList.length === 0);
      }
    },
    undo() {
      const command = this.commandList.pop();
      if (command) {
        this.recoverList.push(command)
        command.undo();
        editor.emitCommandListEmpty(this.commandList.length === 0);
        editor.emitRecoverListEmpty(this.recoverList.length === 0)
      }
    },
  };

  /**
   * @description 命令的抽象类
   * @class Command
   */
  class Command {
    exec() {
      throw new Error('请实现exec方法！');
    }

    undo() {
      throw new Error('请实现undo方法！');
    }

    recover() {

    }
  }

  /**
   * @description 添加node
   * @class AddNodeCommand
   */
  class AddNodeCommand extends Command {
    exec(position, elId) {
      this.position = position
      this.elId = elId
      this.id = editor.addNodeByDrag(position, elId);
    }

    undo() {
      editor.removeNode(this.id);
    }

    recover() {
      exec(AddNodeCommand, this.position, this.elId)
    }
  }

  /**
   * @description 添加下拉项的endpoint
   * @class AddEndpointCommand
   */
  class AddEndpointCommand extends Command {
    exec(elId, nodeId) {
      this.elId = elId // 端点所属的下拉项dom节点id
      this.nodeId = nodeId // 下拉项所属的节点id
      this.id = editor.addSourceEndpoint(elId)[0] // 端点id
      return this.id
    }

    undo() {
      editor.removeEndpoint(this.id);
      // const model = require('./model')
      const nodeData = model.getNodeData(this.nodeId)
      nodeData.menuItems.splice(nodeData.menuItems.map(x => x.id).indexOf(this.id), 1)
    }
    recover() {
      exec(AddEndpointCommand, this.elId, this.nodeId)
    }
  }

  /**
   * @description 移除下拉项的endpoint
   * @class RemoveEndpointCommand
   */
  class RemoveEndpointCommand extends Command {
    exec(menuItem, nodeId) {
      this.menuItem = menuItem
      this.nodeId = nodeId
      const [edgesData, edgesLabel] = editor.removeEndpoint(menuItem.pointId)
      this.edgesLabel = edgesLabel
      this.edgesData = edgesData
    }

    undo() {
      // 数据模型增加下拉项
      // const model = require('./model')
      const nodeData = model.getNodeData(this.nodeId)
      nodeData.menuItems.push(this.menuItem)
      setTimeout(() => {
        editor.addSourceEndpoint(this.menuItem.id, this.menuItem.pointId)
        // 如果有连线则重连
        editor.addEndpointEdges(this.edgesData, this.edgesLabel)
      }, 0)
    }

    recover() {
      exec(RemoveEndpointCommand, this.menuItem, this.nodeId)
    }
  }

   /**
   * @description 清空工作台
   * @class CleanAllCommand
   */
  class CleanAllCommand extends Command {
    exec(flowChartJson) {
      this.flowChartJson = flowChartJson
      editor.cleanAll()
    }

    undo() {
      // const { loadData } = require('./index')
      loadData(this.flowChartJson)
    }
  }

  /**
   * @description 移除node
   * @class RemoveNodeCommand
   */
  class RemoveNodeCommand extends Command {
    exec(nodeId) {
      const [nodeData, nodeEdgesData, nodeEndpointsData, edgesLabel] = editor.removeNode(nodeId);
      this.nodeData = nodeData;
      this.nodeEdgesData = nodeEdgesData;
      this.nodeEndpointsData = nodeEndpointsData;
      this.edgesLabel = edgesLabel
    }

    undo() {
      editor.addNodeByExtraData(this.nodeData, this.nodeEdgesData, this.nodeEndpointsData, this.edgesLabel);
    }
  }

  /**
   * @description 增加连线
   * @class AddConnectorCommand
   */
  class AddConnectorCommand extends Command {
    exec(uuids) {
      this.uuids = uuids;
    }

    undo() {
      editor.removeConnectorByUuids(this.uuids);
    }
  }

  /**
   * @description 移除连线
   * @class RemoveConnectorCommand
   */
  class RemoveConnectorCommand extends Command {
    exec(connector) {
      this.label = connector.getLabel()
      this.edge = editor.removeConnector(connector);
    }

    undo() {
      editor.addConnector(this.edge, this.label);
    }
  }

  /**
   * @description 移动节点
   * @class MoveNodeCommand
   */
  class MoveNodeCommand extends Command {
    exec(id, oldPos) {
      this.id = id;
      this.oldPos = oldPos;
    }

    undo() {
      editor.changeNodePosition(this.id, this.oldPos);
    }
  }

  /**
   * @description 粘贴节点
   * @class PasteNodeCommand
   */
  class PasteNodeCommand extends Command {
    exec(position, nodeId) {
      this.id = editor.addNodeByCopy(position, nodeId);
    }

    undo() {
      editor.removeNode(this.id);
    }
  }

  /**
   * @description 重命名节点
   * @class RenameNodeCommand
   */
  class RenameNodeCommand extends Command {
    exec(nodeId, oldValue, newValue) {
      this.nodeId = nodeId;
      this.oldValue = oldValue;
      editor.renameNode(nodeId, newValue);
    }

    undo() {
      editor.renameNode(this.nodeId, this.oldValue);
    }
  }

  /**
   * @description 撤销上一个命令
   */
  function undo() {
    commandStack.undo();
  }

  /**
   * @description 恢复上一个命令
   */
  function recover() {
    commandStack.recover();
  }

  /**
   * @description 默认输出接口 执行命令
   * @param {Command} Cmd
   * @param {*} args
   */
  function exec(Cmd, ...args) {
    const cmd = new Cmd();
    const callBackData = cmd.exec(...args);
    commandStack.commandList.push(cmd);
    editor.emitAddCommand();
    return callBackData
  }
  
  export default{
    exec,
    undo,
    recover,
    AddEndpointCommand,
    RemoveEndpointCommand,
    AddNodeCommand,
    RemoveNodeCommand,//d
    AddConnectorCommand,
    RemoveConnectorCommand,//d
    MoveNodeCommand,
    RenameNodeCommand,
    PasteNodeCommand,
    CleanAllCommand
  }



