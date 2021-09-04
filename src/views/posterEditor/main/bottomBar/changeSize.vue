<template>
  <div class="change-size">
    <el-tooltip
      effect="dark"
      :content="fixedAspectRatio ? '取消锁定' : '锁定画布比例'"
      placement="top"
      transition="el-zoom-in-top"
    >
      <span
        class="lock"
        :class="fixedAspectRatio ? 'active el-icon-lock' : 'el-icon-unlock'"
        @click="setFixedAspectRatio(!fixedAspectRatio)"
      ></span>
    </el-tooltip>

    <div class="item">
      <span class="label">宽度</span>
      <el-input
        :ref="'width'"
        v-model.number="width"
        type="number"
        style="width: 120px"
        size="mini"
      />
    </div>
    <div class="item">
      <span class="label">高度</span>
      <el-input
        v-model.number="height"
        type="number"
        style="width: 120px"
        size="mini"
      />
    </div>
    <el-button size="mini" @click="save">确定</el-button>
  </div>
</template>

<script>
import {mapState, mapActions} from 'poster/poster.vuex';
export default {
  data() {
    return {
      width: 0,
      height: 0,
    };
  },
  computed: {
    ...mapState({
      canvasWidth: state => state.canvasSize.width,
      canvasHeight: state => state.canvasSize.height,
      canvasRatio: state => state.canvasSize.width / state.canvasSize.height,
      fixedAspectRatio: state => state.fixedAspectRatio,
    }),
  },
  watch: {
    width(w) {
      if (!this.fixedAspectRatio) {
        return;
      }

      this.height = w / this.canvasRatio;
    },
    height(h) {
      if (!this.fixedAspectRatio) {
        return;
      }

      this.width = h * this.canvasRatio;
    },
  },
  methods: {
    ...mapActions([
      'setCanvasSize',
      'setFixedAspectRatio',
      'seekBackgroundSize',
    ]),
    save() {
      if (!(this.width && this.height)) {
        return;
      }

      this.setCanvasSize({
        width: this.width,
        height: this.height,
      });

      this.seekBackgroundSize();
    },
  },
  created() {
    this.width = this.canvasWidth;
    this.height = this.canvasHeight;
  },
  mounted() {
    this.$refs['width'].focus();
  },
};
</script>
<style lang="scss" scoped>
.change-size {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lock {
  position: absolute;
  font-size: 1em;
  right: 0.6em;
  top: 0.6em;
  padding: 0.2em;
  border-radius: 2px;
  transition: 0.2s linear all;

  &.active {
    color: #fff;
    background-color: #5151d6;
  }
}

.item {
  margin-bottom: 20px;

  .label {
    padding-right: 10px;
  }
}
</style>
