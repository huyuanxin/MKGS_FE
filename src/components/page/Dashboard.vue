<!--挡泥板组件，首页-->
<template>
    <div>
      <el-container class="indexWrap">
      <el-main>
        <FlowChart></FlowChart>
      </el-main>
    </el-container>
    </div>
</template>

<script>
import FlowChart from 'components/page/flowChart.vue';

export default {
       components: {
           FlowChart
       }
    };
</script>


<style scoped>

</style>
