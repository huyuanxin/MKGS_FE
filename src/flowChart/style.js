
const connectorPaintStyle = {
  strokeWidth: 2,
  stroke: '#b4bdc5',
  joinstyle: 'round',
  outlineStroke: 'transparent',
  outlineWidth: 2,
};

const connectorHoverStyle = {
  // strokeWidth: 2,
  stroke: '#216477',
};
const endpointHoverStyle = {
  stroke: '#00cdea',
  fill: '#00cdea',
};

const targetEndpoint = {
  cssClass: 'targetPoint',
  isTarget: true,
  endpoint: 'Dot',
  maxConnections: -1,
  paintStyle: { fill: 'transparent', radius: 6 },
  // hoverPaintStyle: endpointHoverStyle,
  dropOptions: { hoverClass: 'hover', activeClass: 'active' },
};

const sourceEndpoint = {
  cssClass: 'sourcePoint',
  isSource: true,
  endpoint: 'Dot',
  maxConnections: -1,
  paintStyle: {
    stroke: '#00cdea',
    fill: '#FFF',
    radius: 4,
    strokeWidth: 2,
  },
  connector: ['Bezier',
    {
      curviness: 70,
      stub: [40, 60],
      gap: 8,
      cornerRadius: 5,
      alwaysRespectStubs: true,
    },
  ],
  connectorStyle: connectorPaintStyle,
  hoverPaintStyle: endpointHoverStyle,
  connectorHoverStyle,
  dragOptions: {},
};

export {
  targetEndpoint,
  sourceEndpoint
};

