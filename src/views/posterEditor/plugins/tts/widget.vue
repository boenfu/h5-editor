<template>
  <div class="text-widget">
    <div
      class="text-container"
      contenteditable="false"
      :style="textStyle"
      v-html="text"
    >
      {{ text }}
    </div>
    <portal v-if="isActive" :to="$data.$controlTarget">
      <text-control :key="item.id" :item="item" />
    </portal>
  </div>
</template>

<script>
import {mapState} from 'poster/poster.vuex';
import textControl from './widgetControl.vue';
import Widget from './constructor';

export default {
  components: {textControl},
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
  created() {
    if (!this.item.isCopied) {
      let {width, height} = this.canvasSize;

      this.updateDragInfo({
        w: width * 0.8,
        h: 50,
        x: width * 0.1,
        y: height - 64,
      });
    }
  },
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
