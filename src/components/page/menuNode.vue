<template>
    <div>
        <div class="menu-node">
            <div class="node-des">{{des}}</div>
            <div class="menu-title">
            <span class="blue_line"></span>
            <div class="node_content">
                <i :class="iconCLassName" class="type-icon"></i>
                <span class="text">{{text}}</span>
                <i v-if="state==='loading'" class="el-icon-loading node-state"></i>
                <i v-else-if="state==='success'" class="el-icon-circle-check node-state"></i>
                <i v-else-if="state==='failed'" class="el-icon-circle-close node-state"></i>
                <i v-else-if="state==='warning'" class="el-icon-warning-outline node-state"></i>
                <i v-else></i>
            </div>
            </div>
            <div class="add-item"><i @click="addItem" class="el-icon-circle-plus-outline"></i>add</div>
            <div v-for="(item, index) in menuItems" :key="item.id" class="menu-item" :id="item.id" :class="{'border-t': index === 0}">
            <i @click="deleteItem(index)" v-if="index === menuItems.length - 1" class="el-icon-remove-outline"></i>
            {{item.value}}
            </div>
        </div>
    </div>
</template>

<script>
import {createUuid} from 'flowChart/utils';
import model from 'flowChart/model';
console.log(">>>>>>>model",model);
import FlowChart from 'flowChart/index'
console.log(">>>>>>>FlowChart",FlowChart);
import instance from 'flowChart/instance'
console.log(">>>>>>>instance",instance);

export default {
    components: {
        
    },
    data() {
        return {
            text: this.contentText,
            state: this.nodeState,
            des: this.nodeDes,
            menuItems: this.nodeMenuItems || [] // [{value,id}]
        };
    },
    props: [
        'nodeState',
        'iconCLassName',
        'contentText',
        'nodeMenuItems',
        'nodeDes'
    ],
    methods: {
        addItem() {
        setTimeout(() => {
            const data = model.getNodeData(window.currentNodeId)

            const id = createUuid()
            this.menuItems.push({ value: `${data.type === 'condition' ? 'condition' : 'process'}${this.menuItems.length + 1}`, id })
            this.$nextTick(() => {
            // const FlowChart = FlowChart;
            console.log("FlowChart",FlowChart);
            this.menuItems.find(x => x.id === id).pointId = FlowChart.addEndpoint(id, window.currentNodeId)
            this.updateNodeData()
            })
        }, 0)
        },
        deleteItem(index) {
        setTimeout(() => {
            // const FlowChart = FlowChart;
            FlowChart.removeEndpoint(this.menuItems[index], window.currentNodeId)
            // const instance = instance;
            instance.remove(this.menuItems[index].id) // 这个不是真正的删除节点，而是解除这个id的操作记录（具体需要看源码），不然撤销删除下拉项后端点会定位出错
            this.menuItems.splice(index, 1)
            this.updateNodeData()
        }, 0)
        },
        updateNodeData() {
        const data = model.getNodeData(window.currentNodeId)
        data.menuItems = this.menuItems
        model.setNodeData(window.currentNodeId, data)
        }
    },
};
</script>

<style scoped>   
</style>