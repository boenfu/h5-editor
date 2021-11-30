<template>
  <div class="add-widget">
    <el-button class="add" size="mini" type="plain" @click="create"
      >启用 TTS 字幕</el-button
    >
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
    create() {
      this.addItem(new Widget({wState: {}}));
    },
  },
};
</script>
<style lang="scss" scoped>
.add-widget {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;

  .title {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 0;
    font-size: 12px;
    font-weight: bold;
    color: $colorText;
  }

  .add {
    width: 100%;
  }
}
</style>
