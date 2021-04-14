<template>
    <div>
      <div class="title">连线属性</div>
      <div class="attr-box">
        <!-- <p>
          <span class="item">连线ID</span>
          <span class="value">{{currentEdgeId}}</span>
        </p> -->
        <p>
          <span class="input-label">条件</span>
          <el-input size="small" v-model="edgesLabel[currentEdgeId]" @input="edgeLabelChange"></el-input>
        </p>
      </div>
    </div>
</template>
<script>
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
        }
        },
        methods: {
        edgeLabelChange(val) {
            this.$forceUpdate();
            this.$emit('edgeLabelChange', val)
        }
        }
    };
</script>
<style scoped>
    
</style>
