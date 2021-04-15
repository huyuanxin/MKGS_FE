
  // 各个类型节点的dataSetting配置项映射
  const data = {
    // 数据库访问
      // database: { callSetting: {
      //     id: { label: '数据表自增id' , value: '', type: 'none' },
      //     source: { label: '数据源名称', value: '', type: 'select', options: [
      //       // 通过接口获取http://dev.cr-health.com:4470/crHesb/datasource/list/json，value取第一个
      //       // { value: id, label: dsName },
      //     ]},
      //     operation: { label: '操作', value: 'select', type: 'select', options: [
      //       { value: 'select', label: 'select' },
      //       { value: 'update', label: 'update' },
      //       { value: 'insert', label: 'insert' },
      //       { value: 'delete', label: 'delete' },
      //       { value: 'batch', label: 'batch' },
      //       { value: 'procedure', label: 'procedure' },
      //       { value: 'insertReturnKey', label: 'insertReturnKey' }
      //     ]},
      //     engine: { label: '模板引擎', value: 'beetl', type: 'select', options: [
      //       { value: 'beetl', label: 'beetl' },
      //       { value: 'velocity', label: 'velocity' }
      //     ]},
      //     timeout: { label: '超时时间(秒)', value: '3', type: 'select', options: [
      //       { value: '3', label: '3秒' },
      //       { value: '1', label: '1秒' },
      //       { value: '10', label: '10秒' },
      //       { value: '30', label: '30秒' },
      //       { value: '60', label: '60秒' },
      //       { value: '180', label: '180秒' }
      //     ]},
      //     sqlText: { label: 'SQL语句' , value: '', type: 'ace-sql', required: true },
      //   }
      // },
      // // webservice请求
      // webservice: { callSetting: {
      //     id: { label: '数据表自增id' , value: '', type: 'none' },
      //     wsClientId: { label: 'WS客户端', value: '', type: 'select', options: [
      //       // 通过接口获取http://dev.cr-health.com:4470/crHesb/wsclient/list/json, value取第一个
      //       // { value: id, label: clientName },
      //     ]},
      //     operation: { label: '调用名称' , value: '', type: 'text', required: true },
      //     reqType: { label: '请求参数类型', value: 'xml', type: 'select', options: [
      //       { value: 'xml', label: 'xml' },
      //       { value: 'json', label: 'json' },
      //       { value: 'object', label: 'object' },
      //       { value: 'class', label: 'class(请求具有命名空间的复杂对象)' }
      //     ]},
      //     respType: { label: '响应结果类型', value: 'xml', type: 'select', options: [
      //       { value: 'xml', label: 'xml' },
      //       { value: 'json', label: 'json' },
      //       { value: 'outParamXml', label: 'outParamXml' },
      //       { value: 'script', label: '自定义脚本' },
      //       { value: 'class', label: 'class(请求具有命名空间的复杂对象)' }
      //     ]},
      //     respScript: { label: '响应转换脚本' , value: '', type: 'none' },
      //     respNullable: { label: '响应是否可空', value: '0', type: 'select', options: [
      //       { value: '0', label: '不可空' },
      //       { value: '1', label: '可空' }
      //     ]},
      //     timeout: { label: '超时时间(秒)', value: '3', type: 'select', options: [
      //       { value: '3', label: '3秒' },
      //       { value: '1', label: '1秒' },
      //       { value: '10', label: '10秒' },
      //       { value: '30', label: '30秒' },
      //       { value: '60', label: '60秒' },
      //       { value: '180', label: '180秒' }
      //     ]},
      //     failRetryTime: { label: '失败尝试次数', value: '', type: 'text', required: true },
      //   }
      // },
      // // http请求
      // http: { callSetting: {
      //     id: { label: '数据表自增id' , value: '', type: 'none' },
      //     method: { label: 'HTTP请求方法', value: 'get', type: 'select', options: [
      //       { value: 'get', label: 'get' },
      //       { value: 'post', label: 'post' }
      //     ]},
      //     url: { label: 'url' , value: '', type: 'text', required: true },
      //     urlStyle: { label: 'url风格' , value: 'tradition', type: 'select', options: [
      //       { value: 'default', label: '传统' },
      //       { value: 'rest', label: 'REST' }
      //     ]},
      //     reqType: { label: '请求参数类型', value: 'xml', type: 'select', options: [
      //       { value: 'xml', label: 'xml' },
      //       { value: 'json', label: 'json' },
      //       { value: 'object', label: 'object' },
      //       { value: 'string:xml', label: 'string:xml' },
      //       { value: 'string:json', label: 'string:json' },
      //     ]},
      //     respType: { label: '响应结果类型', value: 'xml', type: 'select', options: [
      //       { value: 'xml', label: 'xml' },
      //       { value: 'json', label: 'json' },
      //       { value: 'outParamXml', label: 'outParamXml' },
      //       { value: 'script', label: '自定义脚本' }
      //     ]},
      //     respScript: { label: '响应转换脚本' , value: '', type: 'none' },
      //     respNullable: { label: '响应是否可空', value: '0', type: 'select', options: [
      //       { value: '0', label: '不可空' },
      //       { value: '1', label: '可空' }
      //     ]},
      //     timeout: { label: '超时时间(秒)', value: '3', type: 'select', options: [
      //       { value: '3', label: '3秒' },
      //       { value: '1', label: '1秒' },
      //       { value: '10', label: '10秒' },
      //       { value: '30', label: '30秒' },
      //       { value: '60', label: '60秒' },
      //       { value: '180', label: '180秒' }
      //     ]},
      //   }
      // },
      // // jms请求
      // jms: { callSetting: {
      //     id: { label: '数据表自增id' , value: '', type: 'none' },
      //     jmsServerId: { label: 'JMS服务器', value: '', type: 'select', options: [
      //       // 通过接口获取http://dev.cr-health.com:4470/crHesb/mqsever/list/json, value取第一个
      //       // { value: id, label: jmsName },
      //     ]},
      //     eip: { label: '交换方式', value: 'one-way', type: 'select', options: [
      //       { value: 'one-way', label: 'one-way' },
      //       { value: 'request-response', label: 'request-response' }
      //     ]},
      //     dataType: { label: '数据类型', value: 'json', type: 'select', options: [
      //       { value: 'json', label: 'json' },
      //       { value: 'xml', label: 'xml' }
      //     ]},
      //     queueOrTopic: { label: 'queueOrTopic', value: 'queue', type: 'select', options: [
      //       { value: 'queue', label: 'queue' },
      //       { value: 'topic', label: 'topic' }
      //     ]},
      //     queueName: { label: 'queue名称' , value: '', type: 'text' },
      //     topicName: { label: 'topic名称' , value: '', type: 'text' },
      //     timeout: { label: '接收超时' , value: '', type: 'text', required: true },
      //   }
      // },
      // // java执行
      // java: { callSetting: {
      //     id: { label: '数据表自增id' , value: '', type: 'none' },
      //     actionClassName: { label: '调用主类' , value: '', type: 'text', required: true },
      //     scope: { label: '对象作用域', value: 'singleton', type: 'select', options: [
      //       { value: 'singleton', label: 'singleton' },
      //       { value: 'prototype', label: 'prototype' }
      //     ]},
      //     config: { label: '配置信息' , value: '', type: 'textarea', required: true },
      //     isReturn: { label: '直接返回', value: '0', type: 'select', options: [
      //       { value: '0', label: '否' },
      //       { value: '1', label: '是' }
      //     ]},
      //   }
      // },
      // // groovy执行
      // groovy: { callSetting: {
      //     id: { label: '数据表自增id' , value: '', type: 'none' },
      //     scope: { label: '对象作用域', value: 'singleton', type: 'select', options: [
      //       { value: 'singleton', label: '缓存读取' },
      //       { value: 'prototype', label: '重新加载' }
      //     ]},
      //     isReturn: { label: '直接返回', value: '0', type: 'select', options: [
      //       { value: '0', label: '否' },
      //       { value: '1', label: '是' }
      //     ]},
      //     classContent: { label: 'groovy类内容' , value: '', type: 'ace-groovy', required: true },
      //   }
      // },
    // 循环调用
    iteration: { callSetting: {
        id: { label: '数据表自增id' , value: '', type: 'none' },
        items: { label: '迭代体' , value: '', type: 'text' },
        collects: { label: '收集项' , value: '', type: 'textarea' },
        script: { label: '循环过程的数组' , value: [ // 根据连线关系额外新增
          /* 通过流程图连线关系计算填充数据提交给后端
            { 
              itemName, 菜单项的名字
              process  过程id（确认一下传过程名还是过程id）
            }
          */
          ], type: 'none' }
      }
    },
    // 条件判断
    condition: { callSetting: {
        invokeId: { label: '数据表自增id' , value: '', type: 'none' },
        script: { label: '条件过程的数组' , value: [
        /* 通过流程图连线关系计算填充数据提交给后端
          { 
            expression, 条件表达式
            process  过程id（确认一下传过程名还是过程id）
          }
        */
        ], type: 'none' }
      } 
    },
    // 异步过程
      // async: { callSetting: {
      //   script: { label: '异步过程的数组' , value: [ // 根据连线关系额外新增
      //     /* 通过流程图连线关系计算填充数据提交给后端
      //       {
      //         itemName, 菜单项的名字
      //         process  过程id（确认一下传过程名还是过程id）
      //       }
      //     */
      //     ], type: 'none' }
      //   }
      // },
      // // 异步回调
      // callback: { callSetting: {
      //   script: { label: '异步回调的数组' , value: [ // 根据连线关系额外新增
      //     /* 通过流程图连线关系计算填充数据提交给后端
      //       {
      //         itemName, 菜单项的名字
      //         process  过程id（确认一下传过程名还是过程id）
      //       }
      //     */
      //     ], type: 'none' }
      //   }
      // },
      // // 原子服务
      // atomService: { callSetting: {
      //     id: { label: '数据表自增id' , value: '', type: 'none' },
      //     atomService: { label: '原子服务' , value: { id: '', serviceName: '' }, type: 'dialogSelect', required: true }
      //   }
      // }
  };
  const defaultNameMap = {
      // database: "database",
      // webservice: "webservice",
      // http: "http",
      // jms: "jms",
      // java: "java",
      // groovy: "groovy",
    iteration: "iteration",
    condition: "condition",
      // async: "async",
      // callback: "callback",
      // atomService: "atomService"
  }
  const menuTypes = ['condition', 'iteration', 'async', 'callback']
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      // 过程属性配置
      data[key].processSetting = {
        // type为none时不显示在界面上，具体值需要提交给后端的时候再根据流程图数据计算填充
        id: { label: '过程id' , value: '', type: 'none' },
        serviceId: { label: '服务id' , value: '', type: 'none' },
        prevProcess: { label: '前序过程' , value: [], type: 'none' },
        outerProcess: { label: '外部过程' , value: '', type: 'none' },
        invokeType: { label: '过程类型' , value: '', type: 'none' },

        processName: { label: '过程名称' , value: '', type: 'text', required: true },
        expression: { label: '过程条件' , value: '', type: 'textarea' },
        des: { label: '过程描述' , value: '', type: 'textarea' }
      }
      // 过程出入参和参数映射配置
      data[key].paramsSetting = { 
        in: { label: '入参配置参数', value: [] }, 
        out: { label: '出参配置参数', value: [] }, 
      }
    }
  }

  let dataSetting = data;
  export {
    defaultNameMap,
    menuTypes,
    dataSetting
  }
