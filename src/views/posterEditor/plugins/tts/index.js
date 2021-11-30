import leftSide from './leftSide';
import widget from './widget';
import constructor from './constructor';
import controlPanel from './widgetControl';

export default {
  leftSide: {
    icon: 'el-icon-mic',
    name: 'TTS 字幕',
    component: leftSide,
    order: 2,
  },
  widget: {
    component: widget,
    constructor,
  },
  controlPanel: {
    component: controlPanel,
  },
};
