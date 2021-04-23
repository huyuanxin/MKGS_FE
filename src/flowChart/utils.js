import {CONNECTORSEPARATESYMBOL} from 'flowChart/const'

/**
   * @description 增加css规则
   * @export {function}
   * @param {string} cssRules 字符串形式的css代码
   */
function addCssRules(cssRules) {
  const css = cssRules;
  const style = document.createElement('style');
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  document.getElementsByTagName('head')[0].appendChild(style);
};

/**
   * @description 判断端点的类型（Dot，Rect）
   * @param {Anchor} anchor
   * @export {function}
   * @returns {boolean}
   */
function isEndpoint(anchor) {
  return anchor.type === 'Dot';
};

/**
   * @description 生成uuid
   * @export {function}
   * @returns {string}
   */
function createUuid() {
  let uuid = uuidv1();

  // 保证生成安全的uuid
  while (uuid.includes(CONNECTORSEPARATESYMBOL) || uuid.includes('|') || uuid.includes('_') || uuid.includes('param-')) {
    uuid = uuidv1();
  }
  return uuid;
};

export {
  addCssRules,
  isEndpoint,
  createUuid
};
