<template>
  <div class="bottom-bar">
    <div class="left">
      <div class="canvas-size">
        画布大小(px)
        <span>{{ canvasSize.width }} x {{ canvasSize.height }} </span>
        <el-popover
          v-model="resizing"
          placement="top"
          title="修改画布大小"
          width="200"
          trigger="click"
          transition="none"
        >
          <change-size v-if="resizing" />
          <button slot="reference" title="编辑画布" class="change-size">
            <i class="el-icon-s-tools" />
            编辑画布
          </button>
        </el-popover>
      </div>
      <component :is="item" v-for="item in pluginNames" :key="item" />
    </div>
    <div class="widget-count">
      <span>{{ `元素数量：${posterItemIds.length}` }}</span>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'poster/poster.vuex';
import changeSize from './changeSize';
import {pluginMap, pluginWrap} from '../../plugins';
const pluginComponents = {};
const pluginNames = [];
for (const [pluginName, options] of Object.entries(pluginMap.bottomBar)) {
  const {component} = options;
  pluginComponents[pluginName] = pluginWrap(component);
  pluginNames.push(pluginName);
}

export default {
  components: {
    changeSize,
    ...pluginComponents,
  },
  data() {
    return {
      resizing: false,
    };
  },
  computed: {
    ...mapState(['canvasSize']),
    ...mapGetters(['posterItemIds']),
    pluginNames() {
      return pluginNames;
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.bottom-bar {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 30px;
  border-top: 1px solid rgb(230, 230, 230);
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 6px rgba($color: #000000, $alpha: 0.04);
  z-index: 101;
  background-color: #fff;
  font-size: 12px;
  color: $colorTextL;
  justify-content: space-between;

  .left {
    max-width: 70%;
    display: flex;
    align-items: center;
    flex-wrap: no-wrap;
    & > div {
      margin-right: 10px;
    }
  }
  .canvas-size {
    span {
      padding-left: 2px;
    }

    .change-size {
      font-size: 12px;
      background-color: none;
      border: 1px solid $colorBorder;
    }
  }
}
</style>
