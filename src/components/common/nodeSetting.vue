<template>
    <div class="node-setting">
      <div class="title">实体属性配置</div>
      <div class="attr-box">
        <p>
<!--          <span class="item">过程类型</span>-->
<!--          <span class="value">{{typeMap[currentNodeData.type]}}</span>-->
        </p>
        <p v-for="(value, key) in dataSetting[currentNodeData.type].processSetting" :key="'processSetting' + key" v-show="value.type !== 'none'">
          <template v-if="value.type === 'select'">
            <span class="input-label">
              {{ value.label }}
              <i class="required-icon" v-if="value.required" >*</i>
            </span>
              <span class="input-relative">
                <select class="select" v-model="currentNodeData.dataSetting.processSetting[key]">
                  <option v-for="(item, index) in value.children" :key="index">{{ item }}</option>
                </select>
              </span>
          </template>
          <template v-else>
            <template v-if="value.type !== 'none'">
            <span class="input-label">
              {{ value.label }}
              <i class="required-icon" v-if="value.required" >*</i>
            </span>
              <span class="input-relative">
              <el-input
                  :class="{'input-error': curErrors.includes('processSetting.' + key)}"
                  :type="value.type"
                  size="small"
                  v-model="currentNodeData.dataSetting.processSetting[key]"
                  @input="val => changeNodeData(val, key)"
                  @focus="inputFocus('processSetting.' + key)">
              </el-input>
              <span
                  v-if="curErrors.includes('processSetting.' + key)"
                  class="error-text"
                  :style="{'bottom': value.type === 'text' ? '-23px' : '-17px'}">
                {{ curErrorMsg['processSetting.' + key] || '必填' }}
              </span>
            </span>
            </template>
          </template>
        </p>
<!--        <p>-->
<!--          <template>-->
<!--          <span class="input-label">-->
<!--            实体类别-->
<!--            <i class="required-icon" >*</i>-->
<!--          </span>-->
<!--            <span class="input-relative">-->
<!--              <select class="select" v-model="currentNodeData.dataSetting.processSetting['className']">-->
<!--                <option>disease</option>-->
<!--                <option>symptom</option>-->
<!--                <option>complication</option>-->
<!--              </select>-->
<!--            </span>-->
<!--          </template>-->
<!--        </p>-->

<!--        <p class="call-attr" v-if="Object.keys(dataSetting[currentNodeData.type].callSetting || {}).length && currentNodeData.type !== 'condition'">调用属性配置</p>-->
<!--        <p v-for="(value, key) in dataSetting[currentNodeData.type].callSetting" :key="key" v-show="value.type !== 'none'">-->
<!--          <template v-if="value.type !== 'none'">-->
<!--            <span :class="value.type === 'dialogSelect' || value.type.includes('ace') ? 'item' : 'input-label'">-->
<!--              {{ value.label }}-->
<!--              <i class="required-icon" v-if="value.required">*</i>-->
<!--            </span>-->
<!--            <el-select style="width: 100%;" v-if="value.type === 'select'" size="small" v-model="currentNodeData.dataSetting.callSetting[key]">-->
<!--              <el-option-->
<!--                v-for="option in value.options"-->
<!--                :key="option.value"-->
<!--                :label="option.label"-->
<!--                :value="option.value">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--            <span class="value" v-else-if="value.type === 'dialogSelect'">-->
<!--              <el-button :class="{'button-error': curErrors.includes('callSetting.' + key)}" type="default" size="small" @click="showDialog">-->
<!--                {{currentNodeData.dataSetting.callSetting[key].id ? '重新选择' : '选择服务'}}-->
<!--              </el-button>-->
<!--              <span class="m-l-60 m-t-5 line-overflow-1" v-if="currentNodeData.dataSetting.callSetting[key].id">-->
<!--                已选  {{ currentNodeData.dataSetting.callSetting[key].serviceName }}-->
<!--              </span>-->
<!--            </span>-->
<!--            <span class="value" v-else-if="value.type.includes('ace')">-->
<!--              <el-button-->
<!--                @click.stop="showDialog2(value, key)"-->
<!--                :style="{'border-color': curErrors.includes('callSetting.' + key) ? 'red' : ''}"-->
<!--                size="mini"-->
<!--                type="default">-->
<!--                <template v-if="currentNodeData.dataSetting.callSetting[key]">-->
<!--                  <i class="el-icon-success"></i>已配置-->
<!--                </template>-->
<!--                <template v-else>-->
<!--                  <i class="el-icon-remove"></i>未配置-->
<!--                </template>-->
<!--              </el-button>-->
<!--            </span>-->
<!--            <span class="input-relative" v-else>-->
<!--              <el-input-->
<!--                :class="{'input-error': curErrors.includes('callSetting.' + key)}"-->
<!--                :type="value.type"-->
<!--                size="small"-->
<!--                v-model="currentNodeData.dataSetting.callSetting[key]"-->
<!--                @focus="inputFocus('callSetting.' + key)">-->
<!--              </el-input>-->
<!--              <span-->
<!--                v-if="curErrors.includes('callSetting.' + key)"-->
<!--                class="error-text"-->
<!--                :style="{'bottom': value.type === 'text' ? '-23px' : '-17px'}">-->
<!--                {{ curErrorMsg['callSetting.' + key] || '必填' }}-->
<!--              </span>-->
<!--            </span>-->
<!--          </template>-->
<!--        </p>-->
<!--        <p class="text-center" v-if="currentNodeData.type !== 'async' && currentNodeData.type !== 'callback'">-->
<!--          <el-button-->
<!--            size="small"-->
<!--            type="primary"-->
<!--            @click="changeBreadList([{ label: currentNodeData.dataSetting.processSetting.processName + '过程入参', pageType: 'processParameterIn' }])">-->
<!--            过程入参-->
<!--          </el-button>-->
<!--          <el-button-->
<!--            size="small"-->
<!--            type="primary"-->
<!--            @click="changeBreadList([{ label: currentNodeData.dataSetting.processSetting.processName + '过程出参', pageType: 'processParameterOut' }])">-->
<!--            过程出参-->
<!--          </el-button>-->
<!--        </p>-->
      </div>
      <!--<el-dialog-->
      <!--v-if="currentNodeData.type === 'atomService'"-->
      <!--class="atom-service-dialog"-->
      <!--title="选择服务"-->
      <!--:visible.sync="dialogVisible"-->
      <!--width="1000px"-->
      <!--@close="closeDialog"-->
      <!--@open="openDialog">-->
      <!--<div class="flex m-b-10">-->
      <!--<el-input -->
      <!--style="width: 150px" -->
      <!--class="m-r-10" -->
      <!--size="small" -->
      <!--placeholder="服务名称"-->
      <!--v-model="searchOption.serviceName">-->
      <!--</el-input>-->
      <!--<el-input -->
      <!--style="width: 150px" -->
      <!--class="m-r-10" -->
      <!--size="small"-->
      <!--placeholder="服务描述"-->
      <!--v-model="searchOption.des">-->
      <!--</el-input>-->
      <!--<el-button type="primary" size="small" @click="getAtomServiceList(1)">搜索</el-button>-->
      <!--<el-button type="default" size="small" @click="toResetSearch">重置</el-button>-->
      <!--</div>-->
      <!--<div v-loading="tableDataLoading">-->
      <!--<vxe-table-->
      <!--border-->
      <!--ref="vxeTable"-->
      <!--height="300"-->
      <!--size="mini"-->
      <!--highlight-current-row-->
      <!--highlight-hover-row-->
      <!--:data="tableData"-->
      <!--row-id="id"-->
      <!--:radio-config="{trigger: 'row'}"-->
      <!--@radio-change="radioChangeEvent"-->
      <!--@current-change="currentChangeEvent">-->
      <!--<vxe-table-column type="radio" min-width="25">-->
      <!--<template v-slot:header>-->
      <!--<vxe-button type="text" @click="clearRadioRowEevnt" :disabled="!selectRow">取消</vxe-button>-->
      <!--</template>-->
      <!--</vxe-table-column>-->
      <!--<vxe-table-column type="seq" title="序号" min-width="25"></vxe-table-column>-->
      <!--<vxe-table-column field="id" title="id" min-width="25"></vxe-table-column>-->
      <!--<vxe-table-column field="serviceCode" title="服务代码" min-width="100"></vxe-table-column>-->
      <!--<vxe-table-column field="serviceName" title="服务名称" min-width="185"></vxe-table-column>-->
      <!--<vxe-table-column field="des" title="服务描述" min-width="250"></vxe-table-column>-->
      <!--<vxe-table-column title="分组" min-width="35">-->
      <!--<template v-slot="{ row }">{{ row.groupName || '未知' }}</template>-->
      <!--</vxe-table-column>-->
      <!--<vxe-table-column title="发布状态" min-width="60">-->
      <!--<template v-slot="{ row }">-->
      <!--<span v-if="row.publishStatus === 2" class="font-12-green">发布中</span>-->
      <!--<span v-else class="font-12-red">未发布</span>-->
      <!--</template>-->
      <!--</vxe-table-column>-->
      <!--<vxe-table-column title="状态" min-width="35">-->
      <!--<template v-slot="{ row }">-->
      <!--<span v-if="row.runStatus === 1" class="font-12-green">运行</span>-->
      <!--<span v-else-if="row.runStatus === 2" class="font-12-red">停止</span>-->
      <!--<span v-else class="font-12-blue">调试错误</span>-->
      <!--</template>-->
      <!--</vxe-table-column>-->
      <!--</vxe-table>-->
      <!--</div>-->
      <!--<vxe-pager-->
      <!--align="right"-->
      <!--size="mini"-->
      <!--:page-sizes="[10, 20, 30, 40, 50]"-->
      <!--:current-page.sync="pageConfig.currentPage"-->
      <!--:page-size.sync="pageConfig.pageSize"-->
      <!--:total="pageConfig.totalResult"-->
      <!--@page-change="pageChange">-->
      <!--</vxe-pager>-->
      <!--<span slot="footer" class="dialog-footer">-->
      <!--<el-button @click="toCancle">取 消</el-button>-->
      <!--<el-button type="primary" @click="toDetermine">确 定</el-button>-->
      <!--</span>-->
      <!--</el-dialog>-->
      <aceEditorDialog :option="dialog2Option" @toDetermine="toDetermine2" />
    </div>
</template>
<script>
    import {dataSetting} from 'flowChart/dataSetting';
    import {createUuid }from 'flowChart/utils';
    import {
    getDatasourceList,
    getWsclientList,
    getMqseverList,
      // getAtomServiceList,
    getServiceParamsIn,
    getServiceParamsOut,
  } from 'api/index';
    import aceEditorDialog from 'components/common/aceEditorDialog.vue'
    export default {
    components: {
      aceEditorDialog
    },
    props: {
      nodeDataErrors: {
        type: Array,
        default() {
          return []
        }
      },
      currentNodeData: {
        type: [Object, String],
        default() {
          return {
            type: 'iteration',
            dataSetting: {
              processSetting: {},
              callSetting: {}
            }
          }
        }
      },
      currentNodeId: {
        type: String,
        default() {
          return ''
        }
      }
    },
    data() {
      return {
        dataSetting,
        typeMap: {
          // database: '数据库访问',
          // webservice: 'webservice请求',
          // http: 'http请求',
          // jms: 'jms请求',
          // java: 'java执行',
          // groovy: 'groovy执行',
          iteration: '循环调用',
          condition: '条件判断',
          // async: '异步过程',
          // callback: '异步回调',
          // atomService: '原子服务'
        },
        dialogVisible: false,
        tableData: [],
        selectRow: '',
        pageConfig: {
          currentPage: 1,
          pageSize: 30,
          totalResult: 0
        },
        tableDataLoading: false,
        searchOption: {
          serviceName: '',
          des: '',
        },
        dialog2Option: {
          showDialog: false,
          title: '',
          data: '',
          type: '',
          key: ''
        },
      }
    },
    computed: {
      curErrorMsg({ nodeDataErrors }) {
        const msgMap = {}
        nodeDataErrors.filter(x => x.nodeId === this.currentNodeId).forEach(x => {
          msgMap[`${x.settingType}.${x.settingField}`] = x.errorMsg
        })
        return msgMap
      },
      curErrors({ nodeDataErrors }) {
        return nodeDataErrors.filter(x => x.nodeId === this.currentNodeId).map(x => `${x.settingType}.${x.settingField}`)
      },
      allErrors({ nodeDataErrors }) {
        return nodeDataErrors.map(x => `${x.nodeId}-${x.settingType}.${x.settingField}`)
      }
    },
    created() {
      // 向接口取dataSetting某些项的options数据
      //   Promise.all([this.getDatasourceList(), this.getWsclientList(), this.getMqseverList()])
    },
    methods: {
      showDialog2(value, key) {
        const index = this.allErrors.indexOf(`${this.currentNodeId}-callSetting.${key}`)
        if (index >= 0) {
          this.nodeDataErrors.splice(index, 1)
        }
        this.dialog2Option.title = value.label
        this.dialog2Option.type = value.type.split('-')[1]
        this.dialog2Option.key = key
        this.dialog2Option.data = this.currentNodeData.dataSetting.callSetting[key]
        this.dialog2Option.showDialog = true
      },
      toDetermine2() {
        this.currentNodeData.dataSetting.callSetting[this.dialog2Option.key] = this.dialog2Option.data
        this.dialog2Option.showDialog = false
      },
      // toResetSearch() {
      //   this.searchOption.serviceName = ''
      //   this.searchOption.des = ''
      //   this.getAtomServiceList(1)
      // },
      showDialog() {
        const index = this.allErrors.indexOf(`${this.currentNodeId}-callSetting.atomService`)
        if (index >= 0) {
          this.nodeDataErrors.splice(index, 1)
        }
        this.dialogVisible = true
      },
      insetItem(vId, itemData, list) {
        for (let i = 0; i < list.length; i++) {
          const x = list[i]
          if (x.vId === vId) {
            if (x.children) {
              x.children.push(itemData)
            } else {
              x.children = [itemData]
            }
            break;
          } else if (x.children) {
            this.insetItem(vId, itemData, x.children)
          }
        }
      },
      // toCancle() {
      //   this.selectRow = ''
      //   this.dialogVisible = false
      // },
      // 将后端返回的拍平的数组，处理成嵌套children的形式，同时增加vId
      buildTree(res) {
        res.forEach(x => {
          if (x.parent !== -1) {
            x.parent = res.find(y => y.id === x.parent).vId
          }
        })
        let tList = res.filter(x => x.parent === -1)
        let list = res.filter(x => x.parent === -1)
        let list2 = res.filter(x => list.map(x => x.vId).includes(x.parent))
        while (list2.length) {
          list2 = res.filter(x => list.map(x => x.vId).includes(x.parent))
          list2.forEach(x => {
            this.insetItem(x.parent, x, tList)
          })
          list = list2
        }
        return tList
      },
      // toDetermine() {
      //   if (!this.selectRow) {
      //     this.$message.warning('请选择一个服务')
      //     return
      //   }
      //   this.dialogVisible = false
      //   if (this.currentNodeData.dataSetting.callSetting.atomService.id !== this.selectRow.id) {
      //     getServiceParamsIn(this.selectRow.id).then(
      //       res => {
      //         const formatRes = res.map(x => {
      //           return {
      //             vId: createUuid(), // 虚拟id，为了字段和后端的实际id不冲突
      //             id: x.id,
      //             inOrOut: 'in',
      //             paramCode: x.paramCode,
      //             alias: x.alias || '', // 别名 只在database过程有
      //             type: this.currentNodeData.type === 'http' ? 'body' : '', // 调用参数类型 只在http过程有
      //             parent: x.parent || -1,
      //             paramName: x.paramName,
      //             paramType: x.paramType,
      //             dataType: x.dataType,
      //             defaultValue: x.defaultValue,
      //             scriptType: x.scriptType,
      //             nullable: x.nullable,
      //             isMultiple: x.isMultiple,
      //             kettleType: x.kettleType,
      //             xpath: x.xpath,
      //             format: x.format,
      //             length: x.length || '',
      //             precision: x.precision || '',
      //             des: x.des,
      //
      //             script: '', // 取值映射  过程入参原子类型有
      //             convertExpression: '', // 转换公式 过程入参原子类型有
      //
      //             objectScript: '', // 对象脚本  对象类型有
      //
      //             collectionSql: '', // 集合SQL  集合类型有
      //           }
      //         })
      //         this.currentNodeData.dataSetting.paramsSetting.in = this.buildTree(formatRes)
      //       },
      //       rej => {
      //         this.$message.error(rej.message)
      //       }
      //     )
      //     getServiceParamsOut(this.selectRow.id).then(
      //       res => {
      //         const formatRes = res.map(x => {
      //           return {
      //             vId: createUuid(), // 虚拟id，为了字段和后端的实际id不冲突
      //             id: x.id,
      //             inOrOut: 'out',
      //             paramCode: x.paramCode,
      //             alias: x.alias || '', // 别名 只在database过程有
      //             type: this.currentNodeData.type === 'http' ? 'body' : '', // 调用参数类型 只在http过程有
      //             parent: x.parent || -1,
      //             paramName: x.paramName,
      //             paramType: x.paramType,
      //             dataType: x.dataType,
      //             defaultValue: x.defaultValue,
      //             scriptType: x.scriptType,
      //             nullable: x.nullable,
      //             isMultiple: x.isMultiple,
      //             kettleType: x.kettleType,
      //             xpath: x.xpath,
      //             format: x.format,
      //             length: x.length || '',
      //             precision: x.precision || '',
      //             des: x.des,
      //
      //             script: '', // 取值映射  过程入参原子类型有
      //             convertExpression: '', // 转换公式 过程入参原子类型有
      //
      //             objectScript: '', // 对象脚本  对象类型有
      //
      //             collectionSql: '', // 集合SQL  集合类型有
      //           }
      //         })
      //         this.currentNodeData.dataSetting.paramsSetting.out = this.buildTree(formatRes)
      //       },
      //       rej => {
      //         this.$message.error(rej.message)
      //       }
      //     )
      //   }
      //   this.currentNodeData.dataSetting.callSetting.atomService = {
      //     id: this.selectRow.id,
      //     serviceName: this.selectRow.serviceName,
      //   }
      //   const processName = `ref_${this.selectRow.serviceName}`
      //   this.currentNodeData.dataSetting.processSetting.processName = processName
      //   this.changeNodeData(processName, 'processName')
      // },
      // pageChange({ type, currentPage, pageSize, $event }) {
      //   switch(type) {
      //     case 'current': this.getAtomServiceList(currentPage); break
      //     case 'size': this.getAtomServiceList(1); break
      //     default: break
      //   }
      // },
      // closeDialog() {
      //   this.clearRadioRowEevnt()
      // },
      // openDialog() {
      //   this.getAtomServiceList(1)
      // },
      // async getAtomServiceList(page = 1) {
      //   this.pageConfig.currentPage = page
      //   this.tableDataLoading = true
      //   try {
      //     const params = {
      //       serviceName: this.searchOption.serviceName || '',
      //       des: this.searchOption.des || '',
      //       groupId: '',
      //       page,
      //       rows: this.pageConfig.pageSize,
      //       pageNumber: page,
      //       pageSize: this.pageConfig.pageSize,
      //       pageIndex: page - 1,
      //       orderby: 'asc'
      //     }
      //     const res = await getAtomServiceList(params)
      //     this.tableData = res.rows
      //     this.pageConfig.totalResult = res.total
      //     const atomServiceId = this.currentNodeData.dataSetting.callSetting.atomService.id
      //     let radioRow
      //     if (atomServiceId) {
      //       radioRow = this.tableData.find(x => x.id === atomServiceId)
      //     }
      //     if (this.selectRow) {
      //       radioRow = this.tableData.find(x => x.id === this.selectRow.id)
      //       this.$refs.vxeTable.setRadioRow(radioRow)
      //       this.$refs.vxeTable.setCurrentRow(radioRow)
      //     } else if (radioRow) {
      //       this.selectRow = radioRow
      //       this.$refs.vxeTable.setRadioRow(radioRow)
      //       this.$refs.vxeTable.setCurrentRow(radioRow)
      //     }
      //   } catch (error) {
      //     this.$message.error(error.message)
      //   }
      //   this.tableDataLoading = false
      // },
      inputFocus(type) {
        const index = this.allErrors.indexOf(`${this.currentNodeId}-${type}`)
        if (index >= 0) {
          this.nodeDataErrors.splice(index, 1)
        }
      },
      // radioChangeEvent ({ row }) {
      //   this.selectRow = row
      // },
      // currentChangeEvent ({ row }) {
      //   this.selectRow = row
      // },
      // clearRadioRowEevnt () {
      //   this.selectRow = ''
      //   this.$refs.vxeTable.clearRadioRow()
      //   this.$refs.vxeTable.clearCurrentRow()
      // },
      // // database.callSetting.source
      // async getDatasourceList() {
      //   try {
      //     const res = await getDatasourceList()
      //     if (res && res.length) {
      //       this.dataSetting.database.callSetting.source.options = res.map(x => {
      //         return { value: x.id, label: x.dsName }
      //       })
      //       this.dataSetting.database.callSetting.source.value = res[0].id
      //     }
      //   } catch (error) {
      //     this.$message.error(error.message)
      //   }
      // },
      // // webservice.callSetting.wsClientId
      // async getWsclientList() {
      //   try {
      //     const res = await getWsclientList()
      //     if (res && res.length) {
      //       this.dataSetting.webservice.callSetting.wsClientId.options = res.map(x => {
      //         return { value: x.id, label: x.clientName }
      //       })
      //       this.dataSetting.webservice.callSetting.wsClientId.value = res[0].id
      //     }
      //   } catch (error) {
      //     this.$message.error(error.message)
      //   }
      // },
      // // jms.callSetting.jmsServerId
      // async getMqseverList() {
      //   try {
      //     const res = await getMqseverList()
      //     if (res && res.length) {
      //       this.dataSetting.jms.callSetting.jmsServerId.options = res.map(x => {
      //         return { value: x.id, label: x.jmsName }
      //       })
      //       this.dataSetting.jms.callSetting.jmsServerId.value = res[0].id
      //     }
      //   } catch (error) {
      //     this.$message.error(error.message)
      //   }
      // },

        /**
         * 当在右侧的输入框输入【过程名称】或者【过程描述】后，节点（div）显示的名字也要同时改变。
         * @param val
         * @param key
         */
        changeNodeData(val, key) {
            if (key === 'processName') {
                const nodeEl = document.getElementById(currentNodeId)
              this.currentNodeData.menuItems.forEach(item => item.value = val)
                nodeEl && (nodeEl.vNode.$children[0].text = val)
            } else if (key === 'des') {
                const nodeEl = document.getElementById(currentNodeId)
                nodeEl && (nodeEl.vNode.$children[0].des = val)
            }
        },
      changeBreadList(bread) {
        let msg

        const processSetting = this.currentNodeData.dataSetting.processSetting
        const callSetting = this.currentNodeData.dataSetting.callSetting
        if (processSetting) {
          const data = dataSetting[this.currentNodeData.type].processSetting
          for (let y in processSetting) {
            if (processSetting.hasOwnProperty(y) && !processSetting[y] && data[y] && data[y].required) {
              msg = `请填写${data[y].label}`
              break
            }
          }
        }
        if (callSetting && !msg) {
          const data = dataSetting[this.currentNodeData.type].callSetting
          for (let y in callSetting) {
            if (y === 'atomService') {
              if (!callSetting[y].id) {
                msg = `请选择${data[y].label}`
                break
              }
            } else if (callSetting.hasOwnProperty(y) && !callSetting[y] && data[y] && data[y].required) {
              msg = `请填写${data[y].label}`
              break
            }
          }
        }

        if (msg) {
          this.$message.warning(msg)
          return
        }
        this.$emit('changeBreadList', bread)
      }
    }

    };
</script>
<style scoped>
 .select {
   border-color: #DCDFE6;
   border-radius: 4px;
   height: 32px;
   width: 279px;
 }

 .flowChartWrap #mainNodeInfo .attr-box .input-label {
   padding-top: 12px;
 }

 .flowChartWrap #mainNodeInfo .attr-box .input-label .required-icon {
   top: 10px;
 }
</style>
