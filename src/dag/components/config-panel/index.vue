<template>
  <div class="config-panel">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="参数设置" name="current">
        <div class="panel-cur" v-if="exist">
          <div class="panel-item">当前选中元素ID：{{ this.select.id }}</div>
          <div class="panel-item">
            节点名称：<el-input
              v-model="label"
              size="mini"
              class="input-label"
            ></el-input>
          </div>
        </div>
        <div class="panel-cur tip" v-else>暂无点选</div>
      </el-tab-pane>
      <el-tab-pane label="全局设置" name="overall"
        >这里放置全局设置</el-tab-pane
      >
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ConfigPanel",
  data() {
    return {
      activeName: "current",
      label: "",
    };
  },
  computed: {
    ...mapState(["select"]),
    exist() {
      if (!this.select) return false;
      return !!Object.keys(this.select).length;
    },
  },
  watch: {
    select(val) {
      if (!Object.keys(val).length) this.label = "";
      else this.label = val.label;
    },
    label(val) {
      if (Object.keys(val).length) this.select.cell.label = val;
    },
  },
  methods: {
    handleClick() {},
  },
};
</script>

<style lang="less" scoped>
.config-panel {
  .input-label {
    width: 60%;
  }
  .panel-cur {
    padding: 10px;
    &.tip {
      color: #666;
    }
  }
  .panel-item {
    & + .panel-item {
      margin-top: 10px;
    }
  }
}
</style>