<template>
  <div class="rect-widget" :style="rectStyleFilter">
    <!-- {{ isActive }} -->
    <portal v-if="isActive" :to="$data.$controlTarget">
      <rect-control :key="item.id" :item="item" />
    </portal>
  </div>
</template>

<script>
import Widget from './constructor';
import rectControl from './widgetControl.vue';

export default {
  components: {rectControl},
  mixins: [Widget.widgetMixin()],
  data() {
    return {};
  },
  computed: {
    rectStyleFilter() {
      return this.wState.style;
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.drag-item {
  user-select: none;
  .rect-widget {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
}
</style>
