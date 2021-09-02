<template>
  <div class="image-widget" style="width: 100%; height: 100%">
    <img
      ref="image"
      :src="wState.src"
      class="qr-code"
      style="width: 100%; height: 100%"
      ondragstart="return false"
      @load="load"
    />
    <portal v-if="isActive" :to="$data.$controlTarget">
      <image-control :key="item.id" :item="item" />
    </portal>
  </div>
</template>

<script>
import Widget from './constructor';
import imageControl from './widgetControl.vue';

export default {
  components: {imageControl},
  mixins: [Widget.widgetMixin()],
  data() {
    return {};
  },
  methods: {
    load() {
      if (!this.item.isCopied) {
        const imgRef = this.$refs.image;
        const width = imgRef.naturalWidth;
        const height = imgRef.naturalHeight;
        this.updateDragInfo({w: 100, h: parseInt((100 * height) / width)});
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.drag-item {
  user-select: none;
  img {
    /* drag */
  }
}
</style>
