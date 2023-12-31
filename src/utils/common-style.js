export function getCommonShadowStyleEl() {
  // 不同文件引入后，样式文件路径不一样
  // const commonStyleEl = document.createElement('link')
  // commonStyleEl.setAttribute('ref', 'stylesheet')
  // commonStyleEl.setAttribute('href', './common-style.css')
  const commonStyleEl = document.createElement('style')
  commonStyleEl.innerHTML = `
    * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-size: 14px;
    box-sizing: border-box;
    }
    input {
      outline: none;
      border-width: 0px;
    }
    .pointer {
      cursor: pointer;
    }
    .primary-color {
      color: var(--primary);
    }
  `
  return commonStyleEl
}
