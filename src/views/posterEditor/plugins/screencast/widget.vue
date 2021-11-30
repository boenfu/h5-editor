<template>
  <div class="image-widget" style="width: 100%; height: 100%">
    <div>字幕测试</div>
    <portal v-if="isActive" :to="$data.$controlTarget">
      <widget-control :key="item.id" :item="item" />
    </portal>
  </div>
</template>

<script>
import Widget from './constructor';
import widgetControl from './widgetControl.vue';

export default {
  components: {widgetControl},
  mixins: [Widget.widgetMixin()],
  data() {
    return {};
  },
  methods: {
    load() {
      // this.updateDragInfo({w: 100, h: parseInt((100 * height) / width)});
    },
  },
};
</script>
<style lang="scss" scoped></style>
