<template>
  <div class="dag">
    <div class="title">流程模型</div>
    <div class="content">
      <TreePanel class="nodeSourceTreeContainer" />
      <div class="editPanel">
        <DagCanvas class="dagCanvas" />
        <ConfigPanel class="confPanel" />
      </div>
    </div>
  </div>
</template>

<script>
import DagCanvas from "./components/dag-canvas";
import ConfigPanel from "./components/config-panel";
import TreePanel from "./components/tree-panel";

export default {
  name: "Dag",
  components: { DagCanvas, ConfigPanel, TreePanel },
};
</script>
<style scoped lang="less">
.title {
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  min-height: 48px;
  overflow: hidden;
  line-height: 48px;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 0;
  .headerLeft,
  .headerRight {
    display: flex;
  }
}
.dag {
  width: 98vw;
  height: 100vh;
  overflow: hidden;
}
.content {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  max-height: calc(100vh - 48px);
  font-size: 12px;
}
.nodeSourceTreeContainer {
  display: flex;
  flex-direction: column;
  height: 100%;
}
@border: 1px solid rgba(0, 0, 0, 0.08);
.editPanel {
  display: flex;
  flex-grow: 1;
  align-items: stretch;
  justify-content: space-between;
  height: 800px;
  overflow: hidden;

  .dagCanvas {
    flex-grow: 1;
    border-right: @border;
  }

  .confPanel {
    width: 290px;
    min-width: 290px;
  }
}
</style>