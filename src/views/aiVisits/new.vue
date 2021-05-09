<template>
<!--  <div style="overflow: auto">
    <div class="content-header" />
    <div class="app-container" style="width: 1300px">
      <div class="box">
        <div class="filter-container" />-->
  <div id="app" class="wrapper">
    <JwChat-index
        :config="config"
        :taleList="list"
        @enter="bindEnter"
        v-model="inputMsg"
        :showRightBox='false'
        scrollType="scroll"
        :quickList="config.quickList"
        @clickTalk="talkEvent"
        :toolConfig="tool"
    >

<!--       <JwChat-rightbox class="rightSlot" :config="rightConfig" @click="rightClick" />-->
   <!--   <JwChat-talk class="rightSlot" :Talelist="talk" :config="quickConfig" @event="bindTalk" />
      <template slot="tools">
        <div style="width:20rem;text-align:right;" @click="toolEvent(12)">
         &lt;!&ndash; <JwChat-icon type="icon-lishi" title="自定义"/>&ndash;&gt;
        </div>
      </template>-->
    </JwChat-index>
  </div>

 <!--     </div>
    </div>
  </div>-->
</template>

<!--<script>
</script>-->

<script>
var moment = require('moment')
/*export default {
  name: "new"
}*/
const img = 'https://www.baidu.com/img/flexible/logo/pc/result.png'
const imgStr="imgs/chat/cover.png"
const robotName="健康机器人"
const listData = [
  /* {
 "date": new Date(),
   "text": {
     "text": "<i class='el-icon-document-checked' style='font-size:2rem;'/>",
     "subLink":{
       "text": "a.txt",
       "prop": {
         underline: false
       }
     },

   },
   "mine": false,
   "name": "留恋人间不羡仙",
   "img": imgStr
 },
 {
   "date": moment(new Date()).format('YYYY-MM-DD HH:mm:ss a'),
   "text": { "text": "起床不" },
   "mine": false,
   "name": "留恋人间不羡仙",
   "img": imgStr
 },
 {
   "date": moment(new Date()).format('YYYY-MM-DD HH:mm:ss a'),
   "text": { "text": "<audio data-src='https://www.w3school.com.cn/i/horse.mp3'/>" },
   "mine": false,
   "name": "只盼流星不盼雨",
   "img": imgStr
 },
 {
   "date": moment(new Date()).format('YYYY-MM-DD HH:mm:ss a'),
   "text": { "text": "<img data-src='"+img+"'/>" },
   "mine": false,
   "name": "只盼流星不盼雨",
   "img": imgStr
 },
 {
   "date": moment(new Date()).format('YYYY-MM-DD HH:mm:ss a'),
   "text": { "text": "<video data-src='https://www.w3school.com.cn/i/movie.mp4' controls='controls' />" },
   "mine": true,
   "name": "JwChat",
   "img": imgStr
 },*/
  {
    "date":moment(new Date()).format('YYYY-MM-DD HH:mm:ss a'),
    "mine": false,
    "name": "健康机器人",
    "img": imgStr,
    "text": {
      system: {
        title: '很高兴为您服务，请描述您的问题。您可以尝试输入以下问题：',
        subtitle: '猜您想问:',
        content: [
          {
            id: `system1`,
            text: '乳腺癌的症状有哪些'
          },
          {
            id: `system2`,
            text: '为什么有的人会失眠？'
          },
          {
            id: 'system',
            text: '失眠，感冒，高血压有哪些并发症？'
          }
        ]
      }
    }
  }
]
function getListArr(size) {
  const listSize = listData.length
  if(!size){
    size = listSize
  }
  let result = []
  for (let i = 0; i < size; i++) {
    const item = listData[Math.random()*listSize>>0]
    item.id = Math.random().toString(16).substr(-6)
    result.push(item)
  }
  return result
}
export default {
  name:"new",
  components: { },
  data () {
    return {
      inputMsg: '',
      list: [],
      tool: {
        show: ['file', 'history', 'img'],
        // showEmoji: false,
        callback: this.toolEvent
      },
      /*rightConfig: {
        listTip: '当前在线',
        // notice: '【公告】这是一款高度自由的聊天组件，基于AVue、Vue、Element-ui开发。点个赞再走吧 ',
        list: [
          {
            name: 'JwChat',
            "img": "image/three.jpeg",
            id:1,
          },
          {
            id:2,
            name: 'JwChat',
            "img": "image/three.jpeg"
          },
          {
            id:3,
            name: 'JwChat',
            "img": "image/three.jpeg"
          },
          {
            id:4,
            name: '留恋人间不羡仙',
            "img": "image/one.jpeg"
          },
          {
            name: '只盼流星不盼雨',
            "img": "image/two.jpeg"
          }
        ]
      },*/
      quickConfig: {
        nav: ['快捷回复', '超级回复'],
        showAdd: true,
        maxlength: 200,
        showHeader: true,
        showDeleteBtn: true,
      },
      talk: [
        '快捷回复1',
        '快捷回复2',
        '快捷回复3',
        '快捷回复4',
        '快捷回复5',
        '快捷回复6',
      ],
      config: {
        img: 'imgs/chat/cover.png',
        name: '健康机器人',
        dept: '最简单、最便捷',
        callback: this.bindCover,
        historyConfig:{
          show: true,
          tip: '加载更多',
          callback: this.bindLoadHistory,
        },
        //输入框提示
        quickList: [
          {text: '这里是jwchat，您想了解什么问题。', id:3},
          {text: 'jwchat是最好的聊天组件', id:4},
          {text: '谁将烟焚散，散了纵横的牵绊；听弦断，断那三千痴缠。', id:5},
          {text: '长夏逝去。山野间的初秋悄然涉足。', id:6},
          {text: '江南风骨，天水成碧，天教心愿与身违。', id:7},
          {text: '总在不经意的年生。回首彼岸。纵然发现光景绵长。', id:8},
          {text: '外面的烟花奋力的燃着，屋里的人激情的说着情话', id:10},
          {text: '假如你是云，我就是雨，一生相伴，风风雨雨；', id:11},
          {text: '即使泪水在眼中打转，我依旧可以笑的很美，这是你学不来的坚强。', id:12},
          {text: ' 因为不知来生来世会不会遇到你，所以今生今世我会加倍爱你。', id:13},
        ]
      },

    }
  },
  methods: {
    /**
     * @description: 点击加载更多的回调函数
     * @param {*}
     * @return {*}
     */
    bindLoadHistory () {
      const history = new Array(3).fill().map((i, j) => {
        return {
          "date": new Date().toLocaleTimeString(),
          "text": { "text": j + new Date() },
          "mine": false,
          "name": "JwChat",
          "img": "image/three.jpeg"
        }
      })
      let list = history.concat(this.list)
      this.list = list
      console.log('加载历史', list, history)
    },
    //点击回复中的链接显示
    talkEvent (play) {
     /* alert("dianjile ")*/
     /* this.inputMsg=play.data.text;*/
      this.bindEnter(play.data.text)
      console.log(play.data.text)
    },
    bindEnter (str) {
      const msg = str;
      console.log(msg, str);
      if (!msg) return;
      const msgObj = {
        "date": moment(new Date()).format('YYYY-MM-DD HH:mm:ss a'),
        "text": { "text": msg },
        "mine": true,
        "name": "我",
        "img": "public/img/admin.cf376cee.png"
      }
      this.list.push(msgObj)
    },
    /**
     * @description:
     * @param {*} type 当前点击的按钮
     * @param {*} plyload 附加文件或者需要处理的数据
     * @return {*}
     */
    toolEvent (type, plyload) {
      console.log('tools', type, plyload)
    },
    bindCover (event) {
      console.log('header', event)
    },
    rightClick (type) {
      console.log('rigth', type)
    },
    bindTalk (play) {
      console.log('talk', play)
    },
    bindWinBar (play = {}) {
      const {type, data={}} = play
      console.log(play);
      if(type==='winBar'){
        const { id, dept, name, img } = data
        this.config = {...this.config,  id, dept, name, img}
        this.winBarConfig.active = id
        if(id==='win00'){
          this.list = getListArr()
        } else
          this.list = getListArr(Math.random()*4>>0)
      }
      if(type==='winBtn'){
        const { target: {id } = {} } = data
        const {list} = this.winBarConfig
        this.winBarConfig.list =list.reduce((p,i)=>{
          if(id!=i.id)
            p.push( i )
          return p
        },[])
      }
    }
  },
  mounted () {
    this.list = getListArr()
  }
}
</script>
<style scoped>
.rightSlot {

  width: 100%;
  height: 100%;
  overflow: hidden;
  flex-direction: column;
}
</style>
<style>
.active {
  color: red;
}
* {
  padding: 0;
  margin: 0;
}
body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: linear-gradient(to bottom right, #7a88ff, #7affaf);
}
/*#app {
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
