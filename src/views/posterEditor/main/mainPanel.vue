<template>
  <div
    class="main-panel"
    :style="{
      width: canvasSize.width + 'px',
      height: canvasSize.height + 'px',
    }"
    @mousedown.prevent.stop=""
  >
    <!-- marginLeft: -canvasSize.width / 2 + 'px' -->

    <background-widget
      v-if="background"
      :key="background.id"
      :item="background"
      v-on="$listeners"
    />
    <!-- 组件容器 -->
    <widget-container
      v-for="item in posterItems"
      v-show="item.visible"
      :key="item.id"
      :item="item"
      v-on="$listeners"
    />
    <!-- 辅助组件 -->
    <component
      :is="item.componentName"
      v-for="item in assistWidgets"
      v-show="item.visible"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<script>
import backgroundWidget from 'poster/plugins/background/widget';
import {mapState} from '../poster.vuex';
import widgetContainer from './widgets/widgetContainer';
import {pluginMap, pluginWrap} from '../plugins';

const pluginComponents = {};

for (const options of Object.values(pluginMap.assistWidget)) {
  const {componentName, component} = options;
  pluginComponents[componentName] = pluginWrap(component);
}

export default {
  components: {
    widgetContainer,
    backgroundWidget,
    ...pluginComponents,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState([
      'posterItems',
      'canvasSize',
      'background',
      'assistWidgets',
      'pageTitle',
    ]),
  },
};
</script>
<style lang="scss" scoped>
.main-panel {
  background-color: #fff;
  margin: 0 auto;
  position: relative;
  user-select: none;
  box-shadow: 0 0 6px rgba($color: #000000, $alpha: 0.1);
  transition-property: height;
  transition: 0.4s;
  cursor: initial;

  .custom-contextmenu {
    z-index: 999;
  }
}
</style>
