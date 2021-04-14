<template>
    <div>
      <div class="title">服务配置</div>
      <div class="attr-box">
        <!-- <p>
          <span class="item">服务id</span>
          <span class="value">{{flowChartJson.serviceId}}</span>
        </p> -->
        <p>
          <span class="item">服务名称</span>
          <span class="value">{{flowChartJson.serviceName || '-'}}</span>
        </p>
        <p>
          <span class="item">服务描述</span>
          <span class="value">{{flowChartJson.serviceDescription || '-'}}</span>
        </p>
        <!-- <p class="text-center">
          <el-button size="small" type="primary" @click="changeBreadList([{ label: flowChartJson.serviceName + '服务入参', pageType: 'serviceParameterIn' }])">服务入参</el-button>
          <el-button size="small" type="primary" @click="changeBreadList([{ label: flowChartJson.serviceName + '服务出参', pageType: 'serviceParameterOut' }])">服务出参</el-button>
        </p> -->
      </div>
    </div>
</template>
<script>
    export default {
    props: {
      flowChartJson: {
        type: [Object, String],
        default() {
          return ''
        }
      }
    },
    data() {
      return {
      }
    },
    methods: {
      changeBreadList(bread) {
        this.$emit('changeBreadList', bread)
      }
    }
};
</script>
<style scoped>
    
</style>
