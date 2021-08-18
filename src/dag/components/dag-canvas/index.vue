<template>
  <div class="dag-canvas">
    <div class="canvas-top">
      <div class="title">X6</div>
      <div class="operation">
        <el-button type="text" @click="onUndo" :disabled="!canUndo"
          >撤回</el-button
        >
        <el-button type="text" @click="onRedo" :disabled="!canRedo"
          >重做</el-button
        >
      </div>
    </div>
    <div id="container" ref="container"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Graph, Platform } from "@antv/x6";
import "@antv/x6-vue-shape";
import { initRegisterAlgoNode, onPortRendered } from "./algoNode";
import findAttr from "./borderAttrs";

export default {
  name: "dagCanvas",
  data() {
    return {
      history: null,
      canRedo: false,
      canUndo: false,
    };
  },
  computed: mapState(["graph"]),
  mounted() {
    this.init();
  },
  methods: {
    registerNode() {},
    registerConnector() {},
    init() {
      const that = this;
      initRegisterAlgoNode();
      const graph = new Graph({
        grid: true,
        container: this.$refs.container,
        history: true,
        snapline: {
          enabled: true,
          sharp: true,
        },
        // 框选
        selecting: {
          enabled: false,
          multiple: false,
          rubberband: false,
          movable: true,
          showNodeSelectionBox: true,
        },
        // 缩放
        scroller: {
          enabled: true,
          pannable: true,
          pageVisible: false,
          pageBreak: false,
        },
        // 鼠标控制
        mousewheel: {
          enabled: true,
          modifiers: ["ctrl", "meta"],
        },
        // 渲染链接桩
        onPortRendered: (args) => onPortRendered(args),
        highlighting: {
          nodeAvailable: {
            name: "className",
            args: {
              className: "available",
            },
          },
          magnetAvailable: {
            name: "className",
            args: {
              className: "available",
            },
          },
          magnetAdsorbed: {
            name: "className",
            args: {
              className: "adsorbed",
            },
          },
        },
        connecting: {
          snap: true,
          allowBlank: false,
          allowLoop: false,
          highlight: true,
          sourceAnchor: {
            name: "bottom",
            args: {
              dx: Platform.IS_SAFARI ? 5 : 0,
            },
          },
          targetAnchor: {
            name: "center",
            args: {
              dx: Platform.IS_SAFARI ? 5 : 0,
            },
          },
          connectionPoint: "anchor",
          connector: "algo-edge",
          createEdge() {
            return that.graph.createEdge({
              attrs: {
                line: {
                  strokeDasharray: "5 5",
                  stroke: "#808080",
                  strokeWidth: 1,
                  targetMarker: {
                    name: "block",
                    args: {
                      size: "6",
                    },
                  },
                },
              },
            });
          },
          validateMagnet({ magnet }) {
            return magnet.getAttribute("port-group") !== "in";
          },
          validateConnection({
            sourceView,
            targetView,
            sourceMagnet,
            targetMagnet,
          }) {
            // 只能从输出链接桩创建连接
            if (
              !sourceMagnet ||
              sourceMagnet.getAttribute("port-group") === "in"
            ) {
              return false;
            }

            // 只能连接到输入链接桩
            if (
              !targetMagnet ||
              targetMagnet.getAttribute("port-group") !== "in"
            ) {
              return false;
            }

            // 判断目标链接桩是否可连接
            const portId = targetMagnet.getAttribute("port");
            const node = targetView.cell;
            const port = node.getPort(portId);
            if (port && port.connected) {
              return false;
            }

            return true;
          },
        },
      });
      this.$store.commit("saveGraph", graph);
      // this.graph.centerContent()
      this.run();
      this.onEvent();
      this.initHistory();
    },
    run() {
      console.log("run", this.graph);

      this.graph.addNode({
        shape: "vue-shape", // Vue组件
        x: 40,
        y: 50,
        width: 130,
        height: 50,
        component: "algo-BtnNode",
        ports: {
          items: [
            { group: "in", id: "in1" },
            { group: "in", id: "in2" },
            { group: "out", id: "out1" },
          ],
          groups: {
            in: {
              position: { name: "top" },
              zIndex: 1,
            },
            out: {
              position: { name: "bottom" },
              zIndex: 1,
            },
          },
        },
      });

      const start = this.graph.addNode({
        x: 280,
        y: 50,
        width: 160,
        height: 30,
        shape: "algo-node",
        label: "algo节点B",
        attrs: {
          body: {
            strokeDasharray: "10,2",
            stroke: "#108ee9",
          },
          label: {
            text: "start",
            fill: "#333",
          },
        },
        ports: {
          items: [
            { group: "in", id: "in1" },
            { group: "in", id: "in2" },
            { group: "out", id: "out1" },
          ],
          groups: {
            in: {
              position: { name: "top" },
              zIndex: 1,
            },
            out: {
              position: { name: "bottom" },
              zIndex: 1,
            },
          },
        },
      });

      this.graph.addNode({
        x: 120,
        y: 180,
        width: 160,
        height: 30,
        shape: "algo-node",
        label: "algo节点A",
        ports: {
          items: [
            { group: "in", id: "in1" },
            { group: "in", id: "in2" },
            { group: "out", id: "out1" },
            { group: "out", id: "out2" },
          ],
          groups: {
            in: {
              position: { name: "top" },
              zIndex: 1,
            },
            out: {
              position: { name: "bottom" },
              zIndex: 1,
            },
          },
        },
      });

      const target = this.graph.addNode({
        x: 520,
        y: 270,
        width: 160,
        height: 30,
        shape: "algo-node",
        label: "algo节点C",
        ports: {
          items: [
            { group: "in", id: "in1" },
            { group: "in", id: "in2", connected: true },
            { group: "out", id: "out1" },
          ],
          groups: {
            in: {
              position: { name: "top" },
              zIndex: 1,
            },
            out: {
              position: { name: "bottom" },
              zIndex: 1,
            },
          },
        },
      });

      this.graph.addEdge({
        source: { cell: start, port: "out1" },
        target: { cell: target, port: "in2" },
        attrs: {
          line: {
            stroke: "#808080",
            strokeWidth: 1,
            targetMarker: "",
          },
        },
      });
    },
    onEvent() {
      this.graph.on("node:click", (args) => {
        console.log("单击事件", args);
        this.resetShape();
        args.node.attr("body/stroke", "orange");
        this.$store.commit("saveSelectInfo", {
          id: args.cell.id,
          label: args.cell.label,
          cell: args.cell,
        });
      });
      this.graph.on("blank:click", () => {
        this.resetShape();
        this.$store.commit("resetSelectInfo");
      });
      this.graph.on("node:selected", (args) => {
        console.log("选中节点", args);
        this.$store.commit("saveSelectInfo", {
          id: args.cell.id,
          label: args.cell.label,
          cell: args.cell,
        });
      });
      this.graph.on("node:unselected", (args) => {
        console.log("取消选中节点", args);
        this.$store.commit("resetSelectInfo");
      });
      this.graph.on("cell:contextmenu", (args) => {
        console.log("点击右键", args);
      });
    },
    resetShape() {
      this.graph.drawBackground({ color: "#fff" });
      const nodes = this.graph.getNodes();
      const edges = this.graph.getEdges();
      nodes.forEach((node) => {
        console.log("node.shape", node.shape);
        const stroke = findAttr(node.shape).stroke;
        if (stroke) node.attr("body/stroke", stroke);
        else node.attr("body/stroke", "#fff");
      });
    },
    initHistory() {
      this.history = this.graph.history;
      this.history.on("change", () => {
        this.canRedo = this.history.canRedo();
        this.canUndo = this.history.canUndo();
      });
    },
    onUndo() {
      this.history.undo();
    },
    onRedo() {
      this.history.redo();
    },
  },
};
</script>

<style lang="less" scoped>
#container {
  width: 100%;
  height: 100%;
}

.dagContainer {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-bottom: 40px;

  .canvasContent {
    flex-grow: 1;
  }
}

.canvas-top {
  height: 30px;
  padding: 0 10px;

  .title {
    display: inline-block;
    line-height: 30px;
  }

  .operation {
    display: inline-block;
    margin-left: 20px;
  }
}
</style>
<style>
.x6-node [magnet="true"] {
  cursor: crosshair;
  transition: none;
}

.x6-node [magnet="true"]:hover {
  opacity: 1;
}

.x6-node [magnet="true"][port-group="in"] {
  cursor: move;
}

.my-port {
  width: 100%;
  height: 100%;
  border: 1px solid #808080;
  border-radius: 100%;
  background: #eee;
}

.my-port.connected {
  width: 0;
  height: 0;
  margin-top: 5px;
  margin-left: 1px;
  border-width: 5px 4px 0;
  border-style: solid;
  border-color: #808080 transparent transparent;
  border-radius: 0;
  background-color: transparent;
}

.x6-port-body.available {
  overflow: visible;
}

.x6-port-body.available body {
  overflow: visible;
}

.x6-port-body.available body > div::before {
  content: " ";
  float: left;
  width: 20px;
  height: 20px;
  margin-top: -5px;
  margin-left: -5px;
  border-radius: 50%;
  background-color: rgba(57, 202, 116, 0.6);
  box-sizing: border-box;
}

.x6-port-body.available body > div::after {
  content: " ";
  float: left;
  clear: both;
  width: 10px;
  height: 10px;
  margin-top: -15px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #39ca74;
  position: relative;
  z-index: 10;
  box-sizing: border-box;
}

.x6-port-body.adsorbed {
  overflow: visible;
}

.x6-port-body.adsorbed body {
  overflow: visible;
}

.x6-port-body.adsorbed body > div::before {
  content: " ";
  float: left;
  width: 28px;
  height: 28px;
  margin-top: -9px;
  margin-left: -9px;
  border-radius: 50%;
  background-color: rgba(57, 202, 116, 0.6);
  box-sizing: border-box;
}

.x6-port-body.adsorbed body > div::after {
  content: " ";
  float: left;
  clear: both;
  width: 10px;
  height: 10px;
  margin-top: -19px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #39ca74;
  position: relative;
  z-index: 10;
  box-sizing: border-box;
}
</style>