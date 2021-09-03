<template>
  <div v-if="matchedLine" class="matched-line">
    <div
      v-for="(item, index) in matchedLine.col"
      :key="'col' + index"
      class="reference-line column"
      :style="{left: item + 'px', ...columnElPositionFix}"
    />
    <div
      v-for="(item, index) in matchedLine.row"
      :key="'row' + index"
      class="reference-line row"
      :style="{top: item + 'px', ...rowElPositionFix}"
    />
  </div>
</template>

<script>
import {mapState} from 'poster/poster.vuex';
export default {
  props: {
    rowElPositionFix: {
      type: Object,
      default: null,
    },
    columnElPositionFix: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(['matchedLine']),
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.reference-line {
  position: absolute;
  z-index: 99;

  &.column {
    width: 0px;
    border-left: 1px dashed #ff0000;
    height: 5000px;
    top: 0;

    .tip {
      top: 30px;
      left: 10px;
    }
  }
  &.row {
    width: 5000px;
    height: 0px;
    left: 0;
    border-top: 1px dashed #ff0000;

    .tip {
      top: -30px;
      left: 30px;
    }
  }
}
</style>
