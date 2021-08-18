<template>
  <div id="TreePanel" class="tree-panel">
    <div class="tab-wrapper">组件库</div>
    <div class="dnd-wrap">
      <div
        data-type="algo"
        class="dnd-algo"
        @mousedown.prevent="startDrag($event)"
      >
        algo node
      </div>
      <div data-type="rect" class="dnd-rect" @mousedown="startDrag($event)">
        Rect
      </div>
      <div data-type="circle" class="dnd-circle" @mousedown="startDrag($event)">
        Circle
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Addon, Shape, Dom } from "@antv/x6";
import dragEleList from "./dragEle";

const { Stencil } = Addon;
const { Dnd } = Addon;

export default {
  name: "TreePanel",
  data() {
    return {
      dnd: null,
    };
  },
  mounted() {},
  computed: mapState(["stencil", "graph"]),
  watch: {
    graph: {
      handler: function (v) {
        if (v) {
          this.init();
        }
      },
      immediate: true,
    },
  },
  methods: {
    init() {
      this.initDnd();
    },
    test() {
      console.log("drag");
    },
    initDnd() {
      console.log("this.graph", this.graph);
      this.dnd = new Dnd({
        target: this.graph,
        scaled: false,
        animation: true,
        validateNode(droppingNode, options) {
          return droppingNode.shape === "html"
            ? new Promise((resolve) => {
                const { draggingNode, draggingGraph } = options;
                const view = draggingGraph.findView(draggingNode);
                const contentElem = view.findOne("foreignObject > body > div");
                Dom.addClass(contentElem, "validating");
                setTimeout(() => {
                  Dom.removeClass(contentElem, "validating");
                  resolve(true);
                }, 3000);
              })
            : true;
        },
      });
    },
    startDrag(e) {
      const target = e.currentTarget;
      const type = target.getAttribute("data-type");
      const data = dragEleList[type];
      const node = this.graph.createNode(data);
      this.dnd.start(node, e);
    },
    // Stencil
    initStencil() {
      const stencil = new Stencil({
        title: "algo组件",
        target: this.graph,
        // search(cell, keyword) {
        //   return cell.shape.indexOf(keyword) !== -1
        // },
        placeholder: "Search by shape name",
        notFoundText: "Not Found",
        collapsable: true,
        stencilGraphWidth: 200,
        stencilGraphHeight: 100,
        groups: [
          {
            name: "group1",
            title: "Group(默认)",
          },
          {
            name: "group2",
            title: "Group",
            collapsable: false,
          },
        ],
      });
      console.log("stencil", stencil);
      this.$store.commit("saveStencil", stencil);
      console.log("stencil", this.stencil, this.graph);
      const el = document.querySelector("#TreePanel");
      if (el) el.appendChild(this.stencil.container);
      this.addShape();
    },
    addShape() {
      const { Rect, Circle } = Shape;
      const r = new Rect({
        width: 70,
        height: 40,
        attrs: {
          rect: { fill: "#31D0C6", stroke: "#4B4A67", strokeWidth: 6 },
          text: { text: "rect", fill: "white" },
        },
      });
      const c = new Circle({
        width: 60,
        height: 60,
        attrs: {
          circle: { fill: "#FE854F", strokeWidth: 6, stroke: "#4B4A67" },
          text: { text: "ellipse", fill: "white" },
        },
      });
      const c2 = new Circle({
        width: 60,
        height: 60,
        attrs: {
          circle: { fill: "#4B4A67", "stroke-width": 6, stroke: "#FE854F" },
          text: { text: "ellipse", fill: "white" },
        },
      });
      const r2 = new Rect({
        width: 70,
        height: 40,
        attrs: {
          rect: { fill: "#4B4A67", stroke: "#31D0C6", strokeWidth: 6 },
          text: { text: "rect", fill: "white" },
        },
      });
      this.stencil.load([r, c], "group1");
      this.stencil.load([c2.clone(), r2], "group2");
    },
  },
};
</script>

<style lang="less" scoped>
#TreePanel {
  width: 230px;
  position: relative;
  border: 1px solid #f0f0f0;
}

.tab-wrapper {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  height: 36px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 12px;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding-left: 10px;
}

.tabContentWrapper {
  flex-grow: 1;
  max-height: calc(100% - 33px);

  .hide {
    display: none;
  }
}
</style>
<style>
.dnd-wrap {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
}

.dnd-algo {
  width: 130px;
  height: 30px;
  border: 2px solid #108ee9;
  text-align: center;
  line-height: 30px;
  margin: 16px;
  cursor: move;
  border-radius: 30px;
}

.dnd-rect {
  width: 100px;
  height: 40px;
  border: 2px solid #108ee9;
  text-align: center;
  line-height: 40px;
  margin: 16px;
  cursor: move;
}

.dnd-circle {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  border: 2px solid #108ee9;
  text-align: center;
  line-height: 60px;
  margin: 16px;
  cursor: move;
}
</style>