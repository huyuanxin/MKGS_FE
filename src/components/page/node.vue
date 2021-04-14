<template>
    <div>
        <div class="node-com">
            <div class="node-des">{{des}}</div>
            <div class="main-c">
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
            </div>
        </div>
</template>
<script>

export default {
    components: {
        
    },
    data() {
        return {
            text: this.contentText,
            state: this.nodeState,
            des: this.nodeDes,
        };
    },
    props: [
        'nodeState',
      'iconCLassName',
      'contentText',
      'nodeDes'
    ],
    methods: {
    }
};
</script>

<style scoped>   
</style>