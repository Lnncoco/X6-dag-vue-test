<template>
  <div>
    <div>Vue组件渲染</div>
    <el-switch
        v-model="value"
        active-text="开启"
        inactive-text="关闭">
    </el-switch>
  </div>
</template>

<script>
export default {
  name: "SwitchNode",
  data(){
    return {
      value: true,
    }
  },
  methods: {},
};
</script>
