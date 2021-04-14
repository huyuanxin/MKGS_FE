
  import { addCssRules } from 'flowChart/utils';

  const cssRules=`
  #mainContainer .tooltip{
      
  }

  #mainContainer .sourcePoint .tooltip .tooltip-arrow{
      position:absolute;
      left: 2px;
      width:0;
      height:0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: 8px solid black;
  }
  #mainContainer .sourcePoint .tooltip .tooltip-inner{
      background:black;
      color:#fff;
      padding:8px;
      border-radius:4px;
      white-space: nowrap;
      font-size:12px;
      position:relative;
      right:-10px;
  }

  #mainContainer .targetPoint .tooltip .tooltip-arrow{
      width:0;
      height:0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 8px solid black;
      margin: 0 auto;
      position:absolute;
      right:2px;
  }
  #mainContainer .targetPoint .tooltip .tooltip-inner{
      background:black;
      color:#fff;
      padding:8px;
      border-radius:4px;
      white-space: nowrap;
      font-size:12px;
      position:relative;
      left:-10px;
  }

  .fy_node{
      position:absolute;
      border:1px solid #289de9;
      width:170px;
      height:34px;
      line-height:32px;
      border-radius:4px;
      font-size:14px;
      cursor:move;
      box-sizing:border-box;
      background:#fff;
      padding: 1px;
  }
  .fy_node.fy_node_selected{
      background:#E2F2FF;
  }
  .fy_node:hover{
      border-width:2px;
      padding: 0;
  }
  .fy_node_logic {
      height: auto;
  }

  .jtk-endpoint {
      z-index:100;
  }

  .fy_node .blue_line{
      position:absolute;
      top:2px;
      left:3px;
      border-radius:2px;
      padding:14px 2px;
      background:#1c9bec;
  }
  .fy_node:hover .blue_line{
      top:1px;
      left:2px;
  }
  .fy_node:hover .node-des {
    left: -1px;
    bottom: -9px;
  }
  .fy_node .node_content i {
      position:relative;
      top:-10px;
      color: rgb(0, 205, 234);
      margin-left: 15px;
      margin-right: 15px;
  }
  .fy_node .node_content span{
      display:inline-block;
      width:82px;
      min-height: 32px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
  }
  .node-state{
      top: -9px !important;
      font-size: 20px;
      margin-left: 6px !important;
  }
  .fy_contextMenu{
      margin: 0;
      padding: 5px 0;
      min-width: 80px;
      position: absolute;
      list-style: none;
      background-color: hsla(0,0%,100%,.98);
      border: 1px solid #eee;
      -webkit-box-shadow: 5px 5px 30px rgba(0,0,0,.1);
      box-shadow: 5px 5px 30px rgba(0,0,0,.1);
      border-radius: 2px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      z-index:9999
  }
  .fy_contextMenu li {
      font-size: 12px;
      color: #333;
      height: 26px;
      line-height: 26px;
      padding-left: 10px;
      padding-right: 10px;
      cursor: pointer;
      -webkit-transition: background-color .1s ease;
      -o-transition: background-color .1s ease;
      transition: background-color .1s ease;
  }
  .fy_contextMenu li:hover {
      background-color: #e8f6ff;
      color: black;
  }
  .fy_contextMenu li span{
      margin-left:10px;
  }
  .jtk-drag-select * {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
  }
  .jtk-endpoint.sourcePoint {
      z-index:9;
      cursor:crosshair;
  }
  .jtk-connector{
      cursor: default;
  }
  .targetPoint.active:not(.jtk-endpoint-connected) svg circle{
      fill:#00cdea;
  }
  .jtk-connector.active path {
      animation-name: ring;
      animation-duration: 2s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      stroke-dasharray:5; 
  }
  .jtk-overlay {
      font-size: 14px !important;
  }
  @keyframes ring {
      from {
          stroke-dashoffset: 50;
      }
      to {
          stroke-dashoffset: 0;
      }
  }
  `
  const editorCss = addCssRules(cssRules);

  export default editorCss;



