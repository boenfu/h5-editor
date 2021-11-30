<template>
  <div class="widget-control">
    <el-collapse v-model="activeNames">
      <div>测试</div>
      <el-collapse-item name="position">
        <template #title>
          <div class="header">位置</div>
        </template>
        <position-control :drag-info="dragInfo" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import {commonMixin} from 'poster/control/widgets/common/mixins';

export default {
  mixins: [commonMixin],
  data() {
    return {
      activeNames: ['position'],
    };
  },
};
</script>
<style lang="scss" scoped>
.widget-control {
  width: 100%;

  .header {
    box-sizing: border-box;
    padding: 0 20px;
  }

  .setting-content {
    background-color: rgb(238, 238, 238);
    box-sizing: border-box;
    padding: 0 20px 10px;
  }

  .setting-item {
    .content {
      input {
        width: 100%;
        height: 34px;
        border: 1px solid rgb(117, 117, 117);
        box-sizing: border-box;
        padding: 0 4px;
      }
    }
  }
}
</style>
