<template>
  <!--  <div class="dashboard-container">-->
  <!--    <div class="dashboard-text">name: {{ name }}</div>-->
  <!--  </div>-->
  <div style="overflow: auto">
    <div class="content-header" />
    <div class="app-container" style="width: 1300px">
      <div class="box">
        <div class="filter-container" />
<!--        <el-card class="box-card" style="height: auto;background: #D4F2E7">-->
        <el-card class="box-card" style="height: auto;background-image: url('https://chyshop.oss-cn-guangzhou.aliyuncs.com/null/background.jpeg') ">
          <!--          <div>-->
          <!--            <el-button-->
          <!--              type="primary"-->
          <!--              style="margin-bottom: 20px;-->
          <!--                  margin-top: 20px; margin-left: 400px"-->
          <!--              icon="el-icon-search"-->
          <!--              @click="query"-->
          <!--            > 查&emsp;&ensp;&ensp;询&emsp;&ensp;&ensp;</el-button>-->
          <!--          </div>-->
          <!--          <div>-->
          <!--            <el-input-->
          <!--              v-model="input"-->
          <!--              style="float:left;width: 580px"-->
          <!--              type="textarea"-->
          <!--              :rows="8"-->
          <!--              placeholder="请输入内容"-->
          <!--            />-->

          <!--            <el-input-->
          <!--              v-model="answer"-->
          <!--              style="float:left;width: 580px;margin-left: 20px"-->
          <!--              type="textarea"-->
          <!--              :rows="8"-->
          <!--            />-->
          <!--          </div>-->
          <!--          <div>-->
          <!--            <el-alert-->
          <!--              type="warning"-->
          <!--              style="margin-top: 200px; width: 580px;"-->
          <!--            >-->
          <!--              <template slot="title">-->
          <!--                <div class="iconSize">您可以尝试输入以下问题：</div>-->
          <!--                <div class="iconSize">乳腺癌的症状有哪些？</div>-->
          <!--                <div class="iconSize">为什么有的人会失眠？</div>-->
          <!--                <div class="iconSize">失眠，感冒，高血压有哪些并发症？</div>-->
          <!--                <div class="iconSize">白血病能治好吗？</div>-->
          <!--                <div class="iconSize">感冒，耳鸣要多久才能好？</div>-->
          <!--              </template>-->
          <!--            </el-alert>-->
          <!--          </div>-->
          <div>
            <JwChat-index v-model="inputMsg" style="margin-bottom: 100px" height="600px" width="525px" :tale-list="list" scroll-type="scroll" :config="config" :tool-config="tool" @enter="bindEnter">
              <!--              <div slot="tools">插槽</div>-->
<!--              <div class="box2" >-->
<!--                <JwChat-empty size="5rem"/>-->
<!--              </div>-->
              <JwChat-rightbox :config="rightConfig"  />
            </JwChat-index>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { getAnswer } from '@/api/answer'
var moment = require('moment')

export default {
  name: 'Aivisits',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  // created() {
  //   console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss a'))
  // },
  data() {
    return {
      input: '',
      answer: '',
      inputMsg: '',
      config: { /* historyConfig: {tip: '查看更多'*/
        img: 'https://chyshop.oss-cn-guangzhou.aliyuncs.com/null/health.jpeg',
        name: '知识问答',
        dept: '你的健康快乐是我最大的心愿',
        // callback: this.headerEvent,
      },
      rightConfig: {
        listTip: '注意事项~~~',
        notice: '【公告】这是一款高度自由的聊天组件，基于AVue、Vue、Element-ui开发。点个赞再走吧 ',
        list: [
          {
            name: '1、多喝热水',
            // "img": "../image/three.jpeg"
          }
        ]
      },
      list: [
        {
          date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss a'),
          text: { 'text': '很高兴为您服务，请描述您的问题。您可以尝试输入以下问题：\n' +
              '乳腺癌的症状有哪些？\n' +
              '为什么有的人会失眠？\n' +
              '失眠，感冒，高血压有哪些并发症？\n' +
              '白血病能治好吗？\n' +
              '感冒，耳鸣要多久才能好？' },
          mine: false,
          name: '健康助理',
          img: 'https://chyshop.oss-cn-guangzhou.aliyuncs.com/null/robot.jpeg'
        }
      ],
      tool: {
        show: ['file', 'history', 'img'],
        callback: this.toolEvent,
        showEmoji: true
      }
    }
  },
  methods: {
    bindEnter() {
      const msg = this.inputMsg
      if (!msg) return
      const questionMsg = {
        'date': moment(new Date()).format('YYYY-MM-DD HH:mm:ss a'),
        'text': { 'text': msg },
        'mine': true,
        'name': '我',
        'img': 'https://chyshop.oss-cn-guangzhou.aliyuncs.com/null/user.jpeg'
      }
      this.list.push(questionMsg)
      const answerMsg = {}
      getAnswer(msg).then(response => {
        console.log('已发送请求')
        this.$message.success('查询成功！')
        answerMsg.data = moment(new Date()).format('YYYY-MM-DD HH:mm:ss a')
        answerMsg.text = { 'text': response.result }
        answerMsg.mine = false
        answerMsg.name = '健康助理'
        answerMsg.img = 'https://chyshop.oss-cn-guangzhou.aliyuncs.com/null/robot.jpeg'
        console.log(answerMsg)
        this.list.push(answerMsg)
      })
    },
    toolEvent(type) {
      console.log('tools', type)
    }
    // async query() {
    //   // getAnswer(this.input).then(response => {
    //   //   console.log('已发送请求')
    //   //   // this.$message.success('查询成功！')
    //   //   // this.input = response.data.result
    //   // })
    //   try {
    //     const response = await getAnswer(this.input)
    //     this.$message.success('查询成功！')
    //     this.answer = response.result
    //     console.log(response)
    //   } catch (error) {
    //     console.log(error)
    //   }
    //   // console.log(123)
    // }
  }
}
</script>

<style scoped>


.box2 {
  position: relative;
  width: 10rem;
  height: 10rem;
  margin: 2rem auto;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
button.el-button.el-button--primary {
  width: 120px;
}
div.iconSize {
  font-size: 15px;
  line-height: 30px;
}
</style>
