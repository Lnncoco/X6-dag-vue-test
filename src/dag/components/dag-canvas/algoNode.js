import { Graph, Node, Platform, Dom, Addon } from "@antv/x6";
import SwitchNode from "@/dag/components/node/switch";

export const algoNode = {
  inherit: "rect",
  attrs: {
    body: {
      strokeWidth: 1,
      stroke: "#108ee9",
      fill: "#fff",
      rx: 15,
      ry: 15,
    },
  },
  portMarkup: [
    {
      tagName: "foreignObject",
      selector: "fo",
      attrs: {
        width: 10,
        height: 10,
        x: -5,
        y: -5,
        magnet: "true",
      },
      children: [
        {
          ns: Dom.ns.xhtml,
          tagName: "body",
          selector: "foBody",
          attrs: {
            xmlns: Dom.ns.xhtml,
          },
          style: {
            width: "100%",
            height: "100%",
          },
          children: [
            {
              tagName: "div",
              selector: "content",
              style: {
                width: "100%",
                height: "100%",
              },
            },
          ],
        },
      ],
    },
  ],
};

export const vueShape = {
  template: `
    <switch-node/>`,
  components: {
    SwitchNode,
  },
  portMarkup: [
    {
      tagName: "foreignObject",
      selector: "fo",
      attrs: {
        width: 10,
        height: 10,
        x: -5,
        y: -5,
        magnet: "true",
      },
      children: [
        {
          ns: Dom.ns.xhtml,
          tagName: "body",
          selector: "foBody",
          attrs: {
            xmlns: Dom.ns.xhtml,
          },
          style: {
            width: "100%",
            height: "100%",
          },
          children: [
            {
              tagName: "div",
              selector: "content",
              style: {
                width: "100%",
                height: "100%",
              },
            },
          ],
        },
      ],
    },
  ],
};

/**
 * 注册节点
 */
const registerAlgoNode = () => {
  Graph.registerNode("algo-node", algoNode, true);
};

/**
 * 注册Vue组件节点
 */
const registerAlgoBtnNode = () => {
  Graph.registerVueComponent("algo-BtnNode", vueShape, true);
};

export const initRegisterAlgoNode = () => {
  registerAlgoNode();
  registerAlgoBtnNode();
  registerConnector();
};

/**
 * 定义边
 */
export const registerConnector = () => {
  Graph.registerConnector(
    "algo-edge",
    (source, target) => {
      const offset = 4;
      const control = 80;
      const v1 = { x: source.x, y: source.y + offset + control };
      const v2 = { x: target.x, y: target.y - offset - control };

      return `M ${source.x} ${source.y}
         L ${source.x} ${source.y + offset}
         C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${target.x} ${target.y - offset}
         L ${target.x} ${target.y}
        `;
    },
    true
  );
};

/**
 * 渲染链接桩
 * @param {*} args
 */
export const onPortRendered = (args) => {
  const port = args.port;
  const contentSelectors = args.contentSelectors;
  const container = contentSelectors && contentSelectors.content;
  if (container) {
    // DOM操作
    const div = document.createElement("div");
    div.classList.add("my-port");
    if (port.connected) div.classList.add("connected");
    container.appendChild(div);

    // react
    // ReactDOM.render(
    //     <Tooltip title="port">
    //       <div className={`my-port${port.connected ? ' connected' : ''}`}/>
    //     </Tooltip>,
    //     container,
    // )
  }
};
