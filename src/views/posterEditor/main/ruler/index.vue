<template>
  <div class="poster-ruler">
    <template v-if="referenceLineOpened">
      <!-- 纵向参考线 -->
      <div
        v-for="(item, index) in referenceLine.col"
        :key="'col' + index + item"
        class="reference-line column"
        :style="{left: item + 'px', ...columnElPositionFix}"
        @dblclick="removeReferenceLine({type: 'col', index})"
        @mousedown="colHandleDown($event, index)"
      />
      <!-- 横向参考线 -->
      <div
        v-for="(item, index) in referenceLine.row"
        :key="'row' + index + item"
        class="reference-line row"
        :style="{top: item + 'px', ...rowElPositionFix}"
        @dblclick="removeReferenceLine({type: 'row', index})"
        @mousedown="rowHandleDown($event, index)"
      />
    </template>
    <!-- 顶部标尺 -->
    <div
      ref="topRuler"
      class="top-ruler"
      :style="columnElPositionFix"
      @mouseenter="topMouseEnter"
      @mousemove="topMouseMove"
      @mouseleave="topMouseLeave"
      @mouseup="topMouseUp"
    >
      <div
        v-if="topMoving"
        class="reference-line column"
        :style="{left: columnX + 'px'}"
      >
        <div class="tip" draggable="false" ondragstart="return false">
          {{ columnXInRuler }}
        </div>
      </div>
    </div>
    <!-- 左侧标尺 -->
    <div
      ref="leftRuler"
      class="left-ruler"
      :style="rowElPositionFix"
      @mouseenter="leftMouseEnter"
      @mousemove="leftMouseMove"
      @mouseleave="leftMouseLeave"
      @mouseup="leftMouseUp"
    >
      <div
        v-if="leftMoving"
        class="reference-line row moving"
        :style="{top: rowY + 'px'}"
      >
        <div class="tip" draggable="false" ondragstart="return false">
          {{ rowYInRuler }}
        </div>
      </div>
    </div>
    <!-- 动态匹配的参考线 -->
    <matched-line
      :row-el-position-fix="rowElPositionFix"
      :column-el-position-fix="columnElPositionFix"
    />
  </div>
</template>

<script>
import ruler from 'poster/utils/canvasRuler';
import {mapState, mapActions} from 'poster/poster.vuex';
import {EDITOR_OFFSET} from 'poster/const';
import matchedLine from './matchedLine';

const LEFT_SIDE_WIDTH = 240; // 左侧边栏的宽度
const RULER_SIZE = 21; // 顶部标尺高度

export default {
  components: {matchedLine},
  data() {
    return {
      topMoving: false,
      columnX: 0,
      leftMoving: false,
      rowY: 0,
    };
  },
  computed: {
    ...mapState([
      'referenceLine',
      'referenceLineOpened',
      'mainPanelScrollY',
      'mainPanelScrollX',
    ]),
    columnXInRuler() {
      return this.columnX - EDITOR_OFFSET;
    },
    rowYInRuler() {
      return this.rowY - EDITOR_OFFSET;
    },
    rowElPositionFix() {
      return {
        transform: `translateY(${this.mainPanelScrollY}px)`,
      };
    },
    columnElPositionFix() {
      return {
        transform: `translateX(${this.mainPanelScrollX}px)`,
      };
    },
  },
  mounted() {
    ruler.initRow({
      el: this.$refs.topRuler,
      height: RULER_SIZE,
      color: '#bac3c9',
      background: '#f4f7f8',
      startGap: EDITOR_OFFSET - 1,
      maxScale: 501,
    });
    ruler.initColumn({
      el: this.$refs.leftRuler,
      width: RULER_SIZE,
      color: '#bac3c9',
      background: '#f4f7f8',
      startGap: EDITOR_OFFSET - 1,
      maxScale: 501,
    });
  },
  methods: {
    ...mapActions(['addReferenceLine', 'removeReferenceLine']),
    addColumn() {
      this.addReferenceLine({type: 'col', position: this.columnX});
    },
    addRow() {
      this.addReferenceLine({type: 'row', position: this.rowY});
    },
    topMouseEnter(e) {
      this.topMoving = true;
      this.columnX = e.pageX - LEFT_SIDE_WIDTH - this.mainPanelScrollX;
    },
    topMouseMove(e) {
      this.columnX = e.pageX - LEFT_SIDE_WIDTH - this.mainPanelScrollX;
    },
    topMouseLeave() {
      if (this.colHandleMoveReady) {
        return;
      }

      this.topMoving = false;
    },
    topMouseUp() {
      if (this.colHandleMoveReady) {
        return;
      }
      this.addColumn();
    },
    leftMouseEnter() {
      this.leftMoving = true;
    },
    leftMouseMove(e) {
      this.rowY = e.pageY - this.mainPanelScrollY;
    },
    leftMouseLeave() {
      if (this.rowHandleMoveReady) {
        return;
      }

      this.leftMoving = false;
    },
    leftMouseUp() {
      if (this.rowHandleMoveReady) {
        return;
      }

      this.addRow();
    },
    colHandleDown(e, index) {
      this.colHandleMoveReady = true;
      let invoked = false;

      document.body.style.cursor = 'col-resize';

      const mouseMoveFn = _e => {
        if (!invoked) {
          this.removeReferenceLine({type: 'col', index});
          this.topMouseEnter(_e);
          invoked = true;
        }

        this.topMouseMove(_e);
      };

      const mouseUpFn = () => {
        if (invoked) {
          this.addColumn();
        }

        this.colHandleMoveReady = false;
        this.topMouseLeave();

        document.removeEventListener('mouseup', mouseUpFn);
        document.removeEventListener('mousemove', mouseMoveFn);
        document.body.style.cursor = 'initial';
      };

      document.addEventListener('mousemove', mouseMoveFn);
      document.addEventListener('mouseup', mouseUpFn);
    },
    rowHandleDown(e, index) {
      this.rowHandleMoveReady = true;
      let invoked = false;

      document.body.style.cursor = 'row-resize';

      const mouseMoveFn = _e => {
        if (!invoked) {
          this.removeReferenceLine({type: 'row', index});
          this.leftMouseEnter(_e);
          invoked = true;
        }

        this.leftMouseMove(_e);
      };

      const mouseUpFn = () => {
        if (invoked) {
          this.addRow();
        }

        this.rowHandleMoveReady = false;
        this.leftMouseLeave();

        document.removeEventListener('mouseup', mouseUpFn);
        document.removeEventListener('mousemove', mouseMoveFn);
        document.body.style.cursor = 'initial';
      };

      document.addEventListener('mousemove', mouseMoveFn);
      document.addEventListener('mouseup', mouseUpFn);
    },
  },
};
</script>

<style lang="scss" scoped>
.poster-ruler {
  z-index: 10;
}

.top-ruler {
  position: absolute;
  top: 0;
  left: 0;
  height: 22px;
  width: 5000px;
  z-index: 100;
  cursor: col-resize;
}

.left-ruler {
  position: absolute;
  top: 0;
  left: 0;
  width: 22px;
  height: 6000px;
  z-index: 99;
  cursor: row-resize;
  transition: 0.5s;
}

.reference-line {
  position: absolute;
  z-index: 99;

  .tip {
    padding: 4px 6px;
    border-radius: 4px;
    background-color: rgba($color: #000000, $alpha: 0.6);
    color: #fff;
    font-size: 13px;
    position: absolute;
    user-select: none;
    pointer-events: none;
  }

  &.column {
    width: 3px;
    height: 5000px;
    margin-left: -2px;
    top: 0;
    cursor: col-resize;
    background-color: #53ebef;
    background: linear-gradient(
      90deg,
      transparent 33.3%,
      #eceef0 0,
      #53ebef 66.6%,
      transparent 0
    );

    .tip {
      top: 30px;
      left: 10px;
    }
  }

  &.row {
    width: 5000px;
    height: 3px;
    margin-top: -2px;
    left: 0;
    cursor: row-resize;
    transition: 0.1s;
    background: linear-gradient(
      0deg,
      transparent 33.3%,
      #eceef0 0,
      #53ebef 66.6%,
      transparent 0
    );

    .tip {
      top: -30px;
      left: 30px;
    }

    &.moving {
      transition: none;
    }
  }
}
</style>
