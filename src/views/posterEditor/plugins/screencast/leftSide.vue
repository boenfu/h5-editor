<template>
  <div class="add-widget">
    <el-switch v-model="value1" active-text="启用字幕" inactive-text="关闭字幕">
    </el-switch>
  </div>
</template>

<script>
import {mapActions} from 'poster/poster.vuex';
import Widget from './constructor';

export default {
  data() {
    return {
      value1: false,
    };
  },
  methods: {
    ...mapActions(['addItem']),
    create({src}) {
      this.addItem(new Widget({wState: {src}}));
    },
  },
};
</script>
<style lang="scss" scoped>
.add-widget {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;

  .add {
    width: 100%;
  }
}
</style>
