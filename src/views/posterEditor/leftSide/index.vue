<template>
  <div class="left-side">
    <ul class="widget-list">
      <li v-for="item in widgets" :key="item.type" @click="current = item">
        <el-tooltip
          class="widget-item"
          :class="{active: current.type === item.type}"
          effect="dark"
          :content="item.name"
          placement="right"
          transition="el-zoom-in-left"
        >
          <i :class="item.icon" />
        </el-tooltip>
      </li>
    </ul>
    <div v-if="current" class="widget-container">
      <component :is="current.component" :key="current.component" />
    </div>
  </div>
</template>

<script>
import _sortBy from 'lodash/sortBy';
import {mapActions} from 'poster/poster.vuex';
import BackgroundWidget from 'poster/plugins/background/constructor';
import {pluginMap, pluginWrap} from '../plugins';

// 注册插件
const pluginWidgets = [];
const pluginComponents = {};
for (const [pluginName, options] of _sortBy(
  Object.entries(pluginMap.leftSide),
  ([, options]) => options.order,
)) {
  const {name, icon, component} = options;
  pluginWidgets.push({
    type: pluginName,
    component: pluginName,
    name,
    icon,
  });
  pluginComponents[pluginName] = pluginWrap(component);
}

export default {
  components: {
    ...pluginComponents,
  },
  data() {
    return {
      current: null,
      widgets: pluginWidgets,
    };
  },
  methods: {
    ...mapActions(['addBackground']),
    init() {
      this.addBackground(
        new BackgroundWidget({
          backgroundColor: '#fff',
          isSolid: true,
          lock: true,
        }),
      );
    },
  },
  created() {
    this.current = this.widgets[0];
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.left-side {
  background-color: #fff;
  box-sizing: border-box;
  border-right: 1px solid rgb(224, 224, 224);
  display: flex;
  .widget-list {
    width: 40px;
    height: 100%;
    border-right: 1px solid rgb(224, 224, 224);
    .widget-item {
      display: block;
      width: 40px;
      height: 40px;
      cursor: pointer;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      transition: 0.2s;
      margin: 4px 0;

      &:hover,
      &.active {
        background-color: $colorTheme;
        color: #fff;
      }
    }
  }
  .widget-container {
    width: 200px;
    height: 100%;
  }
}
</style>
