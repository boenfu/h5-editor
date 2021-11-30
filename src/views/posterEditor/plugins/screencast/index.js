import leftSide from './leftSide';
import widget from './widget';
import constructor from './constructor';
import controlPanel from './widgetControl';

export default {
  leftSide: {
    icon: 'el-icon-video-camera',
    name: '录制源',
    component: leftSide,
    order: 1,
  },
  widget: {
    component: widget,
    constructor,
  },
  controlPanel: {
    component: controlPanel,
  },
};
