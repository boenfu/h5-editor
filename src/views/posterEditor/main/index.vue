<template>
  <div ref="main" class="poster-editor-main" @contextmenu.prevent="">
    <div ref="mainPanelScrollContent" class="main-panel-scroll-content">
      <div class="main-panel-contaienr">
        <main-panel ref="mainPanel" @openContextmenu="openContextmenu" />
      </div>
    </div>
    <div class="mask" :style="maskStyle" />
    <ruler-component />
    <bottom-bar />
    <!-- 功能栏 -->
    <functional-bar />
    <custom-contextmenu
      v-if="contextmenuVisible"
      v-clickoutside="closeContextmenu"
      v-bind="contextmenuPosition"
      :menu-list="menuList"
      @executeCommand="executeContextCommand"
    />
  </div>
</template>

<script>
import mainPanel from './mainPanel';
import _throttle from 'lodash/throttle';
import rulerComponent from './ruler';
import {mapMutations, mapState} from 'poster/poster.vuex';
import bottomBar from './bottomBar';
import customContextmenu from 'poster/components/customContextmenu';
import {clickoutside} from 'poster/poster.directives';
import functionalBar from './functionalBar';

import BScroll from '@better-scroll/core';
import MouseWheel from '@better-scroll/mouse-wheel';
import ScrollBar from '@better-scroll/scroll-bar';
import {EDITOR_OFFSET} from 'poster/const';

export default {
  components: {
    mainPanel,
    rulerComponent,
    bottomBar,
    customContextmenu,
    functionalBar,
  },
  directives: {clickoutside},
  data() {
    return {
      count: 1,
      maskBorderWidth: '',
      maskHeight: 0,
      maskWidth: 0,
      contextmenuVisible: false,
      contextmenuPosition: {x: 0, y: 0},
      menuList: [],
    };
  },
  computed: {
    ...mapState(['canvasSize', 'mainPanelScrollY', 'mainPanelScrollX']),
    maskStyle() {
      return {
        width: this.maskWidth + 'px',
        height: this.maskHeight + 'px',
        borderWidth: this.maskBorderWidth,
        transform: `translate(${this.mainPanelScrollX}px,${this.mainPanelScrollY}px)`,
      };
    },
  },
  watch: {
    canvasSize: {
      handler() {
        this.getMaskSize();
        // mainPanel的size改变后有400ms的transition
        setTimeout(() => {
          this.BScroll.refresh();
        }, 500);
      },
      deep: true,
    },
  },
  mounted() {
    this.getMaskSizeThrottle = _throttle(this.getMaskSize, 300);
    window.addEventListener('resize', this.getMaskSizeThrottle);
    this.getMaskSize();
    this.initScroll();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getMaskSizeThrottle);
  },
  methods: {
    ...mapMutations(['SET_CANVAS_POSITION', 'SET_SCROLL_Y', 'SET_SCROLL_X']),
    /**
     * 重新设置mask的size和canvas的position
     */
    getMaskSize() {
      const mainRef = this.$refs.main;

      const right = Math.max(
        EDITOR_OFFSET,
        mainRef.clientWidth - EDITOR_OFFSET - this.canvasSize.width,
      );

      const bottom = Math.max(
        EDITOR_OFFSET,
        mainRef.clientHeight - EDITOR_OFFSET - this.canvasSize.height,
      );
      this.maskBorderWidth = `${EDITOR_OFFSET}px ${right}px ${bottom}px ${EDITOR_OFFSET}px`;
      this.maskHeight = Math.max(
        mainRef.clientHeight,
        this.canvasSize.height + 100,
      );
      this.maskWidth = Math.max(
        mainRef.clientWidth,
        this.canvasSize.width + 100,
      );
      const canvasPosition = {
        top: (mainRef.clientHeight - this.canvasSize.height) / 2,
        left: (mainRef.clientWidth - this.canvasSize.width) / 2,
      };
      this.SET_CANVAS_POSITION(canvasPosition);
    },
    openContextmenu({x, y, menuList, vm}) {
      this.contextmenuPosition.x = x;
      this.contextmenuPosition.y = y;
      this.menuList = menuList;
      this._currentContextmenuWidgetVm = vm;
      this.contextmenuVisible = true;
    },
    closeContextmenu() {
      this.contextmenuVisible = false;
    },
    // 执行右键命令
    executeContextCommand(commandItem) {
      this.closeContextmenu();
      const vm = this._currentContextmenuWidgetVm;
      if (vm && vm._executeContextCommand) {
        vm._executeContextCommand(commandItem);
      }
    },
    initScroll() {
      BScroll.use(MouseWheel);
      BScroll.use(ScrollBar);

      this.BScroll = new BScroll(this.$refs.mainPanelScrollContent, {
        scrollX: true,
        mouseWheel: true,
        scrollbar: {
          interactive: true,
          scrollbarTrackClickable: false,
        },
        bounce: false,
        probeType: 2,
      });

      this.BScroll.on('mousewheelMove', ({x, y}) => {
        this.SET_SCROLL_X(x);
        this.SET_SCROLL_Y(y);
      });

      this.BScroll.on('scroll', ({x, y}) => {
        this.SET_SCROLL_X(x);
        this.SET_SCROLL_Y(y);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.poster-editor-main {
  position: relative;
  overflow: hidden;
  height: 100%;

  .main-panel-scroll-content {
    width: 100%;
    height: 100%;
    cursor: grab;
    white-space: nowrap;
  }
  .main-panel-contaienr {
    display: inline-block;
    padding: 50px;
    position: relative;
  }
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    border-style: solid;
    border-color: rgba($color: rgb(0, 0, 0), $alpha: 0.5);
    box-sizing: border-box;
    left: 0;
    top: 0;
    pointer-events: none;
  }
}
</style>
