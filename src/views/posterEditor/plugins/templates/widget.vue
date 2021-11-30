<template>
  <div class="text-widget">template?</div>
</template>

<script>
import {mapState} from 'poster/poster.vuex';
import Widget from './constructor';

export default {
  mixins: [Widget.widgetMixin()],
  data() {
    return {};
  },
  computed: {
    ...mapState(['canvasSize']),
    text() {
      return this.wState.text;
    },
    textStyle() {
      return this.wState.style;
    },
  },
  created() {},
  methods: {
    getMenuList() {
      return [];
    },
  },
};
</script>
<style lang="scss" scoped>
.text-widget {
  width: 100%;
  height: 100%;

  .text-container {
    box-sizing: border-box;
    margin: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    white-space: wrap;
    word-break: break-all;

    &.editing {
      position: relative;
    }
  }
}
</style>
