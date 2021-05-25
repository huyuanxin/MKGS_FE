<template>
  <div class="button-container">
    <div class="treeMenu">
      <el-input placeholder="搜索"
                size="small"
                class="search-area">
        <i slot="prefix"
           class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-tree
          :data="data"
          :props="defaultProps"
          class="treeMenu-list"
          ref="tree"
          lazy
          :load="loadNode"
          @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="form">
      <el-form ref="form"  label-width="80px" v-for="(item,index) in relationList" :key="index">
        <el-form-item label="编号">
          <el-input v-model="item.name.id" class="inputArea"></el-input>
        </el-form-item>
        <el-form-item label="实体名称">
          <el-input v-model="item.name.entityName" class="inputArea"></el-input>
        </el-form-item>
        <el-form-item label="实体类型">
          <el-input v-model="item.name.entityType" class="inputArea last-input"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getEntityType,getAllEntitiesByType,getAllRelationByName } from 'api/index.js'

export default {
  name: "index",
  data() {
    return {
      form: {
        id:'',
        entityName:'',
        entityType:''
      },
      relationList: [],
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'name',
        id: 'id',
        parentId: 'parentId',
        isLeaf: 'isLeaf'
  }
    };
  },
  created(){
    // this.getList();
  },
  methods: {
    handleNodeClick(data) {
      data.label = 'testing'
      // console.log(data);
    },
    async getList(){
      const dataList = []
      const level1_list = (await getEntityType()).result
      // console.log("level1_list",level1_list)
      for (const key in level1_list) {
        const tmp = {
          label: level1_list[key],
          children: getLevel2_list(level1_list[key])
        }
        // const tmp = {};
        // tmp["label"]=level1_list[key],
        // tmp["children"]=getLevel2_list(level1_list[key])

        dataList.push(tmp)
        // console.log("level1_list[key]",level1_list[key])

      }

      // console.log("datalist",dataList)

      async function getLevel2_list(level1_label) {
        // console.log("getLevel2_list", level1_label)
        const level2_list = [];
        const rep = await getAllEntitiesByType(level1_label)
        const result = rep.result;
        for (const key in result) {
          level2_list.push({
            label: result[key].entityName,
            children: getLevel3_list(result[key].entityName)
          })
      }

        return level2_list;
      }

      async function getLevel3_list(level2_label) {
        const level3_list = [];
        const rep = await getAllRelationByName(level2_label)
        const result = rep.result;
        console.log("getLevel3_list",rep)
        for (const key in result) {
          level3_list.push({
            label: result[key],
            children: []
          })
        }

        return level3_list;
      }



    },
    async loadNode(node, resolve) {        // 加载 树数据
      let that = this;

      if (node.level === 0) {
        try {
          const res = await that.loadtreeData();
          return resolve(res)
        } catch (e) {
          console.log(e)
          return resolve([])
        }

      }

      if (node.level === 1) {
        try {
          const res = await this.getChildByList(node.data.name);
          return resolve(res)
        } catch (e) {
          console.log(e)
          return resolve([])
        }

        // return resolve([]); // 加上这个，防止在该节点没有子节点时一直转圈的问题发生。
      }

      if (node.level >= 2){
        try {
          const res = await this.getAllRelation(node.data.name)
          that.relationList = res
          // console.log(that.relationList)
          // console.log("level2dataname",node.data.name)
          // console.log("level2res",res)
          return resolve([])
        } catch (e){
          console.log(e)
          return resolve([])
        }
      }
    },
    loadtreeData() {      // 获取loadtreeData 就是父节点数据，getChildByList就是异步获取子节点数据
      let params = {ParentID : 0};

      return getEntityType().then(res =>{
        // console.log("商品信息的 tree: ",res)
        if(res.success == true) {
          let data = res.result.map(x => ({ name: x }))
          // 前者item.参数名称为 prop中的规定的属性名称
          // data.forEach(item => {
          //   item.name = item.name;
          //   item.parentId = item.parentId;
          //   item.id = item.id;
          //   item.isLeaf = true;
          // });
          return Promise.resolve(data)
        }else {
          return Promise.reject()
        }

      }).catch(err =>{
        console.log(err);
        return Promise.reject(err)
      });
    },
    getChildByList(name) {     // 获取子节点请求
      // let params = {ParentID : _parentID};
      return getAllEntitiesByType(name).then(res =>{
        if(res.success == true) {
          let data = res.result.map(x => ({ name: x.entityName }));
          // data.forEach(item => {
          //   item.name = item.name;
          //   item.parentId = item.parentId;
          //   item.id = item.id;
          //   item.isLeaf = false;
          // });
          return Promise.resolve(data);
        } else {
          return Promise.reject()
        }
      }).catch(err =>{
        console.log(err);
        return Promise.reject(err)
      });
    },
    getAllRelation(name){
      return getAllRelationByName(name).then(res =>{
        if(res.success == true) {
          let data = res.result.map(x => ({ name: x }));
          return Promise.resolve(data);
        } else {
          return Promise.reject()
        }
      }).catch(err =>{
        console.log(err);
        return Promise.reject(err)
      });
    }

  }
}
</script>

<style scoped>
.button-container {
  display: flex;
}

.treeMenu {
  width: 500px;
  height: 100%;
}
.form {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
}

.inputArea {
  width: 250px;
}

.last-input {
  margin-bottom: 30px;
}

.search-area {
  margin-bottom: 8px;
}

.treeMenu-list {
  border-radius: 4px;
  border: 1px solid #DCDFE6;
}

</style>
