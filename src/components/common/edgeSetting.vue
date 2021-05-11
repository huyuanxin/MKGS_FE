<template>
    <div>
      <div class="title">连线属性</div>
      <div class="attr-box">
        <!-- <p>
          <span class="item">连线ID</span>
          <span class="value">{{currentEdgeId}}</span>
        </p> -->
        <p>
          <span class="input-label">关系</span>
<!--          <el-input size="small" v-model="edgesLabel[currentEdgeId]" @input="edgeLabelChange"></el-input>-->
          <span class="input-relative">
                <el-select v-model="selected" @change="changeEdgesLabelCurrentEdgeId" placeholder="请选择">
                  <el-option v-for="(item, index) in relationsType" :key="index" :label="item" :value="item"/>
                </el-select>
          </span>
        </p>
      </div>
    </div>
</template>
<script>
    import { getRelationsType, getEntityType } from 'api/index.js';
    export default {
        props: {
        edgesLabel: {
            type: [Object, String],
            default() {
              return ''
            }
        },
        currentEdgeId: {
            type: String,
            default() {
              return ''
            }
        }
        },
        data() {
          return {
            relationsType: ["1", "2", "3"],
            selected: ''
          }
        },
        created() {
           this.getRelationsTypes();
        },
        methods: {
        edgeLabelChange(val) {
            this.$forceUpdate();
            this.$emit('edgeLabelChange', val)
        },
        async getRelationsTypes(){
          const res = await getEntityType();

          this.relationsType = res.result;
        },
        changeEdgesLabelCurrentEdgeId(val) {
          this.$forceUpdate();
          this.$emit('edgeLabelChange', val)

          this.edgesLabel[this.currentEdgeId] = val
        }
        }
    };
</script>
<style scoped>

::v-deep .el-input--small .el-input__inner {
  height: 32px;
  line-height: 32px;
  width: 279px;
}

</style>
