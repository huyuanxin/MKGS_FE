
let FlowChartJson = {
  nodes: [],
  endpoints: [],
  edges: [],
  head: [], // 头节点id
  edgesLabel: {}, // 连线标签映射，key为edges里的一项，value为连线标签
  serviceId: '', // 服务id
  serviceName: '', // 服务名称
  serviceDescription: '', // 服务描述
  serviceParamsSetting: { in: [], out: [] } // 服务的出入参配置
};

function getData() {
  return FlowChartJson;
};

function setData(data) {
  FlowChartJson = data;
};

function resetData() {
  FlowChartJson = {
    ...FlowChartJson,
    nodes: [],
    endpoints: [],
    edges: [],
    head: '',
    edgesLabel: {}
  }
};

function getEndpoints() {
  return FlowChartJson.endpoints;
};

function addNode(nodeData) {
  FlowChartJson.nodes.push(nodeData);
};

function removeNodeByNodeId(nodeId) {
  FlowChartJson.nodes = FlowChartJson.nodes.filter(node => node.id !== nodeId);
};

function getNodeDataByNodeId(nodeId) {
  return FlowChartJson.nodes.find(n => n.id === nodeId);
};

function addEdge(edge) {
  FlowChartJson.edges.push(edge);
  FlowChartJson.edgesLabel[edge] = '';
};

function addEdgeLabel(edge, label) {
  FlowChartJson.edgesLabel[edge] = label;
};

function removeEdge(edge) {
  FlowChartJson.edges = FlowChartJson.edges.filter(item => item !== edge);
  delete FlowChartJson.edgesLabel[edge]
};

function getEdgesByPointIds(ids) {
  const data = [];
  FlowChartJson.edges.forEach((edge) => {
    ids.forEach((id) => {
      if (edge.indexOf(id) > -1) {
        data.push(edge);
      }
    });
  });
  return data;
};

function removeEdgesByPointIds(ids) {
  ids.forEach((id) => {
    FlowChartJson.edges = FlowChartJson.edges.filter(edge => edge.indexOf(id) === -1);
    for (let edge in FlowChartJson.edgesLabel) {
      if (FlowChartJson.edgesLabel.hasOwnProperty(edge) && edge.indexOf(id) > -1) {
        delete FlowChartJson.edgesLabel[edge]
      }
    }
  });
};

function addEndpoint(point) {
  FlowChartJson.endpoints.push(point);
};

function getEndpointsByPointIds(ids) {
  return [...FlowChartJson.endpoints.filter((point) => {
    if (ids.indexOf(point.id) > -1) {
      return true;
    }
    return false;
  })];
};

function removeEndpointsByPointIds(ids) {
  ids.forEach((id) => {
    FlowChartJson.endpoints = FlowChartJson.endpoints.filter(point => point.id !== id);
  });
};

function changeNodePos(nodeId, newPosition) {
  const node = FlowChartJson.nodes.find(n => n.id === nodeId);
  node.position = newPosition;
};

function changeNodeValue(nodeId, value) {
  const node = FlowChartJson.nodes.find(n => n.id === nodeId);
  node.data.value = value;
};

function getNodeData(nodeId) {
  return FlowChartJson.nodes.find(x => x.id === nodeId).data
};

function setNodeData(nodeId, data) {
  const node = FlowChartJson.nodes.find(n => n.id === nodeId);
  node.data = data
};

function getEdgesLabel() {
  return FlowChartJson.edgesLabel
};

function getHead() {
  return FlowChartJson.head;
};

export default {
  FlowChartJson,
  getData,
  setData,
  resetData,
  getEndpoints,
  addNode,
  removeNodeByNodeId,
  getNodeDataByNodeId,
  addEdge,
  addEdgeLabel,
  removeEdge,
  getEdgesByPointIds,
  removeEdgesByPointIds,
  addEndpoint,
  getEndpointsByPointIds,
  removeEndpointsByPointIds,
  changeNodePos,
  changeNodeValue,
  getNodeData,
  setNodeData,
  getEdgesLabel,
  getHead
};

