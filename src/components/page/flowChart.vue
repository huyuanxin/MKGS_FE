<template>
    <div>
    <el-container class="flowChartWrap">
      <el-aside width="240px"
                class="left">
        <div class="main-title">录入数据</div>
        <div class="search">
          <el-input placeholder="搜索"
                    size="small"
                    v-model="filterText">
            <i slot="prefix"
              class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <el-tree :data="nodeData"
                 node-key="id"
                 :default-expanded-keys="['logicCom']"
                 icon-class="el-icon-arrow-right"
                 :render-content="renderContentFunction"
                 :filter-node-method="filterNode"
                 ref="tree2"
                 :props="defaultProps"></el-tree>
      </el-aside>
      <el-main>
        <el-container class="content-el-container">
          <el-header height="42px" class="flex breadcrumb-head">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }" @click.native="goBack">工作台</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/' }" @click.native="breadClick(index)" v-for="(item, index) in breadList" :key="index">{{item.label}}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-header>
          <el-container v-show="pageType === 'editor'">
            <el-main class="main">
              <div id="mainMenu">
                <!-- <div class="tool-left">
                  <el-button icon="el-icon-video-play"
                            @click="execModel"
                            :disabled="isExecDisable"
                            size="small">执行</el-button>
                  <el-button icon="el-icon-upload"
                            size="small">部署</el-button>
                  <el-button icon="el-icon-box"
                            size="small">Auto ML</el-button>
                </div> -->
                <div class="tool-right">
                  <el-tooltip content="撤销">
                    <el-button icon="el-icon-refresh-left"
                              :disabled="isUndoDisable"
                              @click="undo"
                              circle></el-button>
                  </el-tooltip>
                  <!-- <el-tooltip content="恢复">
                    <el-button icon="el-icon-refresh-right"
                              :disabled="isRecoverDisable"
                              @click="recover"
                              circle></el-button>
                  </el-tooltip> -->
                  <el-tooltip content="放大">
                    <el-button icon="el-icon-zoom-in"
                              @click="zoomOut"
                              circle></el-button>
                  </el-tooltip>
                  <el-tooltip content="缩小">
                    <el-button icon="el-icon-zoom-out"
                              @click="zoomIn"
                              circle></el-button>
                  </el-tooltip>
                  <el-tooltip content="清空">
                    <el-button icon="el-icon-delete"
                              @click="cleanAll"
                              circle></el-button>
                  </el-tooltip>
                  <el-tooltip content="保存">
                    <el-button
                      @mouseover.native="saveBtnColor = '#409EFF'"
                      @mouseout.native="saveBtnColor = '#606266'"
                      @click="save"
                      circle>
                      <i class="icon-save">
                        <svg
                          t="1612497429237"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="8075"
                          width="14"
                          height="14">
                          <path
                            d="M893.3 293.3L730.7 130.7c-7.5-7.5-16.7-13-26.7-16V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 184h256v104H384V184z m456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136V840z"
                            p-id="8076"
                            :fill="saveBtnColor">
                          </path>
                          <path
                            d="M512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144z m0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"
                            p-id="8077"
                            :fill="saveBtnColor">
                          </path>
                        </svg>
                      </i>
                    </el-button>
                  </el-tooltip>
                  <!-- <el-tooltip content="自动布局">
                    <el-button icon="el-icon-bangzhu"
                              circle></el-button>
                  </el-tooltip> -->
                  <!-- <el-tooltip content="适应画布">
                    <el-button icon="el-icon-money"
                              circle></el-button>
                  </el-tooltip> -->
                  <!-- <el-tooltip content="全屏">
                    <el-button icon="el-icon-full-screen"
                              circle></el-button>
                  </el-tooltip> -->
                </div>
              </div>
              <div class="mainContainer"
                  @drop="dropHandle"
                  @dragover="dragoverHandle">
                <div id="mainContainer"
                    @click="clickBgHandle"></div>
              </div>
            </el-main>
            <el-aside width="300px"
                      class="right">
              <el-container id="mainNodeInfo">
                <el-main>
                  <div>
                    <div v-show="toolBarShow==='component'">
                      <nodeSetting
                        v-show="showType === 'node'"
                        :nodeDataErrors="nodeDataErrors"
                        :currentNodeData="currentNodeData"
                        :currentNodeId="currentNodeId"
                        @changeBreadList="changeBreadList"/>
                      <edgeSetting
                        v-show="showType === 'edge'"
                        :edgesLabel="edgesLabel"
                        :currentEdgeId="currentEdgeId"
                        @edgeLabelChange="edgeLabelChange"/>
                    </div>
                    <div v-show="toolBarShow==='message'">
                      <div class="title">消息管理</div>
                      <div>
                        <el-card class="messageInfo"
                                v-for="(m,idx) in messagesList"
                                :key="idx">
                          <p>{{m.time}}</p>
                          <div>
                            <i class="el-icon-circle-close"
                              style="color:#ff0000;font-size:26px;position:relative;top:5px;"></i>
                            {{m.message}}
                          </div>
                        </el-card>
                      </div>
                    </div>
                  </div>
                </el-main>  <link rel="stylesheet" href="./static/css/common.css">
  <link rel="stylesheet" href="./static/lib/element-ui@2.15.0/theme-chalk/index.css">
  <link rel="stylesheet" href="./static/lib/vxe-table@3.1.2/style.css">
  <link rel="stylesheet" href="./static/css/app.css">
  <link rel="stylesheet" href="./static/css/index.css">
  <link rel="stylesheet" href="./static/css/flowChart.css">
  <link rel="stylesheet" href="./static/css/node.css">
  <link rel="stylesheet" href="./static/css/menuNode.css">
  <link rel="stylesheet" href="./static/css/paramsSetting.css">
  <link rel="stylesheet" href="./static/css/mappingSetting.css">
  <link rel="stylesheet" href="./static/css/nodeSetting.css">
                <!-- <el-aside width="32px"
                          class="nodeInfoToolBar">
                  <div :class="{'tool':true, 'component':true, 'acitve': toolBarShow==='component'}"
                      @click="toolBarShow='component'">
                    <i class="el-icon-tickets"></i>
                    <span> 组件参数</span>  <link rel="stylesheet" href="./static/css/common.css">
  <link rel="stylesheet" href="./static/lib/element-ui@2.15.0/theme-chalk/index.css">
  <link rel="stylesheet" href="./static/lib/vxe-table@3.1.2/style.css">
  <link rel="stylesheet" href="./static/css/app.css">
  <link rel="stylesheet" href="./static/css/index.css">
  <link rel="stylesheet" href="./static/css/flowChart.css">
  <link rel="stylesheet" href="./static/css/node.css">
  <link rel="stylesheet" href="./static/css/menuNode.css">
  <link rel="stylesheet" href="./static/css/paramsSetting.css">
  <link rel="stylesheet" href="./static/css/mappingSetting.css">
  <link rel="stylesheet" href="./static/css/nodeSetting.css">
                  </div>
                  <div :class="{'tool':true, 'message':true, 'acitve': toolBarShow==='message'}"
                      @click="toolBarShow='message'">
                    <i class="el-icon-chat-dot-round"></i>
                    <span> 消息提醒</span>
                  </div>
                </el-aside> -->
              </el-container>
            </el-aside>
          </el-container>
          <el-container v-if="pageType !== 'editor'">
            <mappingSetting v-if="pageType === 'parameterMap'" :mappingData="mappingData" @mappingLinksUpdate="mappingLinksUpdate" />
          </el-container>
        </el-container>
      </el-main>
    </el-container>
    </div>
</template>
<script>
    import menuData from 'common/menuData';
    import FlowChart from 'flowChart/index';
    import model from 'flowChart/model';
    import { menuTypes, dataSetting } from 'flowChart/dataSetting';
    import command from'flowChart/command';
    import { getServiceInfo, serviceFlowSave, getServiceFlow } from 'api/index.js'
    import nodeSetting from 'components/common/nodeSetting.vue';
    import edgeSetting from 'components/common/edgeSetting.vue';

export default {
    components: {
        nodeSetting,
        edgeSetting
    },
    data() {
        return {
        saveBtnColor: '#606266',
        breadList: [],
        parameterPageTypes: ['processParameterIn', 'processParameterOut', 'serviceParameterIn', 'serviceParameterOut'],
        pageType: 'editor', // editor 编辑器 processParameterIn 过程入参 processParameterOut 过程出参 serviceParameterIn 服务入参 serviceParameterOut 服务出参 parameterMap 参数映射
        flowChartJson: model.getData(),
        showType: 'node',
        currentNodeId: '',
        currentNodeData: undefined,
        edgesLabel: '',
        currentEdgeId: '',
        currentConn: '',
        isUndoDisable: true,
        isRecoverDisable: true,
        isExecDisable: false,
        nodeData: [],
        defaultProps: {
            children: 'children',
            label: 'label',
        },
        filterText: '',
        toolBarShow: 'component',
        messagesList: [
            {
            time: '2019/6/5 下午3:17:29',
            message: '当前实验中没有可回滚的节点',
            }, {
            time: '2019/6/5 下午3:00:25',
            message: '模型不存在,请生成模型后重试',
            }, {
            time: '2019/6/5 下午3:00:17',
            message: '实验目录不存在',
            }, {
            time: '2019/6/5 下午3:00:09',
            message: '模型不存在,请生成模型后重试',
            },
        ],
        paramsTableData: [],
        mappingData: { links: [], nodes: [] },
        nodeDataErrors: [], // [{ nodeId, settingType, settingField, errorMsg }]，节点属性配置表单验证
        };
    },
    watch: {
        filterText(val) {
        this.$refs.tree2.filter(val);
        },
        pageType(val) {
        switch(val) {
            case 'processParameterIn': this.paramsTableData = this.currentNodeData.dataSetting.paramsSetting.in || []; break
            case 'processParameterOut': this.paramsTableData = this.currentNodeData.dataSetting.paramsSetting.out || []; break
            case 'serviceParameterIn': this.paramsTableData = this.flowChartJson.serviceParamsSetting.in || []; break
            case 'serviceParameterOut': this.paramsTableData = this.flowChartJson.serviceParamsSetting.out || []; break
            default: break
        }
        },
        nodeDataErrors(val) {
        model.getData().nodes.forEach(x => {
            const node = document.getElementById(x.id)
            node && (node.style.borderColor = '')
        })
        const idList = [...new Set(val.map(x => x.nodeId))]
        idList.forEach(x => {
            const node = document.getElementById(x)
            node && (node.style.borderColor = 'red')
        })
        },
    },
    async mounted() {
        FlowChart.setContainer('mainContainer');
        FlowChart.on('commandListEmpty', (val) => {
        this.isUndoDisable = val;
        });
        FlowChart.on('recoverListEmpty', (val) => {
        this.isRecoverDisable = val;
        });
        FlowChart.on('showNodeData', () => {
        // this.dialogTableVisible = true;
        });
        FlowChart.on('addCommand', () => {
        this.isUndoDisable = false;
        });
        FlowChart.on('selectNode', data => {
        this.showType = 'node';
        this.currentNodeId = data;
        window.currentNodeId = this.currentNodeId
        this.currentNodeData = model.getNodeData(this.currentNodeId)
        });
        FlowChart.on('selectEdge', conn => {
        this.showType = 'edge';
        this.currentConn = conn
        this.edgesLabel = model.getEdgesLabel()
        this.currentEdgeId = conn.getUuids().join('&&')
        });
        FlowChart.on('cleanAll', () => {
        this.cleanAll()
        });
        FlowChart.on('undo', () => {
        this.undo()
        });
        FlowChart.on('save', () => {
        this.save()
        });

        this.nodeData = menuData;
        const json = model.getData()
        json.serviceId = window.serviceId
        try {
        const res = await getServiceInfo(json.serviceId)
        json.serviceName = res.data.serviceName || ''
        json.serviceDescription = res.data.des || ''
        } catch (error) {
        this.$message.error(error.message)
        }
        try {
        const res = await getServiceFlow(json.serviceId)
        if (res && res.data && res.data.serviceId && res.data.data) {
            FlowChart.loadData(JSON.parse(res.data.data))
            this.flowChartJson = model.getData()
        }
        } catch (error) {
        this.$message.error(error.message)
        }
    },
    methods: {
        // 递归遍历更新参数映射脚本
        updateScripts(list, scriptsMap) {
        list.forEach(x => {
            if (x.vId in scriptsMap) {
            x.script = scriptsMap[x.vId]
            } else {
            x.script = ''
            }
            if (x.children) {
            this.updateScripts(x.children, scriptsMap)
            }
        })
        },
        mappingLinksUpdate(scriptsMap) {
        this.updateScripts(this.paramsTableData, scriptsMap)
        this.$message.success('保存成功')
        this.breadClick(0)
        },
        changeMappingData(mappingData) {
        this.mappingData = mappingData
        },
        breadClick(index) {
        if (index === 0) {
            this.breadList = [this.breadList[0]]
            this.pageType = this.breadList[0].pageType
        }
        },
        changeBreadList(bread) {
        this.pageType = bread[bread.length - 1].pageType
        this.breadList = bread
        },
        goBack() {
        this.pageType = 'editor'
        this.breadList = []
        },
        cleanAll() {
        command.exec(command.CleanAllCommand, this.flowChartJson)
        this.flowChartJson = model.getData()
        },
        edgeLabelChange(val) {
        this.currentConn.setLabel({ label: val })
        },
        async save() {
            console.log('save函数执行了')
        let msg
        const json = model.getData()
            console.log('model.getData()', model.getData())
            console.log()
        // 节点id-target端点id映射
        const nodeTargetMap = {}
        // target端点id-节点id映射
        const targetNodeMap = {}
        // source端点id-节点id映射
        const sourceNodeMap = {}
        // 逻辑组件下拉项的source端点-节点id映射
        const logicSourceNodeMap = {}

            //统一id
        json.nodes.forEach(x => {
            nodeTargetMap[x.id] = x.points.targets[0]
            targetNodeMap[x.points.targets[0]] = x.id
            sourceNodeMap[x.points.sources[0]] = x.id
            x.data.menuItems && x.data.menuItems.forEach(y => {
            logicSourceNodeMap[y.pointId] = x.id


            })
        })

        // 填充processSetting和callSetting某些字段值
        for (let i = 0; i < json.nodes.length; i++) {
            const x = json.nodes[i]
            // 填充服务id
            x.data.dataSetting.processSetting.serviceId = json.serviceId
            // 填充过程类型
            x.data.dataSetting.processSetting.invokeType = x.data.type
            // 填充前序过程，可能多个，用数组表示，先用节点id代替过程id，需要告知服务端做一个节点id和过程id的映射
            x.data.dataSetting.processSetting.prevProcess = json.edges.filter(y => y.includes(nodeTargetMap[x.id])).map(z => sourceNodeMap[z.split('&&')[0]]).filter(x => !!x)
            // 填充外部过程，最多一个
            const outerProcessList = json.edges.filter(y => y.includes(nodeTargetMap[x.id])).map(z => logicSourceNodeMap[z.split('&&')[0]]).filter(x => !!x)
            x.data.dataSetting.processSetting.outerProcess = outerProcessList[0] || ''
            if (outerProcessList.length > 1) {
            msg = '连线有误，节点最多一个外部过程'
            break
            }

            // 根据menuItems填充过程数组
            if (menuTypes.includes(x.data.type)) {
            x.data.dataSetting.callSetting.script = []
            x.data.menuItems.forEach(y => {
                const edges = json.edges.filter(z => z.includes(y.pointId))
                edges.length && edges.forEach(k => {
                x.data.dataSetting.callSetting.script.push(
                    {
                    [x.data.type === 'condition' ? 'expression' : 'itemName'] : y.value,
                    process: targetNodeMap[k.split('&&')[1]]
                    }
                )
                })
            })
            }
        }

        // 填充头节点id 最少一个，可能多个，用数组表示
        json.head = json.nodes.filter(x => !x.data.dataSetting.processSetting.prevProcess.length && !x.data.dataSetting.processSetting.outerProcess).map(x => x.id)

        if (!json.head.length) {
            msg = '连线有误，没有检测到头节点'
        } else {
            // 节点属性配置表单验证 nodeDataErrors
            this.nodeDataErrors = []
            json.nodes.forEach(x => {
            const processSetting = x.data.dataSetting.processSetting
            const callSetting = x.data.dataSetting.callSetting
            if (processSetting) {
                const settingType = 'processSetting'
                const data = dataSetting[x.data.type][settingType]
                for (let y in processSetting) {
                if (processSetting.hasOwnProperty(y) && !processSetting[y] && data[y] && data[y].required) {
                    this.nodeDataErrors.push({ nodeId: x.id, settingType, settingField: y, errorMsg: `必填` })
                }
                }
            }
            if (callSetting) {
                const settingType = 'callSetting'
                const data = dataSetting[x.data.type][settingType]
                for (let y in callSetting) {
                if (y === 'atomService') {
                    if (!callSetting[y].id) {
                    this.nodeDataErrors.push({ nodeId: x.id, settingType, settingField: y, errorMsg: `必填` })
                    }
                } else if (callSetting.hasOwnProperty(y) && !callSetting[y] && data[y] && data[y].required) {
                    this.nodeDataErrors.push({ nodeId: x.id, settingType, settingField: y, errorMsg: `必填` })
                }
                }
            }
            })
            if (this.nodeDataErrors.length) {
            msg = '标红节点属性配置未完善'
            }
        }
        if (msg) {
            this.$message.warning(msg)
            return
        }

        try {
            console.log("FlowChartJson",json)
            function filter(obj) {
              let filter_json = {}
              filter_json.edges = obj.edges
              filter_json.edgesLabel = obj.edgesLabel
              filter_json.entities = createEntity(obj)
              return filter_json
            }
            function createEntity(obj) {
              let filter_entities = []
              for(let i = 0; i < obj.nodes.length; i++) {
                let entity = {}
                entity.id = obj.nodes[i].id
                entity.entityName = obj.nodes[i].data.dataSetting.processSetting.processName
                entity.className = obj.nodes[i].data.dataSetting.processSetting.className
                entity.point = {}
                entity.point.targets = [...obj.nodes[i].points.targets]
                entity.point.sources = [...obj.nodes[i].points.sources]

                const menuItems = obj.nodes[i].data.menuItems;
                if(menuItems.length > 0) {
                  for (let j = 0; j < menuItems.length; j++) {
                    entity.point.sources.push(menuItems[j].pointId);
                  }
                }
                filter_entities.push(entity)
              }
              return filter_entities
            }
            // 接口
            let filter_json = filter(json)
            console.log("EntityJson",filter_json)

            await serviceFlowSave(filter_json)//把最终的json传给后台
            this.$message.success('保存成功')
        } catch (error) {
            this.$message.error(error.message)
        }
        },
        renderContentFunction(h, { node, data }) {
        const className = node.expanded ? 'el-icon-folder-opened' : 'el-icon-folder';
        const classNameChild = (!data.children && data.icon) ? data.icon : '';
        return h('div', {
            class: { leafNode: !data.children },
            style: {
            height: '38px',
            lineHeight: '38px',
            fontSize: '12px',
            color: '#1b1c23',
            },
        }, [
            h('el-tooltip', {
            attrs: {
                content: data.label,
                placement: 'top-end',
                // disabled: !!data.children,
                disabled: true
            },
            },
            [
            h('span', {
                attrs: {
                draggable: !data.children,
                id: data.id,
                },
                on: {
                dragstart: this.dragHandle,
                },
                class: 'node',
                style: {
                display: 'inline-block',
                marginTop: '4px',
                height: '30px',
                lineHeight: '30px',
                width: '140px',
                borderRadius: '4px',
                position: 'relative',
                outline: 'none',
                border: !data.children ? '1px solid transparent' : 'none',
                },
            }, [
                h('i', {
                class: {
                    [className]: !!data.children,
                    [classNameChild]: !data.children,
                },
                style: {
                    color: '#00cdea',
                    marginLeft: data.children ? '10px' : '15px',
                },
                }),
                h('span', {
                style: {
                    fontSize: '12px',
                    marginLeft: '10px',
                },
                }, data.label),
            ]),
            ]),
        ]);
        },
        filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
        },
        dragoverHandle(ev) {
        ev.preventDefault();
        },
        dragHandle(ev) {
        ev.dataTransfer.setData('target', ev.target.id);
        },
        dropHandle(ev) {
        FlowChart.addNode({ pageX: ev.pageX, pageY: ev.pageY }, ev.dataTransfer.getData('target'));
        },
        clickBgHandle() {
        this.flowChartJson = model.getData()
        },
        zoomOut() {
        FlowChart.zoomOut();
        },
        zoomIn() {
        FlowChart.zoomIn();
        },
        undo() {
        if (this.isUndoDisable) return
        FlowChart.undo();
        this.showType = 'node'
        },
        recover() {
        FlowChart.recover();
        this.showType = 'node'
        },
        execModel() {
        this.isExecDisable = true;
        FlowChart.execModel().then(() => {
            this.isExecDisable = false;
        });
        },
    }
};
</script>
<style scoped>

</style>
